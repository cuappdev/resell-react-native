import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
} from "react-native";
import PurpleButton from "../components/PurpleButton";
import SkipButton from "../components/SkipButton";
import { menuBarTop } from "../constants/Layout";

export default function LinkVenmoScreen({ navigation
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Link Your Venmo</Text>
      <Text style={styles.description}>
        Your Venmo handle will only be visible to people interested in buying
        your listing.
      </Text>
      <Text style={styles.handle}>Venmo Handle</Text>
      <TextInput
        style={styles.username_input}
        placeholderTextColor={"#707070"}
      />
      <View style={styles.purpleButton}>
        <PurpleButton
          text={"Continue"}
          onPress={() => {
            navigation.navigate("Home", { showPanel: true });
          }}
        />
      </View>
      <View style={styles.skipButton}>
        <SkipButton text={"Skip"}
          onPress={() => {
            navigation.navigate("Home", { showPanel: true });
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  container: {
    paddingTop: menuBarTop,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    height: "100%",
    paddingHorizontal: 20
  },
  titleText: {
    fontFamily: "Roboto-Medium",
    fontSize: 18,
    marginTop: 20,
    fontWeight: "bold",
  },
  description: {
    width: 320,
    marginTop: 40,
    color: 'grey',
  },
  handle: {
    marginTop: 30,
    marginRight: 230,
    fontWeight: "bold",
  },
  username_input: {
    backgroundColor: "#F4F4F4",
    width: "100%",
    borderRadius: 15,
    height: 40,
  },
  bio: {
    marginTop: 30,
    marginRight: 320,
    fontWeight: "bold",
  },
  bio_input: {
    backgroundColor: "#F4F4F4",
    width: "100%",
    borderRadius: 15,
    height: 40,
  },
  purpleButton: {
    position: "absolute",
    alignItems: "center",
    width: "100%",
    bottom: "12%",
  },
  skipButton: {
    position: "absolute",
    alignItems: "center",
    width: "100%",
    backgroundColor: "white",
    bottom: "5%"
  },
});
