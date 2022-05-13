import * as React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import PurpleButton from "../components/PurpleButton";
import SkipButton from "../components/SkipButton";
import { menuBarTop } from "../constants/Layout";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { auth } from "../config/firebase";

export default function LinkVenmoScreen({ navigation, route }) {
  const { image, username, bio } = route.params;
  const [venmo, setVenmo] = useState("");
  const [accessToken, setAccessToken] = useState("");

  AsyncStorage.getItem("accessToken", (errs, result) => {
    if (!errs) {
      if (result !== null) {
        setAccessToken(result);
      }
    }
  });
  const setOnboarded = async () => {
    console.log(image);
    try {
      await AsyncStorage.setItem("Onboarded", "true");
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
            Authorization: accessToken,

            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: Json,
        }
      )
        .then(function (response) {
          // alert(JSON.stringify(response));

          if (!response.ok) {
            let error = new Error(response.statusText);
            throw error;
          } else {
            return response.json();
          }
        })
        .then(async function (data) {
          auth.currentUser
            .updateProfile({
              displayName: data.user.givenName + " " + data.user.familyName,
              photoURL: data.user.photoUrl,
            })
            .then(() => {
              // Profile updated!
              // ...
            })
            .catch((error) => {
              // An error occurred
              // ...
              alert(error);
            });
        })
        .catch((error) => {
          //alert(error.message);
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.description}>
        Your Venmo handle will only be visible to people interested in buying
        your listing.
      </Text>
      <View style={{ flexDirection: "column", width: "100%" }}>
        <Text style={styles.handle}>Venmo Handle</Text>
        <TextInput
          style={styles.username_input}
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
    paddingHorizontal: 20,
  },
  titleText: {
    fontFamily: "Roboto-Medium",
    fontSize: 18,
    marginTop: 20,
    fontWeight: "bold",
  },
  description: {
    width: 320,
    marginTop: 30,
    color: "grey",
    fontSize: 16,
  },
  handle: {
    marginTop: 40,
    marginBottom: 10,
    marginStart: 10,
    fontSize: 18,
    fontWeight: "700",
    fontFamily: "Rubik-Regular",
  },
  username_input: {
    backgroundColor: "#F4F4F4",
    width: "100%",
    borderRadius: 10,
    height: 40,
    paddingHorizontal: 10,
  },
  bio: {
    marginTop: 30,
    marginRight: 320,
    fontWeight: "bold",
  },
  bio_input: {
    backgroundColor: "#F4F4F4",
    width: "100%",
    borderRadius: 10,
    height: 40,
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
