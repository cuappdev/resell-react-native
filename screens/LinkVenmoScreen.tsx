import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import PurpleButton from "../components/PurpleButton";
import SkipButton from "../components/SkipButton";
import { menuBarTop } from "../constants/Layout";
import { useEffect, useState } from "react";
import { auth, userRef } from "../config/firebase";
import { userInfo } from "os";
import { fonts } from "../globalStyle/globalFont";
import { getAccessToken, storeOnboarded } from "../utils/asychStorageFunctions";
import { useSelector } from "react-redux";

export default function LinkVenmoScreen({ navigation, route }) {
  const { image, username, bio } = route.params;
  const [venmo, setVenmo] = useState("");

  const [accessToken, setAccessToken] = useState("");
  useEffect(() => {
    getAccessToken(setAccessToken);
  }, []);

  const setOnboarded = async () => {
    // const accessToken = useSelector(getAccessToken);
    try {
      const Json = JSON.stringify({
        photoUrlBase64: image,
        username: username,
        venmoHandle: venmo,
        bio: bio,
      });
      await fetch("https://resell-dev.cornellappdev.com/api/user/", {
        method: "POST",
        headers: {
          Authorization: accessToken,

          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: Json,
      })
        .then((response) => {
          if (!response.ok) {
            let error = new Error(response.statusText);
            throw error;
          } else {
            return response.json();
          }
        })
        .then(async function (data) {
          auth.currentUser.updateProfile({
            displayName: data.user.givenName + " " + data.user.familyName,
            photoURL: data.user.photoUrl,
          });
          userRef.doc(data.user.email).set({ onboarded: true, venmo: venmo });
          storeOnboarded("true");
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Text style={[fonts.body1, { marginTop: 24, color: "#707070" }]}>
          Your Venmo handle will only be visible to people interested in buying
          your listing.
        </Text>
        <View style={{ flexDirection: "column", width: "100%" }}>
          <Text style={styles.handle}>Venmo Handle</Text>
          <TextInput
            style={[
              fonts.body2,
              {
                paddingTop: 10,
                paddingBottom: 10,
                paddingHorizontal: 15,
                backgroundColor: "#F4F4F4",
                borderRadius: 10,
                marginBottom: 32,
                width: "100%",
                height: 40,
              },
            ]}
            placeholderTextColor={"#707070"}
            value={venmo}
            onChangeText={(text) => setVenmo(text)}
          />
        </View>

        <View style={styles.purpleButton}>
          <PurpleButton
            text={"Continue"}
            onPress={() => {
              navigation.navigate("Root", {
                screen: "HomeTab",
                params: { showPanel: true },
              });
              setOnboarded();
            }}
            enabled={venmo.length > 0}
          />
        </View>
        <View style={styles.skipButton}>
          <SkipButton
            text={"Skip"}
            onPress={() => {
              navigation.navigate("Root", {
                screen: "HomeTab",
                params: { showPanel: true },
              });
              setVenmo("");
              setOnboarded();
            }}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
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
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    height: "100%",
    paddingHorizontal: 24,
  },

  handle: {
    marginTop: 40,
    marginBottom: 10,
    fontSize: 18,
    fontFamily: "Rubik-Medium",
  },
  username_input: {
    backgroundColor: "#F4F4F4",
    width: "100%",
    borderRadius: 10,
    height: 40,
    paddingHorizontal: 10,
  },

  purpleButton: {
    position: "absolute",
    alignItems: "center",
    width: "100%",
    bottom: "10%",
  },
  skipButton: {
    position: "absolute",
    alignItems: "center",
    width: "100%",
    backgroundColor: "white",
    bottom: "2%",
  },
});
