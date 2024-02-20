import { GoogleSignin, User } from "@react-native-google-signin/google-signin";
import * as React from "react";
import { useEffect, useState } from "react";
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import PurpleButton from "../components/PurpleButton";
import SkipButton from "../components/SkipButton";
import { fonts } from "../globalStyle/globalFont";
import { storeOnboarded } from "../utils/asychStorageFunctions";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

export default function LinkVenmoScreen({ navigation, route }) {
  const { image, username, bio } = route.params;
  const [venmo, setVenmo] = useState("");
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    const getUser = async () => {
      setUser(await GoogleSignin.getCurrentUser());
    };
    getUser();
  }, []);

  const updateProfile = async () => {
    try {
      const Json = JSON.stringify({
        photoUrlBase64: image,
        username: username,
        venmoHandle: venmo,
        bio: bio,
      });
      const response = await fetch(
        "https://resell-dev.cornellappdev.com/api/user/",
        {
          method: "POST",
          headers: {
            Authorization: user.idToken,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: Json,
        }
      );
      /*
      TODO for some reason updating our custom backend service is giving an 
      unauthorized error, I believe it's because we're missing the token field.
      Look in Resell backend text channel for the question I asked and the 
      backend docs.
      */
      if (!response.ok) {
        let error = new Error(response.statusText);
        console.log(`response status = ${response.statusText}`);
        console.log(`response = ${response.status}`);
        throw error;
      }
      const data = await response.json();
      // These are some examples of how you can use React Native Firebase
      // TODO refactor ALL calls of the Firebase JS SDK to React Native Firebase
      await auth().currentUser.updateProfile({
        displayName: username,
        photoURL: image,
      });
      console.log(`JSON = ${JSON.stringify(data)}`);
      await firestore()
        .doc(user.user.email)
        .set({ onboarded: true, venmo: venmo });
      storeOnboarded(true);
    } catch (e) {
      console.log(`issue: ${e}`);
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
            onPress={async () => {
              await updateProfile();
              navigation.navigate("Root", {
                screen: "HomeTab",
                params: { showPanel: true },
              });
            }}
            enabled={venmo.length > 0}
          />
        </View>
        <View style={styles.skipButton}>
          <SkipButton
            text={"Skip"}
            onPress={async () => {
              setVenmo("");
              await updateProfile();
              navigation.navigate("Root", {
                screen: "HomeTab",
                params: { showPanel: true },
              });
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
