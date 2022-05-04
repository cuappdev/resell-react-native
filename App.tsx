import * as Font from "expo-font";
import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { Provider, useSelector } from "react-redux";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import * as Google from "expo-google-app-auth";
import GlobalStore from "./state_manage/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login, logout } from "./state_manage/actions/signInActions";
import ResellLogo from "./assets/svg-components/resell_logo";
import Header from "./assets/svg-components/header";
import PurpleButton from "./components/PurpleButton";
import CornellAppdev from "./assets/images/cornelappdev";
import firebase from "./config/firebase";
import { auth, provider } from "./config/firebase";

export default function App() {
  // const log_in = () => dispatch(login());
  // const log_out = () => dispatch(logout());

  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [signedIn, setSignIn] = useState(false);
  const [onBoard, setOnBoarded] = useState(false);
  const [showPagination, setShowPagination] = useState(true);

  //this need to be replaced by redux
  // AsyncStorage.getItem("SignedIn", (errs, result) => {
  //   if (!errs) {
  //     if (result !== null && result == "true") {
  //       setSignIn(true);
  //     } else if (result !== null && result == "false") {
  //       //!=null is ok because if result ==null, signIn is going to be default false anyway
  //       setSignIn(false);
  //     }
  //   }
  // });
  AsyncStorage.getItem("Onboarded", (errs, result) => {
    if (!errs) {
      if (result !== null) {
        setOnBoarded(true);
      }
    }
  });

  const setSignedIn = async () => {
    try {
      await AsyncStorage.setItem("SignedIn", "true");
    } catch (e) {
      console.log(e);
    }
  };

  const storeAccessToken = async (accessToken) => {
    try {
      await AsyncStorage.setItem("accessToken", accessToken);
    } catch (e) {
      console.log(e);
    }
  };
  const storeUserId = async (userid) => {
    try {
      await AsyncStorage.setItem("userId", userid);
    } catch (e) {
      console.log(e);
    }
  };
  const postRequest = (result) => {
    fetch("https://resell-dev.cornellappdev.com/api/auth/login/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(result),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        storeAccessToken(json.accessToken);
        storeUserId(json.userId);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // const name = useSelector((state: any) => {
  //   return state.profile.name;
  // });
  //const store = useSelector((state) => state.signIn.signedIn);
  useEffect(() => {
    if (showPagination) {
      setTimeout(() => setShowPagination(false), 3000);
    }
  }, [showPagination]);
  const handleGoogleSignIn = () => {
    const config = {
      iosClientId: `947198045768-2kkjna68er930llq0qlikh6dceeoijkm.apps.googleusercontent.com`,
      androidClientId: `947198045768-rv46c5qro1ghplqmjsf7p6e3l3afhj0o.apps.googleusercontent.com`,
      scopes: ["profile", "email"],
    };

    Google.logInAsync(config).then((result) => {
      const { type } = result;
      if (type == "success") {
        console.log("Google SignIn", "SUCCESS", result);
        setSignIn(true);
        setSignedIn();
        postRequest(result);
        // const { idToken, accessToken } = result;

        // provider.addScope(idToken);
        // provider.addScope(accessToken);
        // const user = auth.currentUser;

        // if (!user) {
        // }
        // return auth.signInWithCustomToken(idToken);
      } else {
        console.log("Google SignIn", "FAILURE", result);
      }
    });
  };

  Font.loadAsync({
    "Roboto-Black": require("./assets/fonts/Roboto-Black.ttf"),
    "Roboto-BlackItalic": require("./assets/fonts/Roboto-BlackItalic.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-BoldItalic": require("./assets/fonts/Roboto-BoldItalic.ttf"),
    "Roboto-Italic": require("./assets/fonts/Roboto-Italic.ttf"),
    "Roboto-Light": require("./assets/fonts/Roboto-Light.ttf"),
    "Roboto-LightItalic": require("./assets/fonts/Roboto-LightItalic.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-MediumItalic": require("./assets/fonts/Roboto-MediumItalic.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Thin": require("./assets/fonts/Roboto-Thin.ttf"),
    "Roboto-ThinItalic": require("./assets/fonts/Roboto-ThinItalic.ttf"),
  });
  Font.loadAsync({
    "Rubik-Black": require("./assets/fonts/rubik/Rubik-Black.ttf"),
    "Rubik-BlackItalic": require("./assets/fonts/rubik/Rubik-BlackItalic.ttf"),
    "Rubik-Bold": require("./assets/fonts/rubik/Rubik-Bold.ttf"),
    "Rubik-BoldItalic": require("./assets/fonts/rubik/Rubik-BoldItalic.ttf"),
    "Rubik-Italic": require("./assets/fonts/rubik/Rubik-Italic.ttf"),
    "Rubik-Light": require("./assets/fonts/rubik/Rubik-Light.ttf"),
    "Rubik-LightItalic": require("./assets/fonts/rubik/Rubik-LightItalic.ttf"),
    "Rubik-Medium": require("./assets/fonts/rubik/Rubik-Medium.ttf"),
    "Rubik-MediumItalic": require("./assets/fonts/rubik/Rubik-MediumItalic.ttf"),
    "Rubik-Regular": require("./assets/fonts/rubik/Rubik-Regular.ttf"),
  });

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={GlobalStore}>
        <SafeAreaProvider>
          {!signedIn && (
            <View style={styles.containerSignIn}>
              <Image
                style={styles.gradient0}
                source={require("./assets/images/signinbackgroundhue.png")}
              />
              <View style={styles.innerContainer}>
                <ResellLogo height={130} width={96} props={undefined} />
                <View style={{ marginTop: 16 }}>
                  <Header />
                </View>

                {/* <Image
                  width={100}
                  height={100}
                  source={require("./assets/images/signinlogoblurry.png")}
                /> */}
              </View>
              <View style={styles.signInButton}>
                {!showPagination && (
                  <PurpleButton
                    text={"Log in with NetID"}
                    onPress={() => {
                      handleGoogleSignIn();
                    }}
                    enabled={true}
                  />
                )}
                {showPagination && <CornellAppdev />}
              </View>
            </View>
          )}
          {signedIn && (
            <Navigation colorScheme={colorScheme} onboard={onBoard} />
          )}
        </SafeAreaProvider>
      </Provider>
    );
  }
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
