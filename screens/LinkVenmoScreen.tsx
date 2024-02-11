import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { GoogleSignin, User } from "@react-native-google-signin/google-signin";
import * as Notifications from "expo-notifications";
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
import { useApiClient } from "../data/ApiClientProvider";
import { fonts } from "../globalStyle/globalFont";
import { storeOnboarded } from "../utils/asychStorageFunctions";

export default function LinkVenmoScreen({ navigation, route }) {
  const { image, username, bio } = route.params;
  const [venmo, setVenmo] = useState("");
  const [user, setUser] = useState<User>(null);
  const api = useApiClient();

  useEffect(() => {
    const getUser = async () => {
      setUser(await GoogleSignin.getCurrentUser());
    };
    getUser();
  }, []);

  const updateProfile = async () => {
    const userData = user.user;
    //#region create account
    const body = JSON.stringify({
      username: userData.name,
      netid: userData.email.substring(
        0,
        userData.email.indexOf("@cornell.edu")
      ),
      givenName: userData.givenName,
      familyName: userData.familyName,
      photoUrl: userData.photo,
      venmoHandle: venmo,
      email: userData.email,
      googleId: user.idToken,
      bio: bio,
    });
    try {
      const route: string = "https://resell-dev.cornellappdev.com/api/auth/";
      console.log(`sending to ${route}`);
      console.log(`body: ${body}`);
      const result = await fetch(route, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      });
      console.log(`result: ${JSON.stringify(await result.json())}`);
    } catch (e) {
      console.log(`issue: ${e}`);
    }
    //#endregion

    //#region get user session
    const sessionResponse = await fetch(
      "https://resell-dev.cornellappdev.com/api/auth/sessions/84fbd1ca-4d10-48f3-bfff-a599def991de",
      { method: "GET" }
    );
    console.log(
      `sessionResponse: ${JSON.stringify(await sessionResponse.json())}`
    );
    //#endregion

    //#region login account
    const accessTokenBody = JSON.stringify({
      idToken: user.idToken,
      accessToken:
        "f3f06bcc4c3d9f85a931bcff121f31843f14dc3fbd814fe515b5361cb3d37498b742ff3e0b087c4cb996cb86239874461093d446113cf402114a9045c10ef864",
      deviceToken: (
        await Notifications.getExpoPushTokenAsync({
          projectId: "22e60432-5ecd-4672-a160-0a0c72395237",
        })
      ).data,
      user: {
        email: userData.email,
        familyName: userData.familyName,
        givenName: userData.givenName,
        id: userData.id,
        name: userData.name,
        photoUrl: userData.photo,
      },
    });

    // start by gaining access token from the backend
    const accessTokenRes = await fetch(
      "https://resell-dev.cornellappdev.com/api/auth/login/",
      {
        method: "POST",
        body: accessTokenBody,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(`\n\n COMMENTING ON ACCESS TOKEN \n\n`);
    if (!accessTokenRes.ok) {
      console.log(
        `\n\n something wrong: ${JSON.stringify(
          await accessTokenRes.json()
        )}\n\n`
      );
    } else {
      console.log(
        `access token received successfully! ${JSON.stringify(accessTokenRes)}`
      );
    }
    //#endregion

    //#region update profile
    if (false) {
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
        // console.log(`response status = ${response.statusText}`);
        // console.log(`response = ${response.status}`);
        // console.log("maybe this won't actually be that bad");
        // console.log(JSON.stringify(response));
        throw error;
      } else {
        const data = response.json;
        // These are some examples of how you can use React Native Firebase
        // TODO refactor ALL calls of the Firebase JS SDK to React Native Firebase
        await auth().currentUser.updateProfile({
          displayName: username,
          photoURL: image,
        });
        // console.log(`JSON = ${JSON.stringify(data)}`);
        await firestore()
          .doc(user.user.email)
          .set({ onboarded: true, venmo: venmo });
        storeOnboarded("true");
        navigation.navigate("Root", {
          screen: "HomeTab",
          params: { showPanel: true },
        });
      }
    }

    //#endregion
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
