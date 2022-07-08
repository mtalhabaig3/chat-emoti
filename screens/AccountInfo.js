import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { auth } from "../firebase";
import { SignOut } from "../firebase";
import { Button } from "react-native-paper";

export default function AccountScreen() {
  const { currentUser } = auth;
  return (
    <View style={styles.container}>
      <Image style={styles.img} source={{ uri: currentUser.photoURL }} />
      <Text style={[styles.text, { position: "absolute", top: 240 }]}>
        {currentUser.displayName}
      </Text>
      <Text style={[styles.text, { position: "absolute", top: 340 }]}>
        This is my Bio! I love Chatemoti
      </Text>

      <View style={{ flexDirection: "row", position: "absolute", bottom: 120 }}>
        <Ionicons name="mail" size={30} color="maroon" />
        <Text
          style={[
            styles.text,
            { marginLeft: 10, fontSize: 20, fontStyle: "italic" },
          ]}
        >
          {currentUser.email}
        </Text>
      </View>
      <Button mode="contained" style={styles.btn} onPress={SignOut}>
        Log Out
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EADDCA",
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: "maroon",
    position: "absolute",
    top: 30,
  },
  text: {
    fontSize: 28,
    color: "maroon",
    fontStyle:'italic'
  },
  btn: {
    borderColor: "maroon",
    borderWidth: 3,
    backgroundColor: "maroon",
    position: "absolute",
    bottom: 50,
    color: "maroon",
  },
});
