import React from "react";
import { Image } from "react-native";

export default function Avatar({ size, user }) {
  return (
    <Image
      style={{
        width: 55,
        height: 55,
        borderRadius: size,
      }}
      source={
        user.photoURL
          ? { uri: user.photoURL }
          : require("../assets/icon-profile.jpeg")
      }
      resizeMode="cover"
    />
  );
}
