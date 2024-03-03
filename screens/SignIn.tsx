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
} from "../utils/asychStorageFunctions";

Logs.enableExpoCliLogging();

export default function SignIn() {
  GoogleSignin.configure({
    webClientId: process.env.WEB_CLIENT_ID, // client ID of type WEB for your server (needed to verify user ID and offline access)
    iosClientId: process.env.IOS_CLIENT_ID,
  });
  const colorScheme = useColorScheme();
  const signedIn = useSelector(signedInState);
  const dispatch = useDispatch();
  const api = useApiClient();
  // whether the user needs to onboard
  const [isOnboarded, setIsOnboarded] = useState(true);

  const signIn = async () => {
    try {
      // Not really sure why we need this line but the guide set to put it in
      // Maybe it's required for Android? If not, remove it.
      await GoogleSignin.hasPlayServices();

      // Start by getting user info from GoogleSignIn
      const user = await GoogleSignin.signIn();
      const userData = user.user;

      // Sign in on Firebase:
      const credential = GoogleAuthProvider.credential(user.idToken);
      await signInWithCredential(auth, credential);

      // Create an account:
      let accountId: string = "";
      const createAccountRes = await api.post("/auth/", {
        username: userData.name,
        netid: userData.email.substring(
          0,
          userData.email.indexOf("@cornell.edu")
        ),
        givenName: userData.givenName,
        familyName: userData.familyName,
        photoUrl: userData.photo,
        email: userData.email,
        googleId: userData.id,
      });

      if (!createAccountRes.error || createAccountRes.httpCode === 409) {
        // If the httpCode is 409, that means there account already exists, so
        // we just need to log them in and we don't need to terminate sign in
        accountId = createAccountRes.user?.id;
      } else {
        makeToast({ message: "Error creating account", type: "ERROR" });
        return;
      }

      // It's possible the user already has an account, try to log them in
      if (!accountId) {
        const userDataResult = await api.get(`/user/googleId/${userData.id}/`);
        accountId = userDataResult?.user?.id;
      }

      // Check if this user has onboarded
      const firebaseUserData = await getDoc(
        doc(userRef, auth.currentUser.email)
      );
      setIsOnboarded(firebaseUserData.data()?.onboarded ?? false);

      if (!accountId) {
        makeToast({
          message: "Error finding account information",
          type: "ERROR",
        });
        return;
      }
      // Now we know the accountId is right, store it
      await storeUserId(accountId);

      // Get an access token and login using it
      const accessTokenRes = await api.get(`/auth/sessions/${accountId}/`);
      const accessToken = accessTokenRes?.sessions?.[0]?.accessToken;
      if (accessToken) {
        await storeAccessToken(accessToken);
        await api.loadAccessToken();
        dispatch(login(accessToken));
      } else {
        makeToast({ message: "Failed to sign into account", type: "ERROR" });
      }
    } catch (error) {
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
