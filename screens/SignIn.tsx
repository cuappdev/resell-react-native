import * as Font from "expo-font";
import React from "react";
import { StyleSheet, View, Image, Alert } from "react-native";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useColorScheme from "../hooks/useColorScheme";
import Navigation from "../navigation";
import { Logs } from "expo";

Logs.enableExpoCliLogging();
import * as Google from "expo-auth-session/providers/google";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { login } from "../state_manage/actions/signInActions";
import ResellLogo from "../assets/svg-components/resell_logo";
import Header from "../assets/svg-components/header";
import PurpleButton from "../components/PurpleButton";
import CornellAppdev from "../assets/images/cornelappdev";
import { auth } from "../config/firebase";

import { useDispatch } from "react-redux";
export default function SignIn() {
  const [request, result, promptAsync] = Google.useAuthRequest({
    // shouldAutoExchangeCode: false,
    responseType: "id_token",
    expoClientId:
      "947198045768-i9tuc7gvs6hipq2uid5pove59pdlh9jm.apps.googleusercontent.com",
    iosClientId: `947198045768-2kkjna68er930llq0qlikh6dceeoijkm.apps.googleusercontent.com`,
    androidClientId: `947198045768-rv46c5qro1ghplqmjsf7p6e3l3afhj0o.apps.googleusercontent.com`,
    // iosStandaloneAppClientId:
    //   "947198045768-vju27cp537legpef5ok51obpjshq11bj.apps.googleusercontent.com",
    // androidStandaloneAppClientId:
    //   "947198045768-miln50ernorl8s7kqibnpp59hoklor3n.apps.googleusercontent.com",
    scopes: ["profile", "email"],
    // shouldAutoExchangeCode: false,

    // extraParams: {
    //   access_type: "offline",

    //   prompt: "consent",
    // },
  });

  async function fetchUserInfo(token) {
    const response = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then(async (json) => {
        if (json.error) {
          alert("Please Use Your Cornell Email :)");
        } else {
          console.log(json);
          try {
          } catch (e) {
            console.log(e);
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // const [request, result, promptAsync] = Google.useAuthRequest({
  //   expoClientId:
  //     "947198045768-i9tuc7gvs6hipq2uid5pove59pdlh9jm.apps.googleusercontent.com",
  //   iosClientId: `947198045768-2kkjna68er930llq0qlikh6dceeoijkm.apps.googleusercontent.com`,
  //   androidClientId: `947198045768-rv46c5qro1ghplqmjsf7p6e3l3afhj0o.apps.googleusercontent.com`,
  //   scopes: ["profile", "email"],
  // });

  // const result = await promptAsync();
  // if (result.type === 'success') {
  //   // Token is empty when running on iOS/Android, but filled on Expo
  //   const token = result.params.id_token;
  // }

  // if (fullResult?.type === 'success') {
  //   // Token is always filled, when running on iOS/Android and when running in Expo
  //   const token = fullResult.params.id_token;
  // }

  useEffect(() => {
    // storeAccessToken(json.accessToken);
    storeUserId("9b8bf3b6-d5d4-4c97-9fff-481aae56eab2");
    storeEmail("csz9@cornell.edu");
    register("csz9@cornell.edu", "9b8bf3b6-d5d4-4c97-9fff-481aae56eab2");
    AsyncStorage.setItem("SignedIn", "true");

    // if (result?.type === "success") {
    //   console.log("Google SignIn", "SUCCESS", result);
    //   const token = result.params.access_token;
    //   console.log(fetchUserInfo(token));
    //   // Alert.alert("Alert Title", String(result), [
    //   //   {
    //   //     text: "Cancel",
    //   //     onPress: () => console.log("Cancel Pressed"),
    //   //     style: "cancel",
    //   //   },
    //   //   { text: "OK", onPress: () => console.log("OK Pressed") },
    //   // ]);
    //   postRequest(result);
    // } else {
    //   console.log("Google SignIn", "FAILURE", result);
    // }
  }, [result]);

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
  const [onBoard, setOnBoarded] = useState(true);
  // const [showPagination, setShowPagination] = useState(true);
  const [email, setEmail] = useState("");

  useEffect(() => {
    AsyncStorage.getItem("email", (errs, result) => {
      if (!errs) {
        if (result !== null && result !== undefined) {
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
          // Alert.alert("Alert Title", json, [
          //   {
          //     text: "Cancel",
          //     onPress: () => console.log("Cancel Pressed"),
          //     style: "cancel",
          //   },
          //   { text: "OK", onPress: () => console.log("OK Pressed") },
          // ]);
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
    // const config = {
    //   expoClientId:
    //     "947198045768-i9tuc7gvs6hipq2uid5pove59pdlh9jm.apps.googleusercontent.com",
    //   iosClientId: `947198045768-2kkjna68er930llq0qlikh6dceeoijkm.apps.googleusercontent.com`,
    //   androidClientId: `947198045768-rv46c5qro1ghplqmjsf7p6e3l3afhj0o.apps.googleusercontent.com`,
    //   iosStandaloneAppClientId:
    //     "947198045768-vju27cp537legpef5ok51obpjshq11bj.apps.googleusercontent.com",
    //   androidStandaloneAppClientId:
    //     "947198045768-miln50ernorl8s7kqibnpp59hoklor3n.apps.googleusercontent.com",
    //   scopes: ["profile", "email"],
    // };
    // Google.useAuthRequest(config);
    // useEffect(() => {
    //   if (result?.type === "success") {
    //     console.log("Google SignIn", "SUCCESS", result);
    //     postRequest(result);
    //   } else {
    //     Alert.alert("Alert Title", "My Alert Msg", [
    //       {
    //         text: "Cancel",
    //         onPress: () => console.log("Cancel Pressed"),
    //         style: "cancel",
    //       },
    //       { text: "OK", onPress: () => console.log("OK Pressed") },
    //     ]);
    //     console.log("Google SignIn", "FAILURE", result);
    //   }
    // }, [result]);
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
            promptAsync();
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
