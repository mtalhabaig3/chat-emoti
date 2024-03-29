import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { theme } from "../core/theme";

export default function Header(props) {
  return <Text style={styles.header} {...props} />;
}

const styles = StyleSheet.create({
  header: {
    fontSize: 30,
    color: "maroon",
    marginBottom: 25,
    // fontWeight: "bold",
    paddingVertical: 12,
    textAlign: "center",
    fontStyle: "italic",
    fontFamily: "Arial Rounded MT Bold",
    fontWeight: "600",
  },
});
