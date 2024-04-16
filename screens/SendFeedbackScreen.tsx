import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from 'expo-image-manipulator';
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { FAB } from "react-native-paper";
import { useApiClient } from "../api/ApiClientProvider";
import BackButton from "../assets/svg-components/back_button";
import DeleteImage from "../assets/svg-components/deleteImage";
import PopupSheet from "../components/PopupSheet";
import Colors from "../constants/Colors";
import { menuBarTop } from "../constants/Layout";
import { fonts } from "../globalStyle/globalFont";
import { makeToast } from "../utils/Toast";

const imageSize = (Dimensions.get("window").width - 68) / 3;

export default function SendFeedbackScreen({ navigation }) {
  const [images, setImages] = useState([]);
  const [feedbackText, setFeedbackText] = useState("");
  const [userId, setUserId] = useState("");
  const [deleteModalVisibility, setDeleteModalVisibility] = useState(false);
  const [deleteImageIndex, setDeleteimageIndex] = useState(0);
  const api = useApiClient();

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

  const compressImage = async (base64) => {
    const manipulatedImage = await ImageManipulator.manipulateAsync(
      `data:image/jpeg;base64,${base64}`,
      [{ resize: { width: 800 } }],
      { compress: 0.5, format: ImageManipulator.SaveFormat.JPEG }
    );
    return manipulatedImage.uri;
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
    });
    if (!result.canceled && result !== null) {
      if (images.length < 3) {
        const compressedImage = await compressImage(result["base64"]);
        setImages([...images, compressedImage]);;
      }
    }
  };

  const editImage = async (index) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
      quality: 0.5,
    });
    if (result && !result.canceled) {
      const compressedImage = await compressImage(result["base64"]);
      let updatedImages = [...images];
      updatedImages[index] = compressedImage;
      setImages(updatedImages);
    }
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const presentDeleteModal = (index) => {
    setDeleteModalVisibility(true);
    setDeleteimageIndex(index);
  };

  const deleteImage = () => {
    setDeleteModalVisibility(false);
    let updatedImages = [...images];
    updatedImages.splice(deleteImageIndex, 1);
    setImages(updatedImages);
  };

  const submitFeedback = async () => {
    try {
      const result = await api.post("/feedback/", {
        description: feedbackText,
        images: images,
        userId: userId,
      });

      if (result.feedback) {
        makeToast({ message: "Feedback submitted successfully", type: "INFO" });
        navigation.goBack();
      } else {
        makeToast({ message: "Error submitting feedback", type: "ERROR" });
      }
    } catch (error) {
      makeToast({ message: "Error submitting feedback", type: "ERROR" });
    }
  };

  const handleChange = (event) => {
    setFeedbackText(event);
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
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
          }}
          style={styles.headerButton}
          disabled={feedbackText.trim().length === 0}
        >
          <Text
            style={[
              fonts.Title1,
              {
                color:
                  feedbackText.trim().length === 0
                    ? Colors.inactivePurple
                    : Colors.resellPurple,
              },
            ]}
          >
            Submit
          </Text>
        </TouchableOpacity>
        <Text style={styles.feedbackInstructions}>
          Thanks for using Resell! We appreciate any feedback to improve your
          experience.
        </Text>
        <TextInput
          multiline={true}
          style={styles.feedbackText}
          onChangeText={handleChange}
          onSubmitEditing={dismissKeyboard}
        />
        <Text style={styles.sectionTitle}>Image Upload</Text>
        <View style={styles.imageUploadWrapper}>
          {images.map((imageURI, index) => (
            <TouchableOpacity key={index} onPress={() => editImage(index)}>
              <Image style={styles.chosenImage} source={{ uri: imageURI }} />
              <TouchableOpacity
                style={styles.deleteImageButton}
                key={index}
                onPress={() => presentDeleteModal(index)}
              >
                <DeleteImage></DeleteImage>
              </TouchableOpacity>
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
        <PopupSheet
          isVisible={deleteModalVisibility}
          setIsVisible={setDeleteModalVisibility}
          actionName={"Delete Image"}
          submitAction={deleteImage}
          buttonText={"Delete"}
          description={"Are you sure you'd like to delete this image?"}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

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
    fontSize: 20,
  },
  headerButton: {
    position: "absolute",
    top: Platform.OS === "ios" ? menuBarTop : 20,
    right: 20,
  },
  buttonText: {
    color: "#9E70F6",
    fontFamily: "Rubik-Medium",
    fontSize: 18,
    textAlign: "center",
  },
  feedbackInstructions: {
    fontFamily: "Rubik-Regular",
    fontSize: 18,
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
    fontSize: 20,
    marginTop: 20,
    marginHorizontal: 24,
  },
  fab: {
    marginTop: "auto",
    marginBottom: "auto",
  },
  chosenImage: {
    width: imageSize,
    height: imageSize,
    borderRadius: 20,
  },
  imageUploadWrapper: {
    paddingTop: 10,
    marginHorizontal: 24,
    alignItems: "flex-start",
    flexDirection: "row",
    flex: 3,
    gap: 10,
  },
  deleteImageButton: {
    position: "absolute",
    top: -8,
    right: -2,
  },
  deleteModal: {
    borderRadius: 20,
    height: 250,
    backgroundColor: "#ffffff",
    marginHorizontal: 24,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  modalText: {
    fontFamily: "Rubik-Regular",
    fontSize: 16,
    marginHorizontal: 24,
    textAlignVertical: "top",
    textAlign: "center",
    paddingHorizontal: 50,
  },
  deleteButton: {
    borderRadius: 50,
    overflow: "hidden",
    width: Dimensions.get("window").width - 138,
    marginHorizontal: 24,
    marginBottom: 10,
  },
  deleteButtonText: {
    fontFamily: "Rubik-Medium",
    fontSize: 18,
    textAlign: "center",
    color: "white",
    backgroundColor: "#9E70F6",
    paddingVertical: 14,
  },
  cancelButtonText: {
    color: "#707070",
    fontFamily: "Rubik-Medium",
    fontSize: 18,
    textAlign: "center",
  },
  exitButton: {
    position: "absolute",
    top: 24,
    right: 24,
  },
});
