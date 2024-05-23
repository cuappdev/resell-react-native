import * as React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { doc, setDoc } from "firebase/firestore";
import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useApiClient } from "../api/ApiClientProvider";
import PurpleButton from "../components/PurpleButton";
import SkipButton from "../components/SkipButton";
import VenmoInput from "../components/VenmoInput";
import { auth, userRef } from "../config/firebase";
import { fonts } from "../globalStyle/globalFont";
import { makeToast } from "../utils/Toast";
import {
  getGoogleSignInData,
  storeAccessToken,
  storeDeviceToken,
  storeOnboarded,
  storeUserId,
  storeUsername,
} from "../utils/asychStorageFunctions";
import { getDeviceFCMToken } from "../api/FirebaseNotificationManager";
import { login } from "../state_manage/reducers/signInReducer";

export default function LinkVenmoScreen({ navigation, route }) {
  const { image, username, bio } = route.params;
  const dispatch = useDispatch();

  const [venmo, setVenmo] = useState("");
  const [googleUser, setGoogleUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const apiClient = useApiClient();
  getGoogleSignInData(setGoogleUser);

  const createUser = async () => {
    setIsLoading(true);

    try {
      const createAccountRes = await apiClient.post("/auth/", {
        username: username,
        netid: googleUser.email.substring(
          0,
          googleUser.email.indexOf("@cornell.edu")
        ),
        givenName: googleUser.givenName,
        familyName: googleUser.familyName,
        photoUrl: googleUser.photo,
        email: googleUser.email,
        googleId: googleUser.id,
      });

      // Update Firebase
      const deviceToken = await getDeviceFCMToken();
      await storeDeviceToken(deviceToken);
      await setDoc(doc(userRef, auth.currentUser.email), {
        venmo: venmo,
        onboarded: true,
        fcmToken: deviceToken,
        notificationsEnabled: false,
      });

      // Store user ID and username
      const accountId = createAccountRes.user?.id;
      await storeUserId(accountId);
      await storeUsername(username);
      await storeOnboarded(true);

      // Get an access token and login using it
      const accessTokenRes = await apiClient.get(`/auth/sessions/${accountId}`);
      const session = accessTokenRes.sessions?.[0];
      if (session) {
        console.log(`Firebase Token User: ${JSON.stringify(auth.currentUser)}`);
        const accessToken = session.accessToken;
        console.log(`Access Token: ${JSON.stringify(session.accessToken)}`);
        const isActive = session.active;

        if (isActive) {
          await storeAccessToken(accessToken);
          await apiClient.loadAccessToken();
          dispatch(login(accessToken));
        } else {
          // Get a new session for the user
          const newSession = await apiClient.get(
            `/auth/refresh/`,
            {},
            {
              Authorization: session.refreshToken,
            }
          );
          const newAccessToken = newSession.accessToken;
          if (!newAccessToken) {
            throw new Error("Unable to refresh login");
          }
          await storeAccessToken(newAccessToken);
          await apiClient.loadAccessToken();
          dispatch(login(newAccessToken));
        }

        // Change tabs and stop loading animation
        setIsLoading(false);

        // Update profile
        await apiClient.post("/user/", {
          photoUrlBase64: image,
          username: username,
          venmoHandle: venmo,
          bio: bio,
        });

        navigation.navigate("Root", {
          screen: "HomeTab",
          params: { showPanel: true },
        });
      }
    } catch (error) {
      console.error(`LinkVenmoScreen.createUser failed: ${error}`);
      makeToast({ message: "Failed to create an account", type: "ERROR" });
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
          <VenmoInput venmo={venmo} onChangeVenmo={setVenmo} />
        </View>

        <View style={styles.purpleButton}>
          <PurpleButton
            text={"Continue"}
            onPress={createUser}
            enabled={venmo.trim().length > 0}
            isLoading={isLoading}
          />
        </View>
        <View style={styles.skipButton}>
          <SkipButton
            text={"Skip"}
            onPress={() => {
              setVenmo("");
              createUser();
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
  textInputContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#F4F4F4",
    borderRadius: 10,
    marginBottom: 32,
    width: "100%",
    height: 40,
    flexDirection: "row",
  },
  textInput: {
    width: "100%",
  },
});
