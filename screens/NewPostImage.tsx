import React, { useEffect, useRef, useState } from "react";
import Modal from "react-native-modal";

import {
  StyleSheet,
  Text,
  Pressable,
  View,
  Image,
  Alert,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Platform,
  ListRenderItem,
  StatusBar,
} from "react-native";
const { width: screenWidth } = Dimensions.get("window");
import * as ImagePicker from "expo-image-picker";

import { AntDesign, Feather } from "@expo/vector-icons";
import { pressedOpacity } from "../constants/Values";
import Carousel, {
  Pagination,
  ParallaxImage,
} from "react-native-snap-carousel";
import AnimatedDotsCarousel from "react-native-animated-dots-carousel";

export function NewPostImage({ navigation }) {
  const [image, setImage] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [refresh, setFresh] = useState(false);
  const _carousel = useRef(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage([...image.slice(0, -1), result.uri, ""]);
    }
  };
  function _renderItem({ item, index }, parallaxProps) {
    return item == "" ? (
      <View
        style={[
          styles.item,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <TouchableOpacity
          activeOpacity={pressedOpacity}
          style={styles.roundButton1}
          onPress={() => {
            pickImage();
          }}
        >
          <Feather name="plus" size={36} color="black" />
        </TouchableOpacity>
      </View>
    ) : (
      <View style={styles.item}>
        <ParallaxImage
          source={{ uri: item }}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.4}
          showSpinner={true}
          spinnerColor={"rgba(255, 255, 255, 0.4)"}
          {...parallaxProps}
        />
        <TouchableOpacity
          activeOpacity={pressedOpacity}
          style={{ position: "absolute", bottom: 20, left: 20 }}
          onPress={() => {
            if (image.length == 2) {
              setImage([]);
            } else {
              image.splice(index, 1);
              setImage(image);
              setFresh(!refresh);
            }
          }}
        >
          <Feather name="trash" size={28} color="white" />
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View
      style={{
        backgroundColor: "#ffffff",
        height: "100%",
      }}
    >
      {image.length > 0 && (
        <Text
          style={{
            fontFamily: "Rubik-Medium",
            fontSize: 18,
            marginStart: 32,
            marginBottom: 20,
            marginTop: 36,
          }}
        >
          Image Upload
        </Text>
      )}
      {image.length == 0 && (
        <View style={styles.noResultView}>
          <Text style={styles.noResultHeader}>Image Upload</Text>
          <Text style={styles.noResultSubHeader}>
            Add images of your item to get started with a new listing
          </Text>
        </View>
      )}
      <View style={{ height: screenWidth - 60 }}>
        <Carousel
          ref={(c) => {
            _carousel.current = c;
          }}
          sliderWidth={screenWidth}
          sliderHeight={screenWidth}
          itemWidth={screenWidth - 60}
          data={image}
          extraData={refresh}
          renderItem={_renderItem}
          hasParallaxImages={true}
          onSnapToItem={(index) => setActiveSlide(index)}
        />
      </View>
      <View
        style={{
          width: "100%",
          height: 40,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 24,
        }}
      >
        <AnimatedDotsCarousel
          length={image.length}
          currentIndex={activeSlide}
          maxIndicators={1}
          interpolateOpacityAndColor={true}
          activeIndicatorConfig={{
            color: "#707070",
            margin: 3,
            opacity: 1,
            size: 8,
          }}
          inactiveIndicatorConfig={{
            color: "#707070",
            margin: 3,
            opacity: 0.5,
            size: 8,
          }}
          decreasingDots={[
            {
              config: { color: "#707070", margin: 3, opacity: 0.5, size: 6 },
              quantity: 1,
            },
            {
              config: { color: "#707070", margin: 3, opacity: 0.5, size: 4 },
              quantity: 1,
            },
          ]}
        />
      </View>
      <View
        style={{
          alignItems: "center",
          position: "absolute",
          bottom: "5%",
          width: "100%",
        }}
      >
        {image.length > 0 ? (
          <Pressable
            style={[styles.buttonContinue]}
            onPress={() => {
              navigation.navigate("NewPostDetail");
            }}
          >
            <Text style={styles.textStyle}>Continue</Text>
          </Pressable>
        ) : (
          <Pressable
            style={[styles.buttonContinue]}
            onPress={() => {
              pickImage();
            }}
          >
            <Text style={styles.textStyle}>Add Images</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  noResultView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noResultHeader: {
    fontFamily: "Rubik-Medium",
    fontSize: 18,
    marginBottom: 16,
  },
  noResultSubHeader: {
    fontFamily: "Rubik-Regular",
    fontSize: 16,
    textAlign: "center",
    color: "#707070",
    flexShrink: 0,
    width: "70%",
    fontWeight: "400",
  },
  roundButton1: {
    width: 64,
    height: 64,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 100,
    elevation: 10,
    shadowOpacity: 0.2,
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 3 },
    backgroundColor: "white",
  },
  buttonContinue: {
    backgroundColor: "#9E70F6",
    paddingHorizontal: 60,
    paddingVertical: 16,
    borderRadius: 25,
    elevation: 2,
    width: "60%",
  },
  textStyle: {
    fontFamily: "Rubik-Medium",
    fontSize: 18,
    color: "white",
    textAlign: "center",
    letterSpacing: 0.5,
  },
  item: {
    width: screenWidth - 60,
    height: screenWidth - 60,
    margin: 0,
  },
  imageContainer: {
    flex: 1,
    // marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: "white",
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover",
  },
});