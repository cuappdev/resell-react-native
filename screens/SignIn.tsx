import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { Logs } from "expo";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, View, useColorScheme } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useApiClient } from "../api/ApiClientProvider";
import Header from "../assets/svg-components/header";
import ResellLogo from "../assets/svg-components/resell_logo";
import PurpleButton from "../components/PurpleButton";
import { auth, userRef } from "../config/firebase";
import Navigation from "../navigation";
import {
  login,
  logout,
  signedInState,
} from "../state_manage/reducers/signInReducer";
import { makeToast } from "../utils/Toast";
import {
  returnAccessToken,
  storeAccessToken,
  storeUserId,
  storeUsername,
  storeDeviceToken,
  storeGoogleSignInData,
} from "../utils/asychStorageFunctions";
import {
  getDeviceFCMToken,
  saveDeviceTokenToFireStore,
} from "../api/FirebaseNotificationManager";

Logs.enableExpoCliLogging();

export default function SignIn() {
  GoogleSignin.configure({
    webClientId: process.env.WEB_CLIENT_ID,
  });
  const colorScheme = useColorScheme();
  const signedIn = useSelector(signedInState);
  const dispatch = useDispatch();
  const apiClient = useApiClient();
  const [isOnboarded, setIsOnboarded] = useState(true);

  const signIn = async () => {
    try {
      // Not really sure why we need this line but the guide set to put it in
      // Maybe it's required for Android? If not, remove it.
      await GoogleSignin.hasPlayServices();

      // Start by getting user info from GoogleSignIn and store it
      const googleResponse = await GoogleSignin.signIn();
      const userData = googleResponse.user;
      await storeGoogleSignInData(JSON.stringify(userData));

      // Must be admin email or Cornell
      if (
        !process.env.ADMIN_EMAILS.split(",").includes(userData.email) &&
        !userData.email.includes("@cornell.edu")
      ) {
        alert(
          "Google user is not a Cornell student. You must use a Cornell email for Resell"
        );
        makeToast({ message: "Error creating account", type: "ERROR" });
        return;
      }

      const deviceToken = await getDeviceFCMToken();
      await storeDeviceToken(deviceToken);
      saveDeviceTokenToFireStore(userData.email, deviceToken);

      // Sign in on Firebase
      const credential = GoogleAuthProvider.credential(googleResponse.idToken);
      await signInWithCredential(auth, credential);

      // Check if this user has onboarded
      const firebaseUserData = await getDoc(
        doc(userRef, auth.currentUser.email)
      );
      const isOnboarded = firebaseUserData.data()?.onboarded ?? false;
      setIsOnboarded(isOnboarded);

      if (!isOnboarded) {
        // Go to onboarding
        dispatch(login());
        return;
      }

      // Get the user data
      const response = await apiClient.get(`/user/googleId/${userData.id}`);
      if (!response.user) {
        makeToast({
          message: "Error finding account information",
          type: "ERROR",
        });
        return;
      }

      // Store user ID and username
      const user = response.user;
      storeUserId(user.id);
      storeUsername(user.username);

      // Get an access token and log in using it
      const accessTokenRes = await apiClient.get(`/auth/sessions/${user.id}`);
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
      }
    } catch (error) {
      console.log(error);

      switch (error.code) {
        case statusCodes.SIGN_IN_CANCELLED:
          makeToast({ message: "Sign in was cancelled", type: "ERROR" });
          break;
        case statusCodes.IN_PROGRESS:
          makeToast({
            message: "Operation already in progress",
            type: "ERROR",
          });
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          makeToast({ message: "Play services not available", type: "ERROR" });
          break;
        default:
          makeToast({ message: "An unknown error occurred", type: "ERROR" });
      }
    }
  };

  useEffect(() => {
    const checkLoggedIn = async () => {
      const token = await returnAccessToken();
      if (token) {
        dispatch(login(token));
      } else {
        dispatch(logout());
      }
    };

    checkLoggedIn();
  }, []);

  return signedIn.signIn.signedIn ? (
    <Navigation colorScheme={colorScheme} onboard={isOnboarded} />
  ) : (
    <View style={styles.containerSignIn}>
      <Image
        style={styles.gradient0}
        source={require("../assets/images/signinbackgroundhue.png")}
      />
      <View style={styles.innerContainer}>
        <ResellLogo height={130} width={96} props={undefined} />
        <View style={{ marginTop: 16 }}>
          <Header />
        </View>
      </View>
      <View style={styles.signInButton}>
        <PurpleButton
          text={"Log in with NetID"}
          onPress={signIn}
          enabled={true}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  containerSignIn: {
    position: "relative",
    height: "100%",
    width: "100%",
  },
  innerContainer: {
    marginTop: "50%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  signInButton: {
    flexDirection: "column",
    alignItems: "center",
    padding: "3%",
    width: "100%",
    position: "absolute",
    bottom: "5%",
  },
  errorTextStyle: {
    alignSelf: "center",
    paddingTop: "10%",
    color: "red",
  },
  signInText: {
    fontSize: 19,
    fontWeight: "bold",
  },
  gradient0: {
    position: "absolute",
    bottom: "-10%",
    left: 0,
    width: "100%",
    height: "70%",
  },
});
