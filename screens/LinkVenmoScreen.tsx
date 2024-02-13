import { GoogleSignin, User } from "@react-native-google-signin/google-signin";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import * as React from "react";
import { useEffect, useState } from "react";
import { auth } from "../config/firebase";

import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { ActivityIndicator } from "react-native-paper";
import PurpleButton from "../components/PurpleButton";
import SkipButton from "../components/SkipButton";
import { useApiClient } from "../data/ApiClientProvider";
import { fonts } from "../globalStyle/globalFont";
import {
  storeAccessToken,
  storeOnboarded,
} from "../utils/asychStorageFunctions";

export default function LinkVenmoScreen({ navigation, route }) {
  const { image, username, bio } = route.params;
  const [venmo, setVenmo] = useState("");
  const [user, setUser] = useState<User>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const api = useApiClient();

  useEffect(() => {
    const getUser = async () => {
      const loggedInUser = await GoogleSignin.getCurrentUser();
      setUser(loggedInUser);
      const cred = GoogleAuthProvider.credential(loggedInUser.idToken);
      try {
        await signInWithCredential(auth, cred);
        console.log("signed in");
      } catch (_) {
        setError("Unknown error with sign in occurred");
      }
    };
    getUser();
  }, []);

  const createAccount = () => {
    setIsLoading(true);
    const userData = user.user;

    api
      .post("/auth/", {
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
        googleId: userData.id,
        bio: bio,
      })
      .then((res) => {
        // if it's an error result and they don't already have an account
        if (res.error && res.httpCode !== 409) {
          setError("Error creating account");
          console.log(`res httpCode: ${res.httpCode}`);
          return;
        } else {
          console.log(`create account result: ${JSON.stringify(res)}`);
        }
        signIn();
      });
  };
  const signIn = () => {
    const googleUserData = user.user;
    const uid = auth.currentUser.uid;
    console.log(`user id: ${uid}`);
    console.log(`google ID: ${user.user.id}`);

    // we need to find the user's ID from the backend manually
    console.log(`trying to find user id`);
    api.get(`/user/googleId/${googleUserData.id}/`).then((res) => {
      console.log(`JSON: ${JSON.stringify(res)}`);
      if (res?.user?.id) {
        getAccessToken(res.user.id);
      } else {
        setError(res?.error ?? "Unknown user error");
      }
    });

    setIsLoading(false);
  };
  const getAccessToken = async (userId: string) => {
    //#region login account
    // Gain access token from the backend
    const accessTokenRes = await api.get(`/auth/sessions/${userId}/`);
    const accessToken = accessTokenRes?.sessions?.[0]?.accessToken;
    if (accessToken) {
      await storeAccessToken(accessToken);
      await api.loadAccessToken();
      updateProfileOnBackend();
    }
    //#endregion
  };
  const updateProfileOnBackend = async () => {
    const response = await api.post("/user/", {
      photoUrlBase64: image,
      username: username,
      venmoHandle: venmo,
      bio: bio,
    });
    console.log(`response: ${response}`);
    console.log(`response json: ${JSON.stringify(response)}`);
    await storeOnboarded("true");
    setIsLoading(false);

    navigation.navigate("Root", {
      screen: "HomeTab",
      params: { showPanel: true },
    });
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
            onPress={createAccount}
            enabled={venmo.length > 0}
          />
        </View>
        {isLoading && <ActivityIndicator size={"large"} color="#9E70F6" />}
        {error && <Text style={{ color: "red" }}>{error}</Text>}
        <View style={styles.skipButton}>
          <SkipButton
            text={"Skip"}
            onPress={() => {
              setVenmo("");
              createAccount();
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
