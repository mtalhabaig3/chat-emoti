import React, { useState, useEffect, useContext } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useAssets } from "expo-asset";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Welcome from "./screens/Welcome";
import SignIn from "./screens/SignIn";
import SignUp from "./screens/Signup";
import ContextWrapper from "./context/ContextWrapper";
import Context from "./context/Context";
import Profile from "./screens/Profile";
import Chats from "./screens/Chats";
import Photo from "./screens/Photo";
import { Ionicons, MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import Contacts from "./screens/Contacts";
import Chat from "./screens/Chat";
import ChatHeader from "./components/ChatHeader";
import { LogBox } from "react-native-web";
import AccountInfo from "./screens/AccountInfo";
import UserBAccount from "./screens/UserBAccount";
import EmoResolve from "./screens/EmoResolve";
import Home from "./screens/Home";

LogBox.ignoreAllLogs();

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function App() {
  const [currUser, setCurrUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const {
    theme: { colors },
  } = useContext(Context);

  LogBox.ignoreLogs([
    "Setting a timer",
    "AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage",
  ]);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false);
      if (user) {
        setCurrUser(user);
      } else {
        setCurrUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <NavigationContainer>
      {!currUser ? (
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="Welcome"
        >
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="signIn" component={SignIn} />
          <Stack.Screen name="signup" component={SignUp} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: "maroon",
              shadowOpacity: 0,
              elevation: 0,
            },
            headerTintColor: colors.white,
          }}
        >
          {!currUser.photoURL && (
            <Stack.Screen
              name="profile"
              component={Profile}
              options={{ headerShown: false }}
            />
          )}
          <Stack.Screen
            name="chatHome"
            options={{ headerShown: false }}
            component={ChatsHome}
          />
          <Stack.Screen
            name="chat"
            component={Chat}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="chatheader"
            component={ChatHeader}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="emoResolve"
            options={{ title: "Your Emotion" }}
            component={EmoResolve}
          />
          <Stack.Screen
            name="AccountInfo"
            options={{ headerShown: false }}
            component={AccountInfo}
          />
          <Stack.Screen
            name="UserBAccount"
            options={{ headerShown: false }}
            component={UserBAccount}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
function ChatsHome({ navigation }) {
  const {
    theme: { colors },
  } = useContext(Context);

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text}>CHAT EMOTI</Text>
        <TouchableOpacity
          style={{ position: "absolute", top: 45, right: 20 }}
          onPress={() => navigation.navigate(AccountInfo)}
        >
          <Image
            source={{ uri: auth.currentUser.photoURL }}
            style={styles.avatar}
          />
        </TouchableOpacity>
      </View>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "maroon",
            borderTopRightRadius: 40,
            borderTopLeftRadius: 40,
            position: "absolute",
          },
          // tabBarShowLabel: false,
          tabBarActiveTintColor: "maroon",
          tabBarInactiveTintColor: "#ffe4c4",
          tabBarActiveBackgroundColor: "#ffe4c4",
          tabBarInactiveBackgroundColor: "maroon",
          tabBarLabelStyle: {
            fontSize: 15,
            marginBottom: 10,
            paddingBottom: 20,
          },
          tabBarItemStyle: {
            height: 80,
            borderTopRightRadius: 36,
            borderTopLeftRadius: 36,

            marginTop: 10,
          },
        }}
        initialRouteName="Home"
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ color }) => {
              return <Ionicons name="home" size={25} color={color} />;
            },
          }}
        />
        <Tab.Screen
          name="chats"
          component={Chats}
          options={{
            tabBarBadge: 1,
            tabBarIcon: ({ color }) => {
              return <Entypo name="chat" size={24} color={color} />;
            },
          }}
        />
        <Tab.Screen
          name="photo"
          component={Photo}
          options={{
            tabBarIcon: ({ color }) => {
              return <Ionicons name="camera" size={25} color={color} />;
            },
          }}
        />
        <Tab.Screen
          name="contacts"
          component={Contacts}
          options={{
            tabBarIcon: ({ color }) => {
              return (
                <MaterialCommunityIcons
                  name="contacts"
                  size={24}
                  color={color}
                />
              );
            },
          }}
        />
      </Tab.Navigator>
    </>
  );
}

function Main() {
  const [assets] = useAssets(
    require("./assets/chatbg.png"),
    require("./assets/user-icon.png"),
    require("./assets/welcome3.png")
  );
  if (!assets) {
    return <Text>Loading ..</Text>;
  }
  return (
    <ContextWrapper>
      <App />
    </ContextWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "#075e54",
    backgroundColor: "maroon",
    paddingTop: 40,
    paddingBottom: 10,
    height: 100,
    flexDirection: "row",
    justifyContent: "center",
    // borderBottomRightRadius: 30,
    // borderBottomLeftRadius: 30,
    // position:'absolute'
  },
  text: {
    paddingTop: 8,
    fontSize: 22,
    color: "#EADDCA",
    fontFamily: "Arial Rounded MT Bold",
    alignSelf: "center",

    // fontStyle: "italic",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    alignSelf: "center",
  },
});

export default Main;
