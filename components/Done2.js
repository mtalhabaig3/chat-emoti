import React, { useContext } from "react";
import { TouchableOpacity, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import GlobalContext from "../context/Context";
import { useNavigation } from "@react-navigation/native";
export default function Done2(props) {
  const { emoResolve } = props;
  const {
    theme: { colors },
  } = useContext(GlobalContext);
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => emoResolve("bUser")}
      style={{
        // position: "absolute",
        borderRadius: 60,
        width: 50,
        height: 50,
        // backgroundColor: "#EADDCA",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
        source={require("../assets/userEmotion.png")}
        style={{ width: 35, height: 35 }}
      />
    </TouchableOpacity>
  );
}
