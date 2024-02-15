import { WEB_CLIENT_ID } from "@env";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { Logs } from "expo";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View, useColorScheme } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useApiClient } from "../api/ApiClientProvider";
import Header from "../assets/svg-components/header";
import ResellLogo from "../assets/svg-components/resell_logo";
import PurpleButton from "../components/PurpleButton";
import Navigation from "../navigation";
import {
  login,
  logout,
  signedInState,
} from "../state_manage/reducers/signInReducer";
import {
  returnAccessToken,
  storeAccessToken,
} from "../utils/asychStorageFunctions";

Logs.enableExpoCliLogging();

export default function SignIn() {
  GoogleSignin.configure({
    webClientId: WEB_CLIENT_ID, // client ID of type WEB for your server (needed to verify user ID and offline access)
    iosClientId: process.env.IOS_CLIENT_ID,
  });
  const colorScheme = useColorScheme();
  const signedIn = useSelector(signedInState);
  const dispatch = useDispatch();
  const api = useApiClient();

  const [error, setError] = useState("");

  const signIn = async () => {
    try {
      // Not really sure why we need this line but the guide set to put it in
      // Maybe it's required for Android? If not, remove it.
      await GoogleSignin.hasPlayServices();

      // Start by getting user info from GoogleSignIn
      const user = await GoogleSignin.signIn();
      const userData = user.user;

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
      if (createAccountRes.error && createAccountRes.httpCode !== 409) {
        // If the httpCode is 409, that means there account already exists, so
        // we just need to log them in and we don't need to terminate sign in
        setError("Error creating account");
        console.log(`res httpCode: ${createAccountRes.httpCode}`);
        return;
      } else {
        accountId = createAccountRes.user?.id;
      }

      // It's possible the user already has an account, try to log them in
      if (!accountId) {
        const userDataResult = await api.get(`/user/googleId/${userData.id}/`);
        accountId = userDataResult?.user?.id;
      }
      if (!accountId) {
        setError("Error finding account information");
        return;
      }

      // Get an access token and login using it
      const accessTokenRes = await api.get(`/auth/sessions/${accountId}/`);
      const accessToken = accessTokenRes?.sessions?.[0]?.accessToken;
      if (accessToken) {
        await storeAccessToken(accessToken);
        await api.loadAccessToken();
        dispatch(login(accessToken));
      } else {
        setError("Failed to sign into account");
      }
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
    <Navigation colorScheme={colorScheme} onboard />
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
      {error && <Text style={styles.errorTextStyle}>{error}</Text>}
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
