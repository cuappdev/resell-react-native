import * as Font from "expo-font";
import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useColorScheme from "../hooks/useColorScheme";
import Navigation from "../navigation";
import * as Google from "expo-google-app-auth";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { login } from "../state_manage/actions/signInActions";
import ResellLogo from "../assets/svg-components/resell_logo";
import Header from "../assets/svg-components/header";
import PurpleButton from "../components/PurpleButton";
import CornellAppdev from "../assets/images/cornelappdev";
import { auth } from "../config/firebase";

import { useDispatch } from "react-redux";
export default function SignIn() {
  const dispatch = useDispatch();

  const signedIn = useSelector((state: any) => state.signIn.signedIn);
  const log_in = () => dispatch(login());
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const uid = user.uid;
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  }, []);
  useEffect(() => {}, [signedIn]);

  const colorScheme = useColorScheme();
  const [onBoard, setOnBoarded] = useState(false);
  // const [showPagination, setShowPagination] = useState(true);
  const [email, setEmail] = useState("");

  useEffect(() => {
    AsyncStorage.getItem("email", (errs, result) => {
      if (!errs) {
        if (result !== null) {
          setEmail(result);
        }
      }
    });
    AsyncStorage.getItem("SignedIn", (errs, result) => {
      if (!errs) {
        if (result !== null && result == "true") {
          log_in();
        }
      }
    });
  });

  useEffect(() => {
    if (signedIn) {
      AsyncStorage.getItem("userId", (errs, result) => {
        if (!errs) {
          if (result !== null) {
            register(email, result);
          }
        }
      });
    }
  }, [email]);

  const storeEmail = async (email) => {
    try {
      await AsyncStorage.setItem("email", email);
    } catch (e) {
      console.log(e);
    }
  };
  AsyncStorage.getItem("Onboarded", (errs, result) => {
    if (!errs) {
      if (result !== null) {
        setOnBoarded(true);
      }
    }
  });

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

  const storeAuthUser = async (user, userId) => {
    try {
      const response = await fetch(
        "https://resell-dev.cornellappdev.com/api/user/id/" + userId
      );
      if (response.ok) {
        const json = await response.json();
        user
          .updateProfile({
            displayName: json.user.givenName + " " + json.user.familyName,
            photoURL: json.user.photoUrl,
          })
          .then(() => {
            log_in();
          })
          .catch((error) => {
            // An error occurred
            // ...
            alert(error);
          });
      }
    } catch (error) {
      console.error(error);
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
      .then(async (json) => {
        if (json.error) {
          alert("Please Use Your Cornell Email :)");
        } else {
          storeAccessToken(json.accessToken);
          storeUserId(json.userId);
          storeEmail(result.user.email);
          register(result.user.email, json.userId);
          try {
            await AsyncStorage.setItem("SignedIn", "true");
          } catch (e) {
            console.log(e);
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const firebaseSignIn = (email, password) => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        storeAuthUser(user, password);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  // useEffect(() => {
  //   if (showPagination) {
  //     setTimeout(() => setShowPagination(false), 3000);
  //   }
  // }, [showPagination]);
  const handleGoogleSignIn = () => {
    const config = {
      iosClientId: `947198045768-2kkjna68er930llq0qlikh6dceeoijkm.apps.googleusercontent.com`,
      androidClientId: `947198045768-rv46c5qro1ghplqmjsf7p6e3l3afhj0o.apps.googleusercontent.com`,
      iosStandaloneAppClientId:
        "947198045768-vju27cp537legpef5ok51obpjshq11bj.apps.googleusercontent.com",
      scopes: ["profile", "email"],
    };
    Google.logInAsync(config).then((result) => {
      const { type } = result;
      if (type == "success") {
        console.log("Google SignIn", "SUCCESS", result);
        postRequest(result);
      } else {
        console.log("Google SignIn", "FAILURE", result);
      }
    });
  };

  const register = (email, password) => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        storeAuthUser(user, password);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (
          errorMessage ===
          "The email address is already in use by another account."
        ) {
          firebaseSignIn(email, password);
        }
      });
  };
  return signedIn ? (
    <Navigation colorScheme={colorScheme} onboard={onBoard} />
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
        {/* {!showPagination && ( */}
        <PurpleButton
          text={"Log in with NetID"}
          onPress={() => {
            handleGoogleSignIn();
          }}
          enabled={true}
        />
        {/* )} */}
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
