import React, { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView, View, ImageBackground } from "react-native";
import AnalogClock from "react-native-clock-analog";
import Block from "../components/Block";
import Text from "../components/Text";
import arabic from "react-date-object/calendars/arabic";
import arabic_ar from "react-date-object/locales/arabic_ar";
import DateObject from "react-date-object";

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

  const moment2 = require("moment");
  let now = moment();

  return (
    <SafeAreaView style={styles.container}>
      <Text></Text>
      <Block row style={styles.card}>
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
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  card: {
    paddingVertical: 20,
    backgroundColor: "rgba(220, 20, 60, 0.6)",
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
    padding: 8,
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
    padding: 10,
  },
});
