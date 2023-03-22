import React, {
  LegacyRef,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Platform,
  Animated,
  FlatList,
  NativeScrollEvent,
} from "react-native";
const { width: screenWidth } = Dimensions.get("window");
import * as ImagePicker from "expo-image-picker";
import { Feather } from "@expo/vector-icons";
import { pressedOpacity } from "../constants/Values";
import { ImageEditor } from "expo-image-editor";
import AsyncStorage from "@react-native-async-storage/async-storage";

import AnimatedDotsCarousel from "react-native-animated-dots-carousel";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";
import PurpleButton from "../components/PurpleButton";
import { ScreenWidth } from "react-native-elements/dist/helpers";
import ColoredPlus from "../assets/svg-components/colored_plus";
import { LinearGradient } from "expo-linear-gradient";
import Layout from "../constants/Layout";
import { fonts } from "../globalStyle/globalFont";
export function NewPostImage({ navigation }) {
  const [image, setImage] = useState<string[]>([]);
  const [uri, setUri] = useState("");
  const [modalVisibility, setModalVisibility] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [refresh, setFresh] = useState(false);
  const { width, height } = Dimensions.get("screen");
  const ITEM_WIDTH = ScreenWidth - 60;

  const data = image.map((image, index) => ({
    key: String(index),
    photo: image,
  }));

  const storePermission = async () => {
    try {
      await AsyncStorage.setItem("PhotoPermission", "true");
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    AsyncStorage.getItem("PhotoPermission", (errs, result) => {
      if (!errs) {
        if (result == null) {
          (async () => {
            if (Platform.OS !== "web") {
              const { status } =
                await ImagePicker.requestMediaLibraryPermissionsAsync();
              if (status !== "granted") {
                alert("Sorry, we need gallary permissions to make this work!");
              } else {
                storePermission();
              }
            }
          })();
        }
      }
    });
  }, []);

  const scrollX = useRef(new Animated.Value(0)).current;

  const flatListRef: MutableRefObject<FlatList<any> | undefined> = useRef();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.cancelled) {
      console.log(result);
      setUri(result["uri"]);
      setModalVisibility(true);
    }
  };
  const saveandcompress = async (uri, r, w, h) => {
    const manipResult = await manipulateAsync(
      uri,
      [
        r
          ? {
              crop: {
                height: (w * 4) / 3,
                originX: 0,
                originY: (h - (w * 4) / 3) / 2,
                width: w,
              },
            }
          : { crop: { height: h, originX: 0, originY: 0, width: w } },
      ],
      {
        compress: 0.5,
        format: SaveFormat.JPEG,
        base64: true,
      }
    );
    setUri("");
    if (image.length < 7) {
      setImage([
        ...image.slice(0, -1),
        "data:image/jpeg;base64," + manipResult["base64"],
        "",
      ]);
    } else {
      setImage([
        ...image.slice(0, -1),
        "data:image/jpeg;base64," + manipResult["base64"],
      ]);
    }
  };

  const _renderItem: React.FC<any> = ({ item, index }) => {
    const inputRange = [
      (index - 1) * screenWidth,
      index * screenWidth,
      (index + 1) * screenWidth,
    ];
    const xOffset = scrollX.interpolate({
      inputRange,
      outputRange: [-screenWidth * 0.7, 0, screenWidth * 0.7],
    });
    return item.photo == "" ? (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          width,
          height: (screenWidth * 440) / 366,
        }}
      >
        <View
          style={{
            width: ITEM_WIDTH,

            overflow: "hidden",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 8,
          }}
        >
          <LinearGradient
            colors={["#DF9856", "#DE6CD3", "#AD68E3"]}
            style={styles.highLight}
            start={{ x: 0.9, y: 0 }}
            end={{ x: 0.1, y: 1 }}
          >
            <TouchableOpacity
              style={[styles.plusButton]}
              onPress={() => pickImage()}
            >
              <ColoredPlus />
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    ) : (
      <View
        style={{
          justifyContent: "flex-start",
          alignItems: "center",
          width,
          height: (screenWidth * 440) / 366,
        }}
      >
        <View
          style={{
            width: ITEM_WIDTH,
            overflow: "hidden",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 8,
          }}
        >
          <Animated.Image
            source={{ uri: item.photo }}
            style={{
              width: ITEM_WIDTH * 1.4,
              height: (screenWidth * 440) / 366,
              resizeMode: "cover",
              transform: [{ translateX: xOffset }],
            }}
          />
          <TouchableOpacity
            activeOpacity={pressedOpacity}
            style={{ position: "absolute", bottom: 24, left: 24 }}
            onPress={() => {
              if (image.length == 2) {
                setImage([]);
              } else {
                image.splice(index, 1);
                setImage(image);
                flatListRef.current?.scrollToIndex({
                  index: image.length - 2,
                });

                setFresh(!refresh);
              }
            }}
          >
            <Feather name="trash" size={28} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View
      style={{
        backgroundColor: "#ffffff",
        height: "100%",
      }}
    >
      {image.length > 0 && (
        <Text
          style={[
            fonts.Title1,
            {
              marginStart: 32,
              marginBottom: 20,
              marginTop: 36,
            },
          ]}
        >
          Image Upload
        </Text>
      )}
      {image.length == 0 && (
        <View style={styles.noResultView}>
          <Text style={[fonts.pageHeading2, { marginBottom: 16 }]}>
            Image Upload
          </Text>
          <Text
            style={[
              fonts.body1,
              {
                color: "#707070",
                flexShrink: 0,
                paddingHorizontal: "10%",
                textAlign: "center",
              },
            ]}
          >
            Add images of your item to get started with a new listing
          </Text>
        </View>
      )}
      {uri != "" && (
        <ImageEditor
          visible={modalVisibility}
          onCloseEditor={() => {
            setModalVisibility(false);
            setUri("");
          }}
          imageUri={uri}
          minimumCropDimensions={{
            width: 100,
            height: 100,
          }}
          onEditingComplete={(result) => {
            if (result.height / result.width > 4 / 3) {
              saveandcompress(result.uri, true, result.width, result.height);
            } else {
              saveandcompress(result.uri, false, result.width, result.height);
            }
          }}
          lockAspectRatio={false}
          mode="full"
        />
      )}

      {data.length > 0 && (
        <View style={{ height: (screenWidth * 440) / 366, width: "100%" }}>
          <Animated.FlatList
            ref={flatListRef as LegacyRef<FlatList<any>> | undefined}
            data={data}
            keyExtractor={(item) => item.key}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled={true}
            extraData={refresh}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              {
                useNativeDriver: true,
                listener: ({
                  nativeEvent,
                }: {
                  nativeEvent: NativeScrollEvent;
                }) => {
                  setActiveSlide(nativeEvent.contentOffset.x / screenWidth);
                  // other actions to be performed on scroll
                },
              }
            )}
            renderItem={_renderItem}
          />
        </View>
      )}
      <View style={{ width: "100%", alignItems: "center", height: 20 }}>
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
          width: "100%",
          height: 80,
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}
      >
        <View
          style={{
            alignItems: "center",
            position: "absolute",
            bottom: Layout.window.height * 0.05,
            width: "100%",
          }}
        >
          {image.length > 0 ? (
            <PurpleButton
              text={"Continue"}
              onPress={() => {
                navigation.navigate("NewPostDetail", {
                  image: image.filter((item) => {
                    return item != "";
                  }),
                });
              }}
              enabled={true}
            />
          ) : (
            <PurpleButton
              text={"Add Images"}
              onPress={() => {
                pickImage();
              }}
              enabled={true}
            />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  noResultView: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },

  highLight: {
    borderRadius: 30,
    width: 60,
    height: 60,
    alignContent: "center",
    paddingVertical: 2,
    paddingHorizontal: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  plusButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 28,
    width: 56,
    height: 56,
  },
  buttonContinue: {
    backgroundColor: "#9E70F6",
    paddingHorizontal: 60,
    paddingVertical: 16,
    borderRadius: 25,
    elevation: 2,
    width: "60%",
  },
});
