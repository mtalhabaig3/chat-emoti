// @refresh reset
import { useNavigation, useRoute } from "@react-navigation/native";
import "react-native-get-random-values";
import { nanoid } from "nanoid";
import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { auth, db } from "../firebase";
import GlobalContext from "../context/Context";
import Done from "../components/Done";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "@firebase/firestore";
import {
  Actions,
  Bubble,
  GiftedChat,
  InputToolbar,
} from "react-native-gifted-chat";
import { pickImage, uploadImage, takeImage } from "../utils";
import ImageView from "react-native-image-viewing";
import ChatHeader from "../components/ChatHeader";

const randomId = nanoid();

export default function Chat() {
  const navigation = useNavigation();
  const [roomHash, setRoomHash] = useState("");
  const [messages, setMessages] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImageView, setSeletedImageView] = useState("");
  const {
    theme: { colors },
  } = useContext(GlobalContext);
  const { currentUser } = auth;
  const route = useRoute();
  const room = route.params.room;
  const selectedImage = route.params.image;
  const userB = route.params.user;

  const senderUser = currentUser.photoURL
    ? {
        name: currentUser.displayName,
        _id: currentUser.uid,
        avatar: currentUser.photoURL,
      }
    : { name: currentUser.displayName, _id: currentUser.uid };

  const roomId = room ? room.id : randomId;

  const roomRef = doc(db, "rooms", roomId);
  const roomMessagesRef = collection(db, "rooms", roomId, "messages");

  useEffect(() => {
    (async () => {
      if (!room) {
        const currUserData = {
          displayName: currentUser.displayName,
          email: currentUser.email,
        };
        if (currentUser.photoURL) {
          currUserData.photoURL = currentUser.photoURL;
        }
        const userBData = {
          displayName: userB.contactName || userB.displayName || "",
          email: userB.email,
        };
        if (userB.photoURL) {
          userBData.photoURL = userB.photoURL;
        }
        const roomData = {
          participants: [currUserData, userBData],
          participantsArray: [currentUser.email, userB.email],
        };
        try {
          await setDoc(roomRef, roomData);
        } catch (error) {
          console.log(error);
        }
      }
      const emailHash = `${currentUser.email}:${userB.email}`;
      setRoomHash(emailHash);
      if (selectedImage && selectedImage.uri) {
        await sendImage(selectedImage.uri, emailHash);
      }
    })();
  }, []);

  let msgString = "khali";

  useEffect(() => {
    const unsubscribe = onSnapshot(roomMessagesRef, (querySnapshot) => {
      const messagesFirestore = querySnapshot
        .docChanges()
        .filter(({ type }) => type === "added")
        .map(({ doc }) => {
          const message = doc.data();
          return { ...message, createdAt: message.createdAt.toDate() };
        })
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

      appendMessages(messagesFirestore);
    });
    return () => unsubscribe();
  }, []);

  const appendMessages = useCallback(
    (messages) => {
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messages)
      );
    },
    [messages]
  );

  const handleNavigate = () => {
    navigation.goBack();
  };

  const EmoResolve = () => {
    onSnapshot(roomMessagesRef, (querySnapshot) => {
      querySnapshot
        .docChanges()
        .filter(({ type }) => type === "added")
        .map(({ doc }) => {
          const message = doc.data();
          let example = new Date();
          const time = parseInt(example.getTime() / 1000);
          if (message.user.name === currentUser.displayName) {
            if (time - message.createdAt.seconds < 3200) {
              const totalmsgs = message.text;
              msgString += totalmsgs + " ";
            }
          }
        });
    });
    console.log(msgString);
    if (msgString !== "khali") {
      fetch("http://192.168.18.56:4000/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ msgString }),
      })
        .then((resp) => resp.json())
        .then((data) => {
          // result += data;
          console.log(data);
          navigation.navigate("emoResolve", { result: data["label"] });
        });
    }

    msgString = "";
  };

  async function onSend(messages = []) {
    const writes = messages.map((m) => addDoc(roomMessagesRef, m));
    const lastMessage = messages[messages.length - 1];
    writes.push(updateDoc(roomRef, { lastMessage }));
    await Promise.all(writes);
  }

  async function sendImage(uri, roomPath) {
    const { url, fileName } = await uploadImage(
      uri,
      `images/rooms/${roomPath || roomHash}`
    );
    const message = {
      _id: fileName,
      text: "",
      createdAt: new Date(),
      user: senderUser,
      image: url,
    };
    const lastMessage = { ...message, text: "Image" };
    await Promise.all([
      addDoc(roomMessagesRef, message),
      updateDoc(roomRef, { lastMessage }),
    ]);
  }

  async function handlePhotoPicker() {
    const result = await pickImage();
    if (!result.cancelled) {
      await sendImage(result.uri);
    }
  }

  async function handlePhototaker() {
    const result = await takeImage();
    if (!result.cancelled) {
      await sendImage(result.uri);
    }
  }

  return (
    <ImageBackground
      resizeMode="cover"
      source={require("../assets/chatback2.jpeg")}
      style={{ flex: 1 }}
    >
      <ChatHeader
        Done={<Done emoResolve={EmoResolve} />}
        onPress={handleNavigate}
        onlineStatus="online"
      />
      <GiftedChat
        onSend={onSend}
        messages={messages}
        user={senderUser}
        // renderUsernameOnMessage={true}
        // renderAvatar={True}
        // showAvatarForEveryMessage={true}
        renderActions={(props) => (
          <>
            <Actions
              {...props}
              containerStyle={{
                position: "absolute",
                right: 50,
                bottom: 5,
                zIndex: 9999,
              }}
              onPressActionButton={handlePhototaker}
              icon={() => (
                <Ionicons name="camera" size={30} color={colors.iconGray} />
              )}
            />
            <Actions
              {...props}
              containerStyle={{
                position: "absolute",
                right: 85,
                bottom: 5,
                zIndex: 9999,
              }}
              onPressActionButton={handlePhotoPicker}
              icon={() => (
                <Ionicons name="add" size={30} color={colors.iconGray} />
              )}
            />
          </>
        )}
        timeTextStyle={{ right: { color: colors.iconGray } }}
        renderSend={(props) => {
          const { text, messageIdGenerator, user, onSend } = props;
          return (
            <TouchableOpacity
              style={{
                height: 35,
                width: 35,
                borderRadius: 40,
                backgroundColor: "maroon",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 7,
                marginRight: 5,
              }}
              onPress={() => {
                if (text && onSend) {
                  onSend(
                    {
                      text: text.trim(),
                      user,
                      _id: messageIdGenerator(),
                    },
                    true
                  );
                }
              }}
            >
              <AntDesign name="arrowup" size={22} color={colors.white} />
            </TouchableOpacity>
          );
        }}
        renderInputToolbar={(props) => (
          <InputToolbar
            {...props}
            containerStyle={{
              marginLeft: 10,
              marginRight: 10,
              marginBottom: 1,
              borderRadius: 40,
              paddingTop: 5,
              backgroundColor: "#EADDCA",
            }}
          />
        )}
        renderBubble={(props) => (
          <Bubble
            {...props}
            textStyle={{ left: { color: "black" }, right: { color: "white" } }}
            wrapperStyle={{
              right: {
                backgroundColor: "#C4A484",
              },
              left: {
                backgroundColor: "#EADDCA",
              },
            }}
          />
        )}
        renderMessageImage={(props) => {
          return (
            <View style={{ borderRadius: 15, padding: 2 }}>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(true);
                  setSeletedImageView(props.currentMessage.image);
                }}
              >
                <Image
                  resizeMode="contain"
                  style={{
                    width: 200,
                    height: 200,
                    padding: 6,
                    borderRadius: 15,
                    resizeMode: "cover",
                  }}
                  source={{ uri: props.currentMessage.image }}
                />
                {selectedImageView ? (
                  <ImageView
                    imageIndex={0}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                    images={[{ uri: selectedImageView }]}
                  />
                ) : null}
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </ImageBackground>
  );
}
