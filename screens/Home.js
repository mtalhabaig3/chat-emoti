import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  ImageBackground,
  ScrollView,
} from "react-native";
import AccountInfo from "./AccountInfo";
import Photo from "./Photo";
import Chats from "./Chats";
import { Ionicons } from "@expo/vector-icons";
import Contacts from "./Contacts";

import AnalogClock from "react-native-clock-analog";
import Block from "../components/Block";
import Text from "../components/Text";
import arabic from "react-date-object/calendars/arabic";
import arabic_ar from "react-date-object/locales/arabic_ar";
import DateObject from "react-date-object";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Home = () => {
  // var date = new DateObject({ calendar: arabic, locale: arabic_ar });
  const months = {
    1: "Muḥarram",
    2: "Ṣafar",
    3: "Rabī‘ al-awwal",
    4: "Rabī‘ ath-thānī",
    5: "Jumādá al-ūlá",
    6: "Jumādá al-ākhirah",
    7: "Rajab",
    8: "Sha‘bān",
    9: "Ramaḍān",
    10: "Shawwāl",
    11: "Dhū al-Qa‘dah",
    12: "Dhū al-Ḥijjah",
  };
  var moment = require("moment-hijri");
  var islamicdate = moment().format("iYYYY/iM/iD");
  var date = moment().toDate();

  const Tab = createBottomTabNavigator();

  const moment2 = require("moment");
  let now = moment();

  return (
    // <ScrollView>
    <SafeAreaView style={styles.container}>
      <Block row style={[styles.card, { alignItems: "center" }]}>
        <Block style={{ marginRight: 20 }} elevation={6}>
          <AnalogClock
            colorClock="#ffe4c4"
            colorNumber="maroon"
            colorCenter="#be0032"
            colorHour="black"
            colorMinutes="#8b4513"
            autostart={true}
            size={140}
            showSeconds
          />
        </Block>

        <Block elevation={6} column>
          <Text style={{ color: "white", fontSize: 80, textAlign: "center" }}>
            {islamicdate.slice(7)}
          </Text>
          <Text style={{ color: "white", fontSize: 30, textAlign: "center" }}>
            {months[islamicdate[5]]}, {islamicdate.slice(0, 4)} Hijri
          </Text>
          <Text
            style={{
              color: "white",
              fontSize: 15,
              textAlign: "center",
              marginTop: 10,
            }}
          >
            {moment2().toDate().toString().slice(0, 16)}
          </Text>
        </Block>
      </Block>

      <Block style={styles.card}>
        <Block row style={{ marginRight: 20 }} elevation={6}>
          <Text style={{ fontSize: 40, color: "white" }}>Ayat</Text>
          <Text
            style={{
              fontSize: 15,
              color: "white",
              marginTop: 18,
              marginLeft: 5,
            }}
          >
            Of the Day
          </Text>
        </Block>
        <Block>
          <Text
            style={{
              fontSize: 17,
              color: "white",
              marginVertical: 8,
              alignSelf: "flex-end",
            }}
          >
            ٱلْحَمْدُ لِلَّهِ ٱلَّذِىٓ أَنزَلَ عَلَىٰ عَبْدِهِ ٱلْكِتَـٰبَ
            وَلَمْ يَجْعَل لَّهُۥ عِوَجَاۜ
          </Text>
          <Text
            style={{
              fontSize: 17,
              color: "white",
              marginVertical: 8,
            }}
          >
            "All praise is for Allah Who has revealed the Book to His servant,
            allowing no crookedness in it."
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: "white",
              marginVertical: 8,
              alignSelf: "flex-end",
            }}
          >
            Surah Kahaf 18:1
          </Text>
        </Block>
      </Block>
      <Block style={styles.card}>
        <Block row style={{ marginRight: 20 }} elevation={6}>
          <Text style={{ fontSize: 40, color: "white" }}>Hadith</Text>
          <Text
            style={{
              fontSize: 15,
              color: "white",
              marginTop: 18,
              marginLeft: 5,
            }}
          >
            Of the Day
          </Text>
        </Block>
        <Block>
          <Text
            style={{
              fontSize: 17,
              color: "white",
              marginVertical: 8,
              alignSelf: "flex-end",
            }}
          >
            "عَنِ النَّبِيِّ صلى الله عليه وسلم قَالَ : "خَيْرُكُمْ مَنْ
            تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ
          </Text>
          <Text
            style={{
              fontSize: 17,
              color: "white",
              marginVertical: 8,
            }}
          >
            "The Prophet (ﷺ) said, "The best among you (Muslims) are those who
            learn the Qur'an and teach it.""
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: "white",
              marginVertical: 8,
              alignSelf: "flex-end",
            }}
          >
            Sahih al-Bukhari 5027
          </Text>
        </Block>
      </Block>
      <Tab.Navigator
        screenOptions={({ route }) => {
          return {
            tabBarLabel: () => {
              if (route.name === "photo") {
                return <Ionicons name="camera" size={20} color="#EADDCA" />;
              } else if (route.name === "accountInfo") {
                return <Ionicons name="person" size={20} color="#EADDCA" />;
              } else {
                return (
                  <Text style={{ color: "white" }}>
                    {route.name.toLocaleUpperCase()}
                  </Text>
                );
              }
            },
            tabBarShowIcon: true,
            tabBarLabelStyle: {
              color: "white",
            },
            tabBarIndicatorStyle: {
              backgroundColor: "white",
            },
            tabBarStyle: {
              backgroundColor: "maroon",
            },
          };
        }}
        initialRouteName="chats"
      >
        <Tab.Screen name="accountInfo" component={AccountInfo} />
        <Tab.Screen name="photo" component={Photo} />
        <Tab.Screen name="chats" component={Chats} />
        <Tab.Screen name="contacts" component={Contacts} />
      </Tab.Navigator>
    </SafeAreaView>
    // </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  card: {
    padding: 20,
    backgroundColor: "rgba(220, 20, 60, 0.5)",
    shadowColor: "black",
    shadowOpacity: 5,
    shadowRadius: 3,
    shadowOffset: {
      height: 3,
      width: 3,
    },
    borderRadius: 20,
    flex: 0.25,
    justifyContent: "flex-end",
    width: "95%",
    padding: 10,
    // alignContent: "center",
    // alignItems: "center",
    // alignSelf: "center",
    marginTop: 20,
    flex: 0,
  },
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
    padding: 10,
    backgroundColor: "#D6A0A9",
  },
});
