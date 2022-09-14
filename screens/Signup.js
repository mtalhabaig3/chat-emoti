import React, { useContext, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Button,
  Keyboard,
} from "react-native";
import TextInput from "../components/TextInput";
import { TouchableOpacity } from "react-native";
import Context from "../context/Context";
import { emailValidator } from "../helpers/emailValidator";
import { passwordValidator } from "../helpers/passwordValidator";
import { nameValidator } from "../helpers/nameValidator";
import Header from "../components/Header";
import Logo from "../components/Logo";

import { signIn, signUp } from "../firebase";

export default function SignUp({ navigation }) {
  const [displayName, setDisplayName] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });

  const {
    theme: { colors },
  } = useContext(Context);

  async function handlePress() {
    const displayNameError = nameValidator(displayName.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }
    Keyboard.dismiss();

    await signUp(email.value, password.value);
  }
  const image = { uri: "../assets/wallpaper_3.jpeg" };
  return (
    <View
      style={{
        justifyContent: "center",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        backgroundColor: "#EADDCA",
      }}
    >
      {/* <ImageBackground
        source={require("../assets/maybe.jpeg")}
        style={styles.image}
        // blurRadius={2}
      > */}
      <View style={{ position: "absolute", top: 80, left: 90 }}>
        <Text
          style={{
            color: "maroon",
            fontSize: 40,
            marginBottom: 20,
            fontFamily: "Arial Rounded MT Bold",
            fontWeight: "bold",
          }}
        >
          {" "}
          CHAT EMOTI{" "}
        </Text>
        <Logo />
      </View>
      <View style={{ marginTop: 50, position: "absolute", bottom: 180 }}>
        {/* <TextInput
            label="Name"
            returnKeyType="next"
            value={displayName.value}
            onChangeText={(text) => setDisplayName({ value: text, error: "" })}
            error={!!displayName.error}
            errorText={displayName.error}
          /> */}
        <Header>SIGN UP!</Header>

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
            title="Sign Up"
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
          onPress={() => navigation.navigate("signIn")}
        >
          <Text style={{ color: "maroon" }}>
            Already have an account? Log in
          </Text>
        </TouchableOpacity>
      </View>
      {/* </ImageBackground> */}
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
