import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Platform,
  Image,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BackButton from "../assets/svg-components/back_button";
import { menuBarTop } from "../constants/Layout";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { FAB } from "react-native-paper";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  backButton: {
    position: "absolute",
    top: Platform.OS === "ios" ? menuBarTop : 20,
    left: 20,
    zIndex: 1,
    width: 20,
    height: 30,
  },
  title: {
    position: "absolute",
    top: Platform.OS === "ios" ? menuBarTop : 20,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  titleText: {
    fontFamily: "Rubik-Medium",
    fontSize: 18,
  },
  headerButton: {
    position: "absolute",
    top: Platform.OS === "ios" ? menuBarTop : 20,
    right: 20,
  },
  buttonText: {
    color: "#9E70F6",
    fontFamily: "Rubik-Medium",
    fontSize: 16,
  },
  feedbackInstructions: {
    fontFamily: "Rubik-Regular",
    fontSize: 16,
    marginTop: Platform.OS === "ios" ? menuBarTop + 50 : 70,
    marginHorizontal: 24,
    textAlign: "center",
  },
  feedbackText: {
    fontFamily: "Rubik-Regular",
    fontSize: 16,
    backgroundColor: "#F4F4F4",
    borderRadius: 10,
    marginHorizontal: 24,
    marginTop: 20,
    height: 190,
    padding: 10,
    textAlignVertical: "top",
  },
  sectionTitle: {
    fontFamily: "Rubik-Medium",
    fontSize: 16,
    marginTop: 20,
    marginHorizontal: 24,
  },
  fab: {
    marginTop: "auto",
    marginBottom: "auto",
  },
  chosenImage: {
    width: 100,
    height: 100,
    borderRadius: 20,
  },
  imageUploadWrapper: {
    paddingTop: 10,
    marginHorizontal: 24,
    alignItems: "flex-start",
    flexDirection: "row",
    flex: 3,
    gap: 10
  },
});

export default function SendFeedbackScreen({ navigation }) {
  const [images, setImages] = useState([]);
  const [feedbackText, setFeedbackText] = useState("");
  const [userId, setUserId] = useState("");

  AsyncStorage.getItem("userId", (errs, result) => {
    if (!errs) {
      if (result !== null && result !== undefined) {
        setUserId(result);
      }
    }
  });
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
                alert("Sorry, we need gallery permissions to make this work!");
              } else {
                storePermission();
              }
            }
          })();
        }
      }
    });
  }, []);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
      quality: 0.5,
    });
    if (!result.canceled && result !== null) {
      if (images.length < 3) {
        setImages([...images, "data:image/jpeg;base64," + result["base64"]]);
      }
    }
  };

  const editImage = async (index) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
      quality: 0.5,
    });
    if (!result.canceled && result !== null) {
      let updatedImages = [...images];
      updatedImages[index] = "data:image/jpeg;base64," + result["base64"];
      setImages(updatedImages);
    }
  }

  const submitFeedback = async () => {
    try {
      const response = await fetch(
        "https://resell-dev.cornellappdev.com/api/feedback/",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            description: feedbackText,
            images: images,
            userId: userId, //TODO: replace this with actual userID
          }),
        }
      );
      const json = await response.json();
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    setFeedbackText(event);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <BackButton color="black" />
      </TouchableOpacity>
      <View style={styles.title}>
        <Text style={styles.titleText}>Send Feedback</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          if (feedbackText.length > 0) {
            submitFeedback();
            navigation.goBack();
          } else {
            Alert.alert("Warning", "Feedback cannot be empty!");
          }
        }}
        style={styles.headerButton}
      >
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      <Text style={styles.feedbackInstructions}>
        Thanks for using Resell! We appreciate any feedback to improve your
        experience.
      </Text>
      <TextInput
        multiline={true}
        style={styles.feedbackText}
        onChangeText={handleChange}
      />
      <Text style={styles.sectionTitle}>Image Upload</Text>
      <View style={styles.imageUploadWrapper}>
        {images.map((imageURI, index) => (
          <TouchableOpacity key={index} onPress={() => editImage(index)}>
            <Image style={styles.chosenImage} source={{ uri: imageURI }} />
          </TouchableOpacity>
        ))}
        {images.length < 3 && (
          <TouchableOpacity
            style={[
              styles.chosenImage,
              { backgroundColor: "#F4F4F4", alignItems: "center" },
            ]}
            onPress={pickImage}
          >
            <FAB
              style={styles.fab}
              icon="plus"
              color={"#808080"}
              theme={{ colors: { accent: "white" } }}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
