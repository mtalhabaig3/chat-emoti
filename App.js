import React, { useState, useEffect, useContext } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useAssets } from "expo-asset";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Welcome from "./screens/Welcome";
import SignIn from "./screens/SignIn";
import SignUp from "./screens/Signup";
import ContextWrapper from "./context/ContextWrapper";
import Context from "./context/Context";
import Profile from "./screens/Profile";
import Chats from "./screens/Chats";
import Photo from "./screens/Photo";
import { Ionicons } from "@expo/vector-icons";
import Contacts from "./screens/Contacts";
import Chat from "./screens/Chat";
import ChatHeader from "./components/ChatHeader";
import { LogBox } from "react-native-web";
import AccountInfo from "./screens/AccountInfo";
import EmoResolve from "./screens/EmoResolve";

LogBox.ignoreLogs([
  "Setting a timer",
  "AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage",
]);

LogBox.ignoreAllLogs();

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

function App() {
  const [currUser, setCurrUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const {
    theme: { colors },
  } = useContext(Context);

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
            name="home"
            options={{ headerShown: false }}
            component={Home}
          />
          <Stack.Screen
            name="contacts"
            options={{ title: "Select Contacts" }}
            component={Contacts}
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
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
function Home() {
  const {
    theme: { colors },
  } = useContext(Context);
  return (
    <>
      <View style={styles.container}>
        <View style={styles.profileOptions}>
          <TouchableOpacity style={styles.profile}>
            <View>
              <Text style={styles.text}>ChatEmoti</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <Tab.Navigator
        screenOptions={({ route }) => {
          return {
            tabBarLabel: () => {
              if (route.name === "photo") {
                return <Ionicons name="camera" size={20} color="#EADDCA" />;
              } else if (route.name === "accountInfo") {
                return <Ionicons name="person" size={20} color="#EADDCA" />;
              } else {
                return (
                  <Text style={{ color: colors.white }}>
                    {route.name.toLocaleUpperCase()}
                  </Text>
                );
              }
            },
            tabBarShowIcon: true,
            tabBarLabelStyle: {
              color: colors.white,
            },
            tabBarIndicatorStyle: {
              backgroundColor: colors.white,
            },
            tabBarStyle: {
              backgroundColor: "maroon",
            },
          };
        }}
        initialRouteName="chats"
      >
        <Tab.Screen name="accountInfo" component={AccountInfo} />
        <Tab.Screen name="photo" component={Photo} />
        <Tab.Screen name="chats" component={Chats} />
      </Tab.Navigator>
    </>
  );
}

function Main() {
  const [assets] = useAssets(
    require("./assets/icon-square.png"),
    require("./assets/chatbg.png"),
    require("./assets/user-icon.png"),
    require("./assets/welcome-img.png")
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
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    paddingTop: 8,
    fontSize: 22,
    color: "#EADDCA",
    fontFamily: "Zapfino",
    // fontStyle: "italic",
  },
});

export default Main;
