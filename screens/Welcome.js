import React, { useContext, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Keyboard,
} from "react-native";
import TextInput from "../components/TextInput";
import { TouchableOpacity } from "react-native";
import Context from "../context/Context";
import { emailValidator } from "../helpers/emailValidator";
import { passwordValidator } from "../helpers/passwordValidator";
import { signIn, signUp } from "../firebase";
import Button from "../components/Button";
import Header from "../components/Header";

export default function Welcome({ navigation }) {
  const image = { uri: "../assets/wallpaper_3.jpeg" };
  return (
    <View
      style={{
        // justifyContent: "center",
        // alignItems: "center",
        flex: 1,
        // backgroundColor: "#EADDCA",
      }}
    >
      <ImageBackground
        source={require("../assets/maybe.jpeg")}
        style={styles.image}
        // blurRadius={2}
      >
        <Text
          style={{
            color: "maroon",
            fontSize: 40,
            marginBottom: 20,
            fontFamily: "Arial Rounded MT Bold",
            fontWeight: "bold",
            position: "absolute",
            top: 150,
          }}
        >
          {" "}
          CHAT EMOTI{" "}
        </Text>
        <View style={{ marginTop: 20, position: "absolute", bottom: 280 }}>
          <Header>MARHABA!</Header>
          <Button
            mode="contained"
            style={{
              backgroundColor: "#f72b2b",
            }}
            onPress={() => navigation.navigate("signIn")}
          >
            Login
          </Button>
          <Button mode="outlined" onPress={() => navigation.navigate("signup")}>
            Sign Up
          </Button>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    marginTop: 20,
    backgroundColor: "maroon",
    borderRadius: 40,
    width: 300,
  },
});
