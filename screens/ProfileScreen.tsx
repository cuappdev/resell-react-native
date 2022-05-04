import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { pressedOpacity } from "../constants/Values";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "../components/Themed";
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  Image,
  Platform,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import ProductCard from "../components/ProductCard";
import { LogBox } from "react-native";
import { ProductList } from "../components/ProductList";
// LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
// LogBox.ignoreAllLogs();

// State imports
import { setBio, setName } from "../state_manage/actions/profileScreenActions";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingScreen from "./LoadingScreen";
import { useIsFocused } from "@react-navigation/native";

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
      if (result !== null) {
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
        console.log(json);
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
      setLoading(true);
      const response = await fetch(
        "https://resell-dev.cornellappdev.com/api/post/userId/" + userId
      );
      if (response.ok) {
        const json = await response.json();
        console.log(json);
        setPosts(json.posts);
      }
    } catch (error) {
      console.error(error);
      setFetchFailed(true);
    } finally {
      setLoading(false);
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
              }}
            >
              <Image style={styles.profileBubble} source={{ uri: image }} />
            </View>
            <TouchableOpacity
              style={{ position: "absolute", top: 10, end: 10 }}
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
          <ProductList
            count={null}
            data={posts}
            filter={null}
            fromProfile={true}
            navigation={navigation}
            onRefresh={null}
          />
        </SafeAreaView>
      </ScrollView>
      <TouchableOpacity
        style={styles.plusButton}
        onPress={() => navigation.navigate("NewPostImage")}
      >
        <Image source={require("../assets/images/new_post.png")} />
      </TouchableOpacity>
    </View>
  );
}

function ProfileScreenIcon(props: {
  name: React.ComponentProps<typeof Feather>["name"];
  color: string;
  size: number;
}) {
  return <Feather size={props.size} {...props} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingBottom: 75,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  upperContainer: {
    display: "flex",
    flexDirection: "row",
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
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    maxWidth: "93%",
    textAlign: "center",
  },
  plusButton: {
    position: "absolute",
    right: 50,
    bottom: 110,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 10,
    width: 20,
    height: 20,
  },
});
