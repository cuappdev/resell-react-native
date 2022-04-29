import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Platform,
  Image,
} from "react-native";
import { IconButton, Colors } from "react-native-paper";
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
    top: menuBarTop,
    left: 20,
    zIndex: 1,
    width: 20,
    height: 30,
  },
  title: {
    position: "absolute",
    top: menuBarTop,
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
    top: menuBarTop,
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
    marginTop: menuBarTop + 50,
    marginHorizontal: 20,
    textAlign: "center",
  },
  feedbackText: {
    fontFamily: "Rubik-Regular",
    fontSize: 16,
    backgroundColor: "#F4F4F4",
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 20,
    height: 190,
    padding: 10,
    textAlignVertical: "top",
  },
  sectionTitle: {
    fontFamily: "Rubik-Medium",
    fontSize: 16,
    marginTop: 20,
    marginHorizontal: 20,
  },
  fab: {
    marginTop: "auto",
    marginBottom: "auto",
  },
  chosenImage: {
    width: 300,
    height: 200,
    borderRadius: 20,
  },
  imageUploadWrapper: {
    paddingTop: 10,
    alignItems: "center",
  },
});

export default function SendFeedbackScreen({ navigation }) {
  const [image, setImage] = useState(null);
  const [selectImage, setSelectImage] = React.useState(false);
  const [feedbackText, setFeedbackText] = useState("");

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      //   allowsEditing: true,
      //   aspect: [5, 2],
      base64: true,
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      setSelectImage(true);
    }
  };

  const submitFeedback = async () => {
    try {
      console.log(feedbackText);
      const response = await fetch(
        "https://resell-dev.cornellappdev.com/api/feedback/",
        {
          method: "POST",
          body: JSON.stringify({
            description: "I love the app",
            images: [image],
            userId: "381527oejf-42b4-4fdd-b074-dfwbejko229", //TODO: replace this with actual userID
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
          submitFeedback();
          navigation.goBack();
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
        {!selectImage && (
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
        {selectImage && (
          <TouchableOpacity onPress={pickImage}>
            <Image style={styles.chosenImage} source={{ uri: image }} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
