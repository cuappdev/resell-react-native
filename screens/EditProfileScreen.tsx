import React, { useRef } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Platform,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  StatusBar,
  Alert,
} from "react-native";
import BackButton from "../assets/svg-components/back_button";
import { menuBarTop } from "../constants/Layout";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { pressedOpacity } from "../constants/Values";
import { useHeaderHeight } from "@react-navigation/elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native";
import { platform } from "os";
import { auth, userRef } from "../config/firebase";
import { useSelector } from "react-redux";
import { fonts } from "../globalStyle/globalFont";
import { getAccessToken } from "../utils/asychStorageFunctions";
import { makeToast } from "../utils/Toast";

export default function EditProfileScreen({ navigation, route }) {
  const {
    initialRealname,
    initialUsername,
    initialBio,
    initialNetId,
    initialVenmo,
    initialImage,
  } = route.params;

  const [image, setImage] = useState(initialImage);
  const [bio, setBio] = useState(initialBio);

  const [username, setUsername] = useState(initialUsername);
  const [venmo, setVenmo] = useState(initialVenmo);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      base64: true,
      aspect: [1, 1],
      quality: 0.5,
    });
    if (!result.cancelled) {
      console.log(result);
      setImage("data:image/jpeg;base64," + result["base64"]);
    }
  };

  const storePermission = async () => {
    try {
      await AsyncStorage.setItem("PhotoPermission", "true");
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    AsyncStorage.getItem("PhotoPermission", (errs, result) => {
      if (!errs) {
        if (result == null) {
          (async () => {
            if (Platform.OS !== "web") {
              const { status } =
                await ImagePicker.requestMediaLibraryPermissionsAsync();
              if (status !== "granted") {
                alert("Sorry, we need gallary permissions to make this work!");
              } else {
                storePermission();
              }
            }
          })();
        }
      }
    });
  }, []);

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        if (scroll.current !== null) {
          scroll.current.scrollToEnd({
            animated: true,
          });
        }
      }
    );

    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);
  const [accessToken, setAccessToken] = useState("");

  getAccessToken(setAccessToken);
  const [invalidName, setInvalidName] = useState(false);

  const submit = async () => {
    var Json;
    if (image.startsWith("https")) {
      Json = JSON.stringify({
        photoUrlBase64: "",
        username: username,
        venmoHandle: venmo,
        bio: bio,
      });
    } else {
      Json = JSON.stringify({
        photoUrlBase64: image,
        username: username,
        venmoHandle: venmo,
        bio: bio,
      });
    }
    console.log(Json);
    const response = await fetch(
      "https://resell-dev.cornellappdev.com/api/user",
      {
        method: "POST",
        headers: {
          Authorization: accessToken,

          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: Json,
      }
    );

    if (response.ok) {
      const data = await response.json();
      auth.currentUser.updateProfile({
        displayName: data.user.givenName + " " + data.user.familyName,
        photoURL: data.user.photoUrl,
      });
      userRef.doc(data.user.email).update({ venmo: venmo });
      navigation.goBack();
    }
  };
  const scroll = useRef<ScrollView | null>(null);
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View>
        <View
          style={{
            width: "100%",
            backgroundColor: "#FFFFFF",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <BackButton color="black" />
          </TouchableOpacity>
          <View style={styles.title}>
            <Text style={fonts.pageHeading3}>Edit Profile</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              Keyboard.dismiss();
              if (username.length > 0) {
                submit();
                makeToast("Profile Updated Successfully");
              } else {
                makeToast("Username cannot be empty");
              }
            }}
            style={styles.headerButton}
          >
            <Text style={[fonts.Title1, { color: "#9E70F6" }]}>Save</Text>
          </TouchableOpacity>
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView
            style={{ height: "100%" }}
            ref={(ref) => {
              scroll.current = ref;
            }}
          >
            <View style={styles.container}>
              <View>
                <Image style={styles.profilePic} source={{ uri: image }} />
                <TouchableOpacity
                  activeOpacity={pressedOpacity}
                  style={styles.roundButton1}
                  onPress={() => {
                    pickImage();
                  }}
                >
                  <Feather name="edit-2" size={18} color="black" />
                </TouchableOpacity>
              </View>

              <View style={{ width: "100%", marginTop: 30 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: 30,
                    minHeight: 30,
                  }}
                >
                  <Text style={[fonts.Title1, { marginStart: 24 }]}>Name</Text>
                  <Text style={[fonts.body1, { marginEnd: 24 }]}>
                    {initialRealname}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: 30,
                    minHeight: 30,
                  }}
                >
                  <Text style={[fonts.Title1, { marginStart: 24 }]}>Netid</Text>
                  <Text style={[fonts.body1, { marginEnd: 24 }]}>
                    {initialNetId}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: 30,
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <Text style={[fonts.Title1, { marginStart: 24 }]}>
                      Username
                    </Text>
                    {invalidName && (
                      <View
                        style={{
                          width: 16,
                          height: 16,
                          backgroundColor: "#FF0000",
                          borderRadius: 8,
                          alignItems: "center",
                          justifyContent: "center",
                          marginTop: 3,
                          marginLeft: 4,
                        }}
                      >
                        <Text style={{ color: "#FFFFFF", fontWeight: "500" }}>
                          !
                        </Text>
                      </View>
                    )}
                  </View>
                  <View
                    style={{
                      flexDirection: "column",
                      alignItems: "flex-end",
                      width: "40%",
                      marginEnd: 24,
                    }}
                  >
                    <TextInput
                      style={[
                        fonts.body1,
                        {
                          paddingTop: 10,
                          paddingBottom: 10,
                          paddingHorizontal: 15,
                          backgroundColor: "#F4F4F4",
                          borderRadius: 10,
                          minHeight: 40,
                          width: "100%",
                          textAlign: "right",
                        },
                      ]}
                      value={username}
                      onChangeText={(text) => {
                        setUsername(text);
                        setInvalidName(false);
                        if (scroll.current !== null) {
                          scroll.current.scrollToEnd({
                            animated: true,
                          });
                        }
                      }}
                    />
                    {invalidName && (
                      <Text
                        style={{
                          fontSize: 12,
                          fontFamily: "Rubik-Regular",
                          color: "#FF0000",
                          marginTop: 4,
                        }}
                      >
                        Name Unavailable
                      </Text>
                    )}
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: 30,
                  }}
                >
                  <Text style={[fonts.Title1, { marginStart: 24 }]}>
                    Venmo Link
                  </Text>
                  <View
                    style={{
                      flexDirection: "column",
                      width: "40%",
                      marginEnd: 24,
                    }}
                  >
                    <TextInput
                      style={[
                        fonts.body1,
                        {
                          paddingTop: 10,
                          paddingBottom: 10,
                          paddingHorizontal: 15,
                          backgroundColor: "#F4F4F4",
                          borderRadius: 10,
                          minHeight: 40,
                          width: "100%",
                          textAlign: "right",
                        },
                      ]}
                      value={venmo}
                      onChangeText={(text) => {
                        setVenmo(text);
                        if (scroll.current !== null) {
                          scroll.current.scrollToEnd({
                            animated: true,
                          });
                        }
                      }}
                    />
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={[fonts.Title1, { marginStart: 24 }]}>Bio</Text>
                  <View
                    style={{
                      flexDirection: "column",
                      alignItems: "flex-end",
                      width: "70%",
                      height: 100,
                      marginEnd: 24,
                      marginBottom: 50,
                    }}
                  >
                    <TextInput
                      style={[
                        fonts.body1,
                        {
                          paddingTop: 10,
                          borderRadius: 10,
                          padding: 10,
                          width: "100%",
                          minHeight: 40,
                          backgroundColor: "#F4F4F4",
                          textAlign: "left",
                          textAlignVertical: "top",
                          height: 100,
                        },
                      ]}
                      numberOfLines={4}
                      multiline={true}
                      maxLength={200}
                      value={bio}
                      onChangeText={(text) => {
                        setBio(text);
                        if (scroll.current !== null) {
                          scroll.current.scrollToEnd({
                            animated: true,
                          });
                        }
                      }}
                    />

                    {bio.length > 0 && (
                      <Text
                        style={{
                          fontSize: 12,
                          fontFamily: "Rubik-Regular",
                          color: "#707070",
                          marginTop: 4,
                        }}
                      >
                        {bio.length}/200
                      </Text>
                    )}
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
  },
  backButton: {
    zIndex: 1,
    marginStart: 10,
    marginTop: Platform.OS === "ios" ? menuBarTop : 20,

    alignItems: "center",
    width: 50,
    height: 40,
  },
  title: {
    marginTop: Platform.OS === "ios" ? menuBarTop : 20,
    alignItems: "center",
  },

  headerButton: {
    marginEnd: 10,
    marginTop: Platform.OS === "ios" ? menuBarTop : 20,
    height: 40,
    width: 50,

    alignItems: "center",
  },

  roundButton1: {
    width: 32,
    height: 32,
    position: "absolute",
    bottom: 0,
    right: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    elevation: 10,
    shadowOpacity: 0.2,
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 3 },
    backgroundColor: "white",
  },
  profilePic: {
    height: 132,
    width: 132,
    borderRadius: 66,
  },
});
