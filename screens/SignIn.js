import React, { useContext, useState } from "react";
import { View, Text, ImageBackground, StyleSheet, Button } from "react-native";
import TextInput from "../components/TextInput";
import { TouchableOpacity } from "react-native";
import Context from "../context/Context";
import { emailValidator } from "../helpers/emailValidator";
import { passwordValidator } from "../helpers/passwordValidator";
import { signIn, signUp } from "../firebase";

export default function SignIn() {
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [mode, setMode] = useState("signUp");
  const {
    theme: { colors },
  } = useContext(Context);

  async function handlePress() {
    if (mode === "signUp") {
      const emailError = emailValidator(email.value);
      const passwordError = passwordValidator(password.value);
      if (emailError || passwordError) {
        setEmail({ ...email, error: emailError });
        setPassword({ ...password, error: passwordError });
        return;
      }
      Keyboard.dismiss();

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
            label="Email"
            returnKeyType="next"
            value={email.value}
            onChangeText={(text) => setEmail({ value: text, error: "" })}
            error={!!email.error}
            errorText={email.error}
            autoCapitalize="none"
            autoCompleteType="email"
            textContentType="emailAddress"
            keyboardType="email-address"
          />
          <TextInput
            label="Password"
            returnKeyType="done"
            value={password.value}
            onChangeText={(text) => setPassword({ value: text, error: "" })}
            error={!!password.error}
            errorText={password.error}
            secureTextEntry
          />
          <View
            style={[
              styles.form,
              password.value && email.value
                ? { backgroundColor: "maroon" }
                : { backgroundColor: "#b5651d" },
            ]}
          >
            <Button
              title={mode === "signUp" ? "Sign Up" : "Sign in"}
              disabled={!password.value || !email.value}
              color="white"
              onPress={handlePress}
            />
          </View>
          <TouchableOpacity
            style={{
              marginTop: 15,
              justifyContent: "center",
              alignItems: "center",
            }}
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
  form: {
    marginTop: 20,
    backgroundColor: "maroon",
    borderRadius: 40,
    width: 300,
  },
});
