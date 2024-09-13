import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { updateProfile } from "firebase/auth";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { useApiClient } from "../api/ApiClientProvider";
import BackButton from "../assets/svg-components/back_button";
import VenmoInput from "../components/VenmoInput";
import { auth, userRef } from "../config/firebase";
import Colors from "../constants/Colors";
import { menuBarTop } from "../constants/Layout";
import { maxUsernameLength, pressedOpacity } from "../constants/Values";
import { fonts } from "../globalStyle/globalFont";
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
  const [isLoading, setIsLoading] = useState(false);
  const api = useApiClient();

  const pickImage = async () => {
    const permission = await checkPhotoPermission();
    if (!permission) {
      Alert.alert(
        "Permission Required",
        "Please enable gallery permissions to use this feature.",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Settings",
            onPress: openAppSettings,
          },
        ]
      );
      return;
    } else {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        base64: true,
        aspect: [1, 1],
        quality: 0.5,
      });
      if (!result.canceled) {
        setImage("data:image/jpeg;base64," + result["base64"]);
      }
    }
  };

  const checkPhotoPermission = async () => {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      return status === "granted";
    }
    return false;
  };

  const openAppSettings = () => {
    Linking.openSettings();
  };

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

  const [usernameError, setUsernameError] = useState("");

  const submit = async () => {
    setIsLoading(true);
    try {
      const res = await api.post("/user/", {
        photoUrlBase64: image.startsWith("https") ? "" : image,
        username: username,
        venmoHandle: venmo,
        bio: bio,
      });

      if (res.user) {
        await updateProfile(auth.currentUser, {
          displayName: res.user.givenName + " " + res.user.familyName,
          photoURL: res.user.photoUrl,
        });
        await userRef.doc(res.user.email).update({
          venmo: venmo,
        });
        navigation.goBack();
        makeToast({ message: "Profile updated successfully", type: "INFO" });
      }
    } catch (e) {
      makeToast({ message: "Error updating profile", type: "ERROR" });
    } finally {
      setIsLoading(false);
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
          <View style={[styles.headerButton, { opacity: isLoading ? 0.4 : 1 }]}>
            {isLoading ? (
              <>
                <ActivityIndicator size={16} />
                <View style={{ width: 16 }} />
              </>
            ) : (
              <View style={{ width: 32 }} />
            )}
            <TouchableOpacity
              onPress={() => {
                Keyboard.dismiss();
                if (username.length > 0) {
                  submit();
                } else {
                  makeToast({
                    message: "Username cannot be empty",
                    type: "ERROR",
                  });
                }
              }}
              disabled={Boolean(usernameError)}
            >
              <Text
                style={[
                  fonts.Title1,
                  {
                    color: usernameError
                      ? Colors.iconInactive
                      : Colors.resellPurple,
                  },
                ]}
              >
                Save
              </Text>
            </TouchableOpacity>
          </View>
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
                  onPress={pickImage}
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
                        if (text.length > maxUsernameLength) {
                          setUsernameError(
                            `Must be ${maxUsernameLength} characters or fewer`
                          );
                        } else if (text.trim().length === 0) {
                          setUsernameError("Username must not be empty");
                        } else {
                          setUsernameError("");
                        }
                        if (scroll.current !== null) {
                          scroll.current.scrollToEnd({
                            animated: true,
                          });
                        }
                      }}
                    />
                    {usernameError && (
                      <Text
                        style={{
                          fontSize: 12,
                          fontFamily: "Rubik-Regular",
                          color: "#FF0000",
                          marginTop: 4,
                        }}
                      >
                        {usernameError}
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
                    Venmo Handle
                  </Text>
                  <View
                    style={{
                      flexDirection: "column",
                      width: "40%",
                      marginEnd: 24,
                    }}
                  >
                    <VenmoInput
                      venmo={venmo}
                      onChangeVenmo={(text) => {
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
    width: 100,
    height: 40,
  },
  title: {
    marginTop: Platform.OS === "ios" ? menuBarTop : 20,
    alignItems: "center",
  },

  headerButton: {
    marginEnd: 10,
    marginTop: Platform.OS === "ios" ? menuBarTop - 5 : 20,
    height: 40,
    width: 100,
    flexDirection: "row",
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
