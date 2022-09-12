// import { useRoute } from "@react-navigation/native";
// import React, { useContext } from "react";
// import { View, Text } from "react-native";
// import GlobalContext from "../context/Context";
// import Avatar from "./Avatar";

// export default function ChatHeader(props) {
//   const route = useRoute();
//   const {
//     theme: { colors },
//   } = useContext(GlobalContext);
//   return (
//     <View style={{ flexDirection: "row" }}>
//       <View>
//         <Avatar size={40} user={route.params.user} />
//       </View>
//       <View
//         style={{
//           marginLeft: 15,
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         <Text style={{ color: colors.white, fontSize: 18 }}>
//           {route.params.user.contactName || route.params.user.displayName}
//         </Text>
//       </View>
//     </View>
//   );
// }

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Icon from "@expo/vector-icons/FontAwesome";
import { useRoute, useNavigation } from "@react-navigation/native";
import Avatar from "./Avatar";
import UserBAccount from "../screens/UserBAccount";

export default function ChatHeader(props) {
  const navigation = useNavigation();
  const route = useRoute();
  var userb = route.params.user;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Icon name="angle-left" size={30} color={"white"} />
      </TouchableOpacity>
      <View style={styles.profileOptions}>
        <TouchableOpacity
          style={styles.profile}
          onPress={() => navigation.navigate("UserBAccount", { userb })}
        >
          <View>
            <Avatar size={40} user={route.params.user} />
          </View>
          <View style={styles.usernameAndOnlineStatus}>
            <Text style={styles.username}>
              {route.params.user.contactName || route.params.user.displayName}
            </Text>
            <Text style={styles.onlineStatus}>{props.onlineStatus}</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.options}>
          <TouchableOpacity style={{ paddingHorizontal: 5 }}>
            {props.Done}
          </TouchableOpacity>
          <TouchableOpacity style={{ paddingHorizontal: 10 }}>
            <Icon name="ellipsis-v" size={30} color="#EADDCA" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#800000",
    paddingTop: 40,
    paddingBottom: 10,
  },
  backButton: {
    alignSelf: "center",
    paddingHorizontal: 10,
  },
  profileOptions: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  profile: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#fff",
    flex: 4,
  },
  usernameAndOnlineStatus: {
    flexDirection: "column",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  username: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    color: "#EADDCA",
  },
  onlineStatus: {
    color: "white",
    fontSize: 15,
    color: "#EADDCA",
  },
  options: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
});
