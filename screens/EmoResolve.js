import { useRoute } from "@react-navigation/native";
// import { styles } from "expo-ui-kit";
import React, { Component } from "react";
import BackButton from "../components/BackButton";
import { View, Text, Image, StyleSheet } from "react-native";

export default function EmoResolve({navigation}) {
  const route = useRoute();
  let emotion = route.params.result;
  var user = route.params.user
  const labels = {
    admiration: "admired! 👏",
    amusement: "amused! 😂",
    anger: "angry! 😡",
    annoyance: "annoyed! 😒",
    approval: "approved! 👍",
    caring: "caring! 🤗",
    confusion: "confused! 😕",
    curiosity: "curious! 🤔",
    desire: "desiring! 😍",
    disappointment: "disappointed! 😞",
    disapproval: "disapproved! 👎",
    disgust: "disgusted! 🤮",
    embarrassment: "embarrassed! 😳",
    excitement: "excited! 🤩",
    fear: "afraid! 😨",
    gratitude: "grateful! 🙏",
    grief: "griefed! 😢",
    joy: "joyous! 😃",
    love: "lovely! ❤️",
    nervousness: "nervous! 😬",
    optimism: "optimistic! 🤞",
    pride: "proud! 😌",
    realization: "realized! 💡",
    relief: "relieved! 😅",
    remorse: "remorsed! 🥺",
    sadness: "sad! 😞",
    surprise: "surprised! 😲",
    neutral: "neutral! 😐",
  };

  return (
    <View
      style={{
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        backgroundColor:'#EADDCA'
      }}
    >
      {/* {labels[emotion] === "admired! 👏" ? <Image source={require('../assets/Duas/Admiration.jpg')} style={styles.image}/> : null} */}
        
      { user === 'aUser' ? <Text style={{ fontSize: 22, padding: 10 }}>
        After having seen your conversation, today you are
      </Text> : <Text style={{ fontSize: 22, padding: 10 }}>
        After having seen your friend's conversation, today he is
      </Text>
      }
      <Text
        style={{
          fontWeight: "bold",
          fontStyle: "italic",
          fontSize: 26,
          marginTop: 10,
        }}
      >
        {labels[emotion]}
      </Text>
                    <BackButton goBack={() => navigation.goBack()} />

    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width:'100%',
    height:'100%',
  resizeMode:'stretch'  },
});

