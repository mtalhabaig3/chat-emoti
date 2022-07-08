import React, { useContext, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TextInput,
  Button,
} from "react-native";
import { TouchableOpacity } from "react-native";
import Context from "../context/Context";
import { signIn, signUp } from "../firebase";
export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("signUp");
  const {
    theme: { colors },
  } = useContext(Context);

  async function handlePress() {
    if (mode === "signUp") {
      await signUp(email, password);
    }
    if (mode === "signIn") {
      await signIn(email, password);
    }
  }
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
            fontSize: 38,
            marginBottom: 20,
            fontFamily: "Zapfino",
            position: "absolute",
            top: 150,
          }}
        >
          {" "}
          ChatEmoti
        </Text>
        <View style={{ marginTop: 20, position: "absolute", bottom: 250 }}>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={{
              borderBottomColor: "maroon",
              borderBottomWidth: 2,
              width: 200,
            }}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            style={{
              borderBottomColor: "maroon",
              borderBottomWidth: 2,
              width: 200,
              marginTop: 20,
            }}
          />
          <View style={{ marginTop: 20 }}>
            <Button
              title={mode === "signUp" ? "Sign Up" : "Sign in"}
              disabled={!password || !email}
              color="maroon"
              onPress={handlePress}
            />
          </View>
          <TouchableOpacity
            style={{ marginTop: 15 }}
            onPress={() =>
              mode === "signUp" ? setMode("signIn") : setMode("signUp")
            }
          >
            <Text style={{ color: "maroon" }}>
              {mode === "signUp"
                ? "Already have an account? Sign in"
                : "Don't have an account? Sign Up"}
            </Text>
          </TouchableOpacity>
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
});
