import auth, { firebase } from "@react-native-firebase/auth";
import {
  GoogleSignin,
  User,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { Logs } from "expo";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, View, useColorScheme } from "react-native";
import Header from "../assets/svg-components/header";
import ResellLogo from "../assets/svg-components/resell_logo";
import PurpleButton from "../components/PurpleButton";
import { firebaseConfig } from "../config/firebase";
import Navigation from "../navigation";

Logs.enableExpoCliLogging();

export default function SignIn() {
  GoogleSignin.configure({
    webClientId: process.env.WEB_CLIENT_ID, // client ID of type WEB for your server (needed to verify user ID and offline access)
    iosClientId: process.env.IOS_CLIENT_ID,
  });
  const colorScheme = useColorScheme();
  const [user, setUser] = useState<User>(null);
  const [onboard, setOnboard] = useState(false);
  const signIn = async () => {
    try {
      // Not really sure why we need this line but the guide set to put it in
      // Maybe it's required for Android? If not, remove it.
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn({});
      const mUser = userInfo.user;
      if (mUser != null) {
        setUser(userInfo);
        const googleCredential = auth.GoogleAuthProvider.credential(
          userInfo.idToken
        );
        return auth().signInWithCredential(googleCredential);
      }

      console.log(`user info = ${JSON.stringify(mUser)}`);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log("Sign in was cancelled");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log("operation already in progress");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log("play services not available");
      } else {
        console.log(`Some other error ${error}`);
      }
    }
  };
  useEffect(() => {
    const tryLogin = async () => {
      setUser(await GoogleSignin.getCurrentUser());
    };
    tryLogin();
  }, []);

  return user == null ? (
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
        {/* {!showPagination && ( */}
        <PurpleButton
          text={"Log in with NetID"}
          onPress={signIn}
          enabled={true}
        />
        {/* {showPagination && <CornellAppdev />} */}
      </View>
    </View>
  ) : (
    <Navigation colorScheme={colorScheme} onboard={onboard} />
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
