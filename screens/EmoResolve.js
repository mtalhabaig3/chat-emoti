import { useRoute } from "@react-navigation/native";
import React, { Component } from "react";
import { View, Text } from "react-native";

export default function EmoResolve(props) {
  const route = useRoute();
  let emotion = route.params.result;
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
      }}
    >
      <Text style={{ fontSize: 22, padding: 10 }}>
        After having seen your conversation, today you are
      </Text>
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
    </View>
  );
}
