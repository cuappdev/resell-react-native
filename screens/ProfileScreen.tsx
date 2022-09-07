import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { pressedOpacity } from "../constants/Values";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "../components/Themed";
import { SafeAreaView, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { LogBox } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { ProductList } from "../components/ProductList";
LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs();

// State imports
import { setBio, setName } from "../state_manage/actions/profileScreenActions";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingScreen from "./LoadingScreen";
import { useIsFocused } from "@react-navigation/native";
import ColoredPlus from "../assets/svg-components/colored_plus";

export default function ProfileScreen({ navigation }) {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const changeName = (name: string) => dispatch(setName(name));
  const changeBio = (bio: string) => dispatch(setBio(bio));

  // const name = useSelector((state: any) => {
  //   return state.profile.name;
  // });

  // const bio = useSelector((state: any) => {
  //   return state.profile.bio;
  // });

  const [isLoading, setLoading] = useState(true);
  const [fetchFailed, setFetchFailed] = useState(false);
  const [username, setUsername] = useState("");
  const [realname, setRealname] = useState("");

  const [bio, setBio] = useState("");
  const [image, setImage] = useState("");

  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState("");

  AsyncStorage.getItem("userId", (errs, result) => {
    if (!errs) {
      if (result !== null && result !== undefined) {
        setUserId(result);
      }
    }
  });

  const getUser = async () => {
    try {
      const response = await fetch(
        "https://resell-dev.cornellappdev.com/api/user/id/" + userId
      );
      if (response.ok) {
        const json = await response.json();
        const user = json.user;
        setRealname(user.givenName + " " + user.familyName);
        setUsername(user.username);
        setBio(user.bio);
        setImage(user.photoUrl);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // update posts when home screen is entered again
    getUserIngress();
  }, [isFocused]);
  useEffect(() => {
    // update posts when home screen is entered again
    getPostsIngress();
  }, [isFocused]);
  const getUserIngress = async () => {
    try {
      const response = await fetch(
        "https://resell-dev.cornellappdev.com/api/user/id/" + userId
      );
      if (response.ok) {
        const json = await response.json();
        const user = json.user;
        setRealname(user.givenName + " " + user.familyName);
        setUsername(user.username);
        setBio(user.bio);
        setImage(user.photoUrl);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://resell-dev.cornellappdev.com/api/post/userId/" + userId
      );
      if (response.ok) {
        const json = await response.json();
        // console.log(json);
        setPosts(json.posts);
      }
    } catch (error) {
      console.error(error);
      setFetchFailed(true);
    } finally {
      setLoading(false);
    }
  };
  const getPostsIngress = async () => {
    try {
      const response = await fetch(
        "https://resell-dev.cornellappdev.com/api/post/userId/" + userId
      );
      if (response.ok) {
        const json = await response.json();
        setPosts(json.posts);
      }
    } catch (error) {
      console.error(error);
      setFetchFailed(true);
    }
  };
  useEffect(() => {
    getPosts();
  }, [userId]);

  useEffect(() => {
    getUser();
  }, [userId]);

  return (
    <View style={styles.container}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
      >
        <SafeAreaView>
          <View style={styles.upperContainer}>
            {/* <TouchableOpacity activeOpacity={pressedOpacity}>
              <ProfileScreenIcon name="search" color="black" size={24} />
            </TouchableOpacity> */}
            <View
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 10,
                marginTop: 10,
              }}
            >
              <Image style={styles.profileBubble} source={{ uri: image }} />
            </View>
            <TouchableOpacity
              style={{
                position: "absolute",
                end: 10,
                top: 10,
                width: 50,
                height: 50,
                alignItems: "center",
              }}
              activeOpacity={pressedOpacity}
              onPress={() => navigation.navigate("Settings")}
            >
              <ProfileScreenIcon name="settings" color="black" size={24} />
            </TouchableOpacity>
          </View>
          <View style={styles.profileTextContainer}>
            <Text style={styles.profileNameText}>{username}</Text>
            <Text style={styles.profileRealNameText}>{realname}</Text>

            <Text style={styles.profileBioText}>{bio}</Text>
          </View>
          <View style={{ height: "100%", flex: 1 }}>
            {isLoading ? (
              <LoadingScreen screen={"Profile"} />
            ) : fetchFailed ? (
              <LoadingScreen screen={"Profile"} />
            ) : (
              <ProductList
                data={posts}
                screen={"Profile"}
                navigation={navigation}
                onRefresh={null}
              />
            )}
          </View>
        </SafeAreaView>
      </ScrollView>
      <LinearGradient
        colors={["#DF9856", "#DE6CD3", "#AD68E3"]}
        style={styles.highLight}
        start={{ x: 0.9, y: 0 }}
        end={{ x: 0.1, y: 1 }}
      >
        <TouchableOpacity
          style={styles.plusButton}
          onPress={() => navigation.navigate("NewPostImage")}
        >
          <ColoredPlus />
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
}

function ProfileScreenIcon(props: {
  name: React.ComponentProps<typeof Feather>["name"];
  color: string;
  size: number;
}) {
  return <Feather size={props.size} name={props.name} color={props.color} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: 10,
  },
  upperContainer: {
    display: "flex",
    flexDirection: "row",
  },
  highLight: {
    marginVertical: 5,
    marginHorizontal: 5,
    borderRadius: 30,
    position: "absolute",
    right: 40,
    width: 60,
    height: 60,
    bottom: 110,
    alignContent: "center",
    paddingVertical: 2,
    zIndex: 2,
    paddingHorizontal: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },

  profileBubbleContainer: {
    flexGrow: 1,
  },
  profileBubble: {
    width: 89,
    height: 89,
    borderRadius: 50,
    backgroundColor: "#e0e0e0",
  },
  profileTextContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingHorizontal: 18,
    marginBottom: 10,
  },
  profileNameText: {
    fontFamily: "Rubik-Bold",
    fontSize: 20,
    paddingTop: 12,
  },
  profileRealNameText: {
    fontFamily: "Rubik-Regular",
    fontSize: 16,
    paddingBottom: 9,
    color: "#707070",
  },
  profileBioText: {
    fontFamily: "Rubik-Regular",
    fontSize: 16,
    maxWidth: "93%",
    textAlign: "center",
  },
  plusButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 28,
    width: 56,
    height: 56,
  },
});
