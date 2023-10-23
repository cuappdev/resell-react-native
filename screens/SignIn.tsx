import { Logs } from "expo";
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import Header from "../assets/svg-components/header";
import ResellLogo from "../assets/svg-components/resell_logo";
import PurpleButton from "../components/PurpleButton";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";

Logs.enableExpoCliLogging();

export default function SignIn() {
  GoogleSignin.configure({
    webClientId: "TODO", // client ID of type WEB for your server (needed to verify user ID and offline access)
    iosClientId: "TODO",
  });
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log("user info");
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

  return (
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
