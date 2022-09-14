import React from "react";
import { View, SafeAreaView, StyleSheet, Image } from "react-native";
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from "react-native-paper";
import BackButton from "../components/BackButton";
import { useRoute } from "@react-navigation/native";

import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

const UserBAccount = ({ navigation }) => {
  const route = useRoute();
  const userb = route.params.userb;
  console.log(userb.displayName);
  console.log(userb.email);
  console.log(userb.photoURL);
  return (
    <>
      <SafeAreaView style={styles.container}>
        <View
          style={[
            styles.userInfoSection,
            { justifyContent: "center", alignItems: "center" },
          ]}
        >
          <View style={{ marginTop: 15 }}>
            <Image style={styles.image} source={{ uri: userb.photoURL }} />
            <View style={{ marginLeft: 20 }}>
              <Title
                style={[
                  styles.title,
                  {
                    marginTop: 15,
                    marginBottom: 5,
                  },
                ]}
              >
                {userb.displayName}
              </Title>
            </View>
          </View>
        </View>
        <View style={styles.userInfoSection}>
          <View style={styles.row}>
            <MaterialCommunityIcons
              name="map-marker-radius"
              color="maroon"
              size={20}
            />
            <Text style={{ color: "#777777", marginLeft: 20 }}>
              Peshawar, Pakistan
            </Text>
          </View>
          <View style={styles.row}>
            <MaterialCommunityIcons name="phone" color="maroon" size={20} />
            <Text style={{ color: "#777777", marginLeft: 20 }}>
              +92-1234567891
            </Text>
          </View>
          <View style={styles.row}>
            <MaterialCommunityIcons name="email" color="maroon" size={20} />
            <Text style={{ color: "#777777", marginLeft: 20 }}>
              {userb.email}
            </Text>
          </View>
        </View>

        <TouchableRipple
          style={styles.btn}
          onPress={() => console.log("blocked!")}
        >
          <Text style={styles.btnTxt}>Block</Text>
        </TouchableRipple>
        <BackButton goBack={() => navigation.goBack()} />
      </SafeAreaView>
    </>
  );
};

export default UserBAccount;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EADDCA",
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    // textAlign: "center",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
    flexDirection: "row",
    height: 100,
  },
  infoBox: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  btn: {
    height: 50,
    width: 270,
    backgroundColor: "maroon",
    borderRadius: 80,
    marginLeft: 75,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 400,
  },
  btnTxt: {
    color: "white",
    fontWeight: "bold",
    fontSize: 17,
  },
  menuItemText: {
    color: "#777777",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
  },
  text: { color: "maroon", marginLeft: 20 },
  image: { width: 100, height: 100, borderRadius: 50 },
});
