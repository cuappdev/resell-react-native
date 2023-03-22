import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { pressedOpacity } from "../constants/Values";
import {
  Platform,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from "react-native";

import { Image } from "react-native";
import { LogBox } from "react-native";

LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs();

// State imports
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import PostIcon from "../assets/svg-components/postIcon";
import ArchiveIcon from "../assets/svg-components/archiveIcon";
import RequestIcon from "../assets/svg-components/requestIcon";
import { ExpandablePlusButton } from "../components/ExpandablePlusButton";
import { OwnPostRoute } from "./OwnPostRoute";
import { ArchivedPost } from "./ArchivedRoute";
import { RequestRoute } from "./RequestRoute";
import { fonts } from "../globalStyle/globalFont";
import { getUserId } from "../utils/asychStorageFunctions";
export default function ProfileScreen({ navigation }) {
  const isFocused = useIsFocused();
  const [expand, setExpand] = useState(false);
  const [userId, setUserId] = useState("");
  getUserId(setUserId);

  const [isUserLoading, setUserLoading] = useState(true);
  const [fetchUserFailed, setFetchUserFailed] = useState(false);
  const [isOwnPostLoading, setOwnPostLoading] = useState(true);
  const [fetchOwnPostFailed, setFetchOwnPostFailed] = useState(false);
  const [isArchivedLoading, setArchivedLoading] = useState(true);
  const [fetchArchivedFailed, setFetchArchivedFailed] = useState(false);
  const [isRequestLoading, setRequestLoading] = useState(true);
  const [fetchRequestFailed, setFetchRequestFailed] = useState(false);
  const [username, setUsername] = useState("");
  const [realname, setRealname] = useState("");

  const [bio, setBio] = useState("");
  const [image, setImage] = useState("");

  const [posts, setPosts] = useState([]);
  const [archived, setArchived] = useState([]);
  const [requests, setRequests] = useState([]);

  const ownPostRoute = () => {
    return (
      <OwnPostRoute
        navigation={navigation}
        isLoading={isOwnPostLoading}
        fetchFailed={fetchOwnPostFailed}
        posts={posts}
        onRefresh={getPostsRefresh}
      />
    );
  };

  const archiveRoute = () => {
    return (
      <ArchivedPost
        navigation={navigation}
        isLoading={isArchivedLoading}
        fetchFailed={fetchArchivedFailed}
        archived={archived}
        onRefresh={getArchivedRefresh}
      />
    );
  };

  const requestRoute = () => {
    return (
      <RequestRoute
        navigation={navigation}
        isLoading={isRequestLoading}
        fetchFailed={fetchRequestFailed}
        requests={requests}
        onRefresh={null}
      />
    );
  };

  useEffect(() => {
    // update posts when home screen is entered again
    getUserIngress();
    getPostsIngress();
    getArchivedIngress();
    getRequestIngress();
  }, [isFocused]);

  useEffect(() => {
    getPosts();
    getArchived();
    getRequest();
    getUser();
  }, [userId]);
  const getUser = async () => {
    try {
      setUserLoading(true);

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
      setFetchUserFailed(true);
    } finally {
      setUserLoading(false);
    }
  };
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
      setFetchUserFailed(true);
    }
  };

  const getPosts = async () => {
    try {
      setOwnPostLoading(true);
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
      setFetchOwnPostFailed(true);
    } finally {
      setOwnPostLoading(false);
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
      setFetchOwnPostFailed(true);
    }
  };

  const getPostsRefresh = async () => {
    try {
      const response = await fetch(
        "https://resell-dev.cornellappdev.com/api/post/userId/" + userId
      );
      setOwnPostLoading(true);
      const json = await response.json();
      setPosts(json.posts);
    } catch (error) {
      console.error(error);
      setFetchOwnPostFailed(true);
    } finally {
      setTimeout(() => {
        setOwnPostLoading(false);
      }, 500); //display loading animation
    }
  };

  const getArchived = async () => {
    try {
      setArchivedLoading(true);
      const response = await fetch(
        "https://resell-dev.cornellappdev.com/api/post/archive/userId/" +
          userId,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const json = await response.json();
        // console.log(json);
        setArchived(json.posts);
      }
    } catch (error) {
      console.error(error);
      setFetchArchivedFailed(true);
    } finally {
      setArchivedLoading(false);
    }
  };

  const getArchivedIngress = async () => {
    try {
      const response = await fetch(
        "https://resell-dev.cornellappdev.com/api/post/archive/userId/" +
          userId,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const json = await response.json();
        setArchived(json.posts);
      }
    } catch (error) {
      console.error(error);
      setFetchArchivedFailed(true);
    }
  };
  const getArchivedRefresh = async () => {
    try {
      const response = await fetch(
        "https://resell-dev.cornellappdev.com/api/post/archive/userId/" + userId
      );
      setArchivedLoading(true);
      const json = await response.json();
      setArchived(json.posts);
      console.log(archived);
    } catch (error) {
      console.error(error);
      setFetchArchivedFailed(true);
    } finally {
      setTimeout(() => {
        setArchivedLoading(false);
      }, 500); //display loading animation
    }
  };
  const getRequest = async () => {
    try {
      setRequestLoading(true);
      const response = await fetch(
        "https://resell-dev.cornellappdev.com/api/request/userId/" + userId
      );
      if (response.ok) {
        const json = await response.json();
        setRequests(json.requests);
      }
    } catch (error) {
      console.error(error);
      setFetchRequestFailed(true);
    } finally {
      setRequestLoading(false);
    }
  };

  const getRequestIngress = async () => {
    try {
      const response = await fetch(
        "https://resell-dev.cornellappdev.com/api/request/userId/" + userId
      );
      if (response.ok) {
        const json = await response.json();
        setRequests(json.requests);
      }
    } catch (error) {
      console.error(error);
      setFetchRequestFailed(true);
    }
  };

  const [routes, setRoutes] = useState([
    { key: "ownPost" },
    { key: "archive" },
    { key: "request" },
  ]);
  const [index, setIndex] = useState(0);

  const _handleIndexChange = (index) => setIndex(index);

  const _renderTabBar = (props) => {
    const inputRange = routes.map((x, i) => i);

    return (
      <TabBar
        {...props}
        indicatorContainerStyle={{ backgroundColor: "white" }}
        indicatorStyle={{ backgroundColor: "black", height: 1 }}
        renderIcon={({ route, focused, color }) => {
          if (route.key == "ownPost") {
            return <PostIcon color={focused ? "#000" : "#BEBEBE"} />;
          } else if (route.key == "archive") {
            return <ArchiveIcon color={focused ? "#000" : "#BEBEBE"} />;
          } else if (route.key == "request") {
            return <RequestIcon color={focused ? "#000" : "#BEBEBE"} />;
          }
        }}
        style={{
          backgroundColor: "white",
          height: 48,
          borderBottomWidth: 1,
          borderBottomColor: "#BEBEBE",
        }}
      />
    );
  };

  const _renderScene = SceneMap({
    ownPost: ownPostRoute,
    archive: archiveRoute,
    request: requestRoute,
  });
  return (
    <View style={styles.container}>
      <View style={styles.upperContainer}>
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
        {isUserLoading || fetchUserFailed ? (
          <View
            style={{
              width: 114,
              height: 24,
              backgroundColor: "#F4F4F4",
              borderRadius: 20,
              marginTop: 12,
            }}
          />
        ) : (
          <Text style={[fonts.pageHeading3, { marginTop: 12 }]}>
            {username}
          </Text>
        )}
        {isUserLoading || fetchUserFailed ? (
          <View
            style={{
              width: 70,
              height: 20,
              backgroundColor: "#F4F4F4",
              borderRadius: 10,
              marginTop: 9,
            }}
          />
        ) : (
          <Text style={[fonts.body2, { color: "#707070", marginTop: 4 }]}>
            {realname}
          </Text>
        )}
        {!isUserLoading && !fetchUserFailed && (
          <Text
            style={[
              fonts.body2,
              {
                maxWidth: "93%",
                textAlign: "center",
                marginTop: 16,
              },
            ]}
            numberOfLines={3}
          >
            {bio}
          </Text>
        )}
      </View>
      <TabView
        navigationState={{
          index,
          routes,
        }}
        renderScene={_renderScene}
        renderTabBar={_renderTabBar}
        onIndexChange={_handleIndexChange}
      />

      <ExpandablePlusButton
        onListingPressed={() => navigation.navigate("NewPostImage")}
        onRequestPressed={() => navigation.navigate("NewRequest")}
        expand={expand}
        setExpand={setExpand}
      />
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
    marginTop: Platform.OS === "ios" ? 35 : 0,
  },

  upperContainer: {
    display: "flex",
    flexDirection: "row",
  },

  profileBubble: {
    width: 89,
    height: 89,
    borderRadius: 50,
    backgroundColor: "#F4F4F4",
  },
  profileTextContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingHorizontal: 18,
    marginBottom: 16,
  },
});
