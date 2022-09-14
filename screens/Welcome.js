import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Keyboard,
  ScrollView,
  Animated,
  Image,
} from "react-native";
import TextInput from "../components/TextInput";
import { TouchableOpacity } from "react-native";
import Context from "../context/Context";
import { emailValidator } from "../helpers/emailValidator";
import { passwordValidator } from "../helpers/passwordValidator";
import { Block } from "expo-ui-kit";
import { signIn, signUp } from "../firebase";
import Button from "../components/Button";
import Header from "../components/Header";
import { theme } from "../constants";

const { SIZES, COLORS } = theme;

const background = {
  welcome: require("../assets/welcome.png"),
  encrypted: require("../assets/emotionBrain2.png"),
  privacy: require("../assets/emotionColor.png"),
};

const backgrounds = [
  {
    title: "Do you know?",
    description:
      "There are basic 8 different types of emotions i.e. Joy, Sadness, Fear, Disgust, Surprise, Anticipation, Anger and Trust.",
    img: background.welcome,
  },
  {
    title: "What is Emotion?",
    description:
      "Emotions are electrochemical signals that flow through us in an unending cycle. ",
    img: background.encrypted,
  },
  {
    title: "Colors Influence How You Feel.",
    description:
      "Different colors can stir up certain emotions because of what we associate with these hues from nature.",
    img: background.privacy,
  },
];

export default function Welcome({ navigation }) {
  const image = { uri: "../assets/wallpaper_3.jpeg" };
  const scrollX = new Animated.Value(0);

  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    scrollX.addListener(({ value }) => {
      setSlideIndex(Math.floor(value / SIZES.width));
    });
  }, []);

  function renderImages() {
    return (
      <ScrollView
        horizontal
        pagingEnabled
        scrollEnabled
        decelerationRate={0}
        scrollEventThrottle={16}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
      >
        {backgrounds.map((item, index) => (
          <Block
            center
            bottom
            key={`img-${index}`}
            style={{ width: SIZES.width }}
          >
            <Image
              source={item.img}
              resizeMode="center"
              style={{
                width: SIZES.width / 1.5,
                height: "100%",
              }}
            />
          </Block>
        ))}
      </ScrollView>
    );
  }

  function renderDots() {
    const dotPosition = Animated.divide(scrollX, SIZES.width);

    return (
      <Block
        flex={false}
        row
        center
        middle
        margin={[SIZES.padding, 0, SIZES.padding * 2, 0]}
      >
        {backgrounds.map((item, index) => {
          const opacity = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.3, 1, 0.3],
            extrapolate: "clamp",
          });

          return (
            <Block
              black
              animated
              flex={false}
              key={`dot-${index}`}
              radius={SIZES.small}
              margin={[0, SIZES.small / 2]}
              style={[styles.dot, { opacity }]}
            />
          );
        })}
      </Block>
    );
  }

  function renderTexts() {
    const background = backgrounds[slideIndex];

    return (
      <React.Fragment>
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>
          {background && background.title}
        </Text>
        <Text style={{ fontSize: 16 }}>
          {background && background.description}
        </Text>
      </React.Fragment>
    );
  }

  return (
    <View
      style={{
        // justifyContent: "center",
        // alignItems: "center",
        flex: 1,
        backgroundColor: "#EADDCA",
        justifyContent: "center",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* <ImageBackground
        source={require("../assets/maybe.jpeg")}
        style={styles.image}
        // blurRadius={2}
      > */}
      <Text
        style={{
          color: "maroon",
          fontSize: 40,
          marginBottom: 20,
          fontFamily: "Arial Rounded MT Bold",
          fontWeight: "bold",
          position: "absolute",
          top: 130,
        }}
      >
        {" "}
        CHAT EMOTI{" "}
      </Text>
      <Block safe>
        <Block center middle>
          {renderImages()}
          {renderDots()}
          {renderTexts()}
        </Block>
      </Block>
      <View style={{ marginTop: 20, position: "absolute", bottom: 180 }}>
        <Header>MARHABA!</Header>
        <Button
          mode="contained"
          style={{
            backgroundColor: "#f72b2b",
          }}
          onPress={() => navigation.navigate("signIn")}
        >
          Login
        </Button>
        <Button mode="outlined" onPress={() => navigation.navigate("signup")}>
          Sign Up
        </Button>
      </View>
      {/* </ImageBackground> */}
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    marginTop: 20,
    backgroundColor: "maroon",
    borderRadius: 40,
    width: 300,
  },
  dot: { width: SIZES.base, height: SIZES.base },
});
