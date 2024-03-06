import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions
} from "react-native";
import { FAB } from "react-native-paper";
import BackButton from "../assets/svg-components/back_button";
import DeleteImage from "../assets/svg-components/deleteImage";
import ExitIcon from "../assets/svg-components/exit";
import { menuBarTop } from "../constants/Layout";
import Modal from "react-native-modal";

const imageSize = (Dimensions.get('window').width - 68) / 3;

export default function SendFeedbackScreen({ navigation }) {
  const [images, setImages] = useState([]);
  const [feedbackText, setFeedbackText] = useState("");
  const [userId, setUserId] = useState("");
  const [deleteModalVisibility, setDeleteModalVisibility] = useState(false);
  const [deleteImageIndex, setDeleteimageIndex] = useState(0);

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
    if (result && !result.canceled) {
      let updatedImages = [...images];
      updatedImages[index] = "data:image/jpeg;base64," + result["base64"];
      setImages(updatedImages);
    }
  }

  const presentDeleteModal = (index) => {
    setDeleteModalVisibility(true)
    setDeleteimageIndex(index)
  }

  const deleteImage = () => {
    setDeleteModalVisibility(false)
    let updatedImages = [...images];
    updatedImages.splice(deleteImageIndex, 1);
    setImages(updatedImages);
  };

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
            <TouchableOpacity style={styles.deleteImageButton} key={index} onPress={() => presentDeleteModal(index)}>
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
      <Modal
        isVisible={deleteModalVisibility}
        backdropOpacity={0.2}
        onBackdropPress={() => {
          setDeleteModalVisibility(false);
        }}
      >
        <View style={styles.deleteModal}>
          <Text style={styles.titleText}>
            Delete Image
          </Text>
          <Text style={styles.modalText}>
            Are you sure you'd like to delete this image?
          </Text>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => {
              deleteImage()
            }}
          >
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => {
              setDeleteModalVisibility(false);
            }}
          >
            <View>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.exitButton} onPress={() => setDeleteModalVisibility(false)}>
            <ExitIcon></ExitIcon>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
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
    textAlign: "center"
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
    gap: 10
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
    overflow: 'hidden',
    width: Dimensions.get('window').width - 138,
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
    textAlign: "center"
  },
  exitButton: {
    position: "absolute",
    top: 24,
    right: 24,
  }

});
