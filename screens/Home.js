import React, { Component } from "react";
import { Text } from "react-native";
import arabic from "react-date-object/calendars/arabic";
import arabic_ar from "react-date-object/locales/arabic_ar";

const Home = () => {
  var date = new DateObject({ calendar: arabic, locale: arabic_ar });

  return <Text>{date.format()}</Text>;
};

export default Home;
