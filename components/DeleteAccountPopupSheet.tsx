import {
  Dimensions,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import React, { useState } from "react";

import Colors from "../constants/Colors";
import Modal from "react-native-modal";
import ExitIcon from "../assets/svg-components/exit";

export default function DeleteAccountPopupSheet({
  isVisible,
  setIsVisible,
  deleteAction,
  username,
}) {
  const [deleteText, setDeleteText] = useState("");

  const handleChange = (event) => {
    setDeleteText(event);
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <Modal
      isVisible={isVisible}
      backdropOpacity={0.2}
      onBackdropPress={() => {
        setIsVisible(false);
      }}
    >
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={styles.modal}>
          <Text style={styles.titleText}>Delete Account</Text>
          <Text style={styles.modalText}>
            Once deleted, your account cannot be recovered. Enter your username
            to proceed with deletion.
          </Text>
          <TextInput
            multiline={false}
            style={styles.feedbackText}
            onChangeText={handleChange}
            onSubmitEditing={dismissKeyboard}
            placeholder={username}
            placeholderTextColor="#D1D1D1"
          />
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => {
              if (deleteText != "" && deleteText == username) {
                deleteAction();
              }
            }}
          >
            <Text
              style={[
                styles.submitButtonText,
                deleteText != "" && deleteText == username
                  ? { backgroundColor: Colors.errorState }
                  : { backgroundColor: Colors.inactiveErrorState },
              ]}
            >
              Delete Account
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => {
              setIsVisible(false);
            }}
          >
            <View>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.exitButton}
            onPress={() => setIsVisible(false)}
          >
            <ExitIcon></ExitIcon>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    borderRadius: 20,
    height: 320,
    backgroundColor: "white",
    marginHorizontal: 24,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  modalText: {
    fontFamily: "Rubik-Regular",
    fontSize: 16,
    textAlignVertical: "top",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  titleText: {
    marginTop: 12,
    fontFamily: "Rubik-Medium",
    fontSize: 20,
  },
  submitButton: {
    borderRadius: 50,
    overflow: "hidden",
    width: Dimensions.get("window").width - 138,
    marginHorizontal: 24,
    marginBottom: 10,
  },
  submitButtonText: {
    fontFamily: "Rubik-Medium",
    fontSize: 18,
    textAlign: "center",
    color: "white",
    paddingVertical: 14,
  },
  cancelButtonText: {
    color: Colors.secondaryGray,
    fontFamily: "Rubik-Medium",
    fontSize: 18,
    textAlign: "center",
  },
  exitButton: {
    position: "absolute",
    top: 24,
    right: 24,
  },
  feedbackText: {
    fontFamily: "Rubik-Regular",
    fontSize: 16,
    borderRadius: 10,
    borderColor: Colors.secondaryGray,
    borderWidth: 0.5,
    marginTop: 16,
    marginBottom: 24,
    marginHorizontal: 24,
    textAlignVertical: "top",
    paddingHorizontal: 16,
    height: 43,
    width: Dimensions.get("window").width - 128,
  },
});
