import React, { useContext, useState } from "react";
import { View, Text, ImageBackground, StyleSheet, Button } from "react-native";
import TextInput from "../components/TextInput";
import { TouchableOpacity } from "react-native";
import Context from "../context/Context";
import { emailValidator } from "../helpers/emailValidator";
import { passwordValidator } from "../helpers/passwordValidator";
import { nameValidator } from "../helpers/nameValidator";

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

    await signUp(email, password);
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
        <View style={{ marginTop: 50, position: "absolute", bottom: 220 }}>
          {/* <TextInput
            label="Name"
            returnKeyType="next"
            value={displayName.value}
            onChangeText={(text) => setDisplayName({ value: text, error: "" })}
            error={!!displayName.error}
            errorText={displayName.error}
          /> */}

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
              disabled={!password.value || !email.value || !displayName.value}
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
            onPress={() => navigation.goBack()}
          >
            <Text style={{ color: "maroon" }}>
              Already have an account? Log in
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