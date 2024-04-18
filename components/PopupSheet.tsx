import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Modal from "react-native-modal";
import ExitIcon from "../assets/svg-components/exit";
import Colors from "../constants/Colors";

export default function PopupSheet({
  isVisible,
  setIsVisible,
  actionName,
  submitAction,
  buttonText,
  description,
  errorState = false,
}) {
  return (
    <Modal
      isVisible={isVisible}
      backdropOpacity={0.2}
      onBackdropPress={() => {
        setIsVisible(false);
      }}
    >
      <View style={styles.modal}>
        <Text style={styles.titleText}>{actionName}</Text>
        <Text style={styles.modalText}>{description}</Text>
        <TouchableOpacity
          style={[
            styles.submitButton,
            errorState && {
              borderColor: Colors.errorState,
              borderWidth: 1.5,
            },
          ]}
          onPress={() => {
            submitAction();
          }}
        >
          <Text
            style={[
              styles.submitButtonText,
              errorState
                ? {
                    color: Colors.errorState,
                    fontFamily: "Rubik-Regular",
                  }
                : {
                    color: "white",
                    backgroundColor: "#9E70F6",
                    fontFamily: "Rubik-Medium",
                  },
            ]}
          >
            {buttonText}
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
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    borderRadius: 20,
    height: 250,
    backgroundColor: "#ffffff",
    marginHorizontal: 24,
    padding: 24,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  modalText: {
    fontFamily: "Rubik-Regular",
    fontSize: 16,
    textAlignVertical: "top",
    textAlign: "center",
  },
  titleText: {
    fontFamily: "Rubik-Medium",
    fontSize: 20,
    marginBottom: 16,
  },
  submitButton: {
    borderRadius: 50,
    overflow: "hidden",
    width: Dimensions.get("window").width - 138,
    marginTop: 24,
  },
  submitButtonText: {
    zIndex: 100,
    fontSize: 18,
    textAlign: "center",
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
