import React from "react";
import { StyleSheet, View, Image, Alert } from "react-native";
import { useEffect, useState } from "react";
import useColorScheme from "../hooks/useColorScheme";
import Navigation from "../navigation";
import { Logs } from "expo";

Logs.enableExpoCliLogging();
import * as Google from "expo-auth-session/providers/google";
import { auth, userRef } from "../config/firebase";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ResellLogo from "../assets/svg-components/resell_logo";
import Header from "../assets/svg-components/header";
import PurpleButton from "../components/PurpleButton";

import { login, signedInState } from "../state_manage/reducers/signInReducer";
import {
  getAccessToken,
  getEmail,
  getOnboard,
  getSignedIn,
  getUserId,
  storeAccessToken,
  storeEmail,
  storeExpireAt,
  storeRefreshToken,
  storeSignedIn,
  storeUserId,
} from "../utils/asychStorageFunctions";
import { ResponseType } from "expo-auth-session";
export default function SignIn() {
  const [request, result, promptAsync] = Google.useIdTokenAuthRequest({
    expoClientId:
      "947198045768-i9tuc7gvs6hipq2uid5pove59pdlh9jm.apps.googleusercontent.com",
    iosClientId: `947198045768-vju27cp537legpef5ok51obpjshq11bj.apps.googleusercontent.com`,
    androidClientId: `947198045768-miln50ernorl8s7kqibnpp59hoklor3n.apps.googleusercontent.com`,
    // iosStandaloneAppClientId:
    //   "947198045768-vju27cp537legpef5ok51obpjshq11bj.apps.googleusercontent.com",
    // androidStandaloneAppClientId:
    //   "947198045768-miln50ernorl8s7kqibnpp59hoklor3n.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (result?.type === "success") {
      console.log("Google SignIn", "SUCCESS", result);
      const token = result.params.id_token;
      console.log(fetchUserInfo(token));
    } else {
      console.log("Google SignIn", "FAILURE", result);
    }
  }, [result]);

  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const signedIn = useSelector(signedInState);
  const [isSignedIn, setSigned] = useState(false);

  const log_in = (SUser) => dispatch(login(SUser));

  const colorScheme = useColorScheme();
  const [onBoard, setOnBoarded] = useState(false);
  // const [showPagination, setShowPagination] = useState(true);

  useEffect(() => {
    getSignedIn(setSigned);
    getEmail(setEmail);
    console.log("email", email);
    console.log("signedIn", isSignedIn);
    console.log(userId);

    if (email !== "" && isSignedIn) {
      getUserId(setUserId);
      setOnBoarded(true);
      getAccessToken(setAccessToken);
      log_in({
        accessToken: accessToken,
      });
      firebaseSignIn(email, userId);
    }
  }, [email]);
  useEffect(() => {
    getOnboard(setOnBoarded);
  }, []);
  // useEffect(() => {
  //   if (showPagination) {
  //     setTimeout(() => setShowPagination(false), 3000);
  //   }
  // }, [showPagination]);

  async function fetchUserInfo(token) {
    await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${token}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(async (json) => {
        if (json.error) {
          console.log(json.error);
        } else {
          const userProfile = {
            idToken: token,
            user: {
              email: json.email,
              familyName: json.family_name,
              givenName: json.given_name,
              id: json.sub,
              name: json.name,
              photoUrl: json.picture,
            },
          };
          console.log(userProfile);
          postRequest(userProfile);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

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
          if (!onBoard) {
            const myUserRef = await userRef.doc(result.user.email);
            const doc = await myUserRef.get();
            if (doc.exists) {
              console.log(doc.data());
              setOnBoarded(doc.data().onboarded);
            }
          }
          log_in({
            accessToken: json.accessToken,
            userId: json.userId,
            email: result.user.email,
          });
          storeAccessToken(json.accessToken);
          storeUserId(json.userId);
          storeEmail(result.user.email);
          storeExpireAt(json.expiresAt + "");
          storeRefreshToken(json.refreshToken);
          register(result.user.email, json.userId);
        }
      })
      .catch((error) => {
        console.error(error);
      });
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
            console.log("finish");
            log_in(accessToken);

            storeSignedIn("true");
            setSigned(true);
          })
          .catch((error) => {
            alert(error);
          });
      }
    } catch (error) {
      console.error(error);
    }
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
  return signedIn.signIn.signedIn ? (
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
