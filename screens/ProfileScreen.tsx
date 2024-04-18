import { Feather } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  LogBox,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import ArchiveIcon from "../assets/svg-components/archiveIcon";
import PostIcon from "../assets/svg-components/postIcon";
import RequestIcon from "../assets/svg-components/requestIcon";
import { ExpandablePlusButton } from "../components/ExpandablePlusButton";
import { pressedOpacity } from "../constants/Values";
import { fonts } from "../globalStyle/globalFont";

LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs();

// State imports
import { useIsFocused } from "@react-navigation/native";
import FastImage from "react-native-fast-image";
import { useApiClient } from "../api/ApiClientProvider";
import { getUserId } from "../utils/asychStorageFunctions";
import { ArchivedPost } from "./ArchivedRoute";
import { OwnPostRoute } from "./OwnPostRoute";
import { RequestRoute } from "./RequestRoute";

export default function ProfileScreen({ navigation }) {
  const apiClient = useApiClient();

  const isFocused = useIsFocused();
  const [expand, setExpand] = useState(false);
  const [userId, setUserId] = useState("");
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
        onRefresh={getRequest}
      />
    );
  };

  // At the start load the current user ID
  useEffect(() => {
    getUserId(setUserId);
  }, []);

  // Fetch on tab switch
  useEffect(() => {
    if (userId && isFocused) {
      getUser();
      getPosts();
      getArchived();
      getRequest();
    }
  }, [userId, isFocused]);

  const getUser = async () => {
    try {
      const response = await apiClient.get(`/user/id/${userId}`);
      if (response.user) {
        const user = response.user;
        setRealname(user.givenName + " " + user.familyName);
        setUsername(user.username);
        setBio(user.bio);
        setImage(user.photoUrl);
      }
    } catch (error) {
      console.error(`ProfileScreen.getUser failed: ${error}`);
      setFetchUserFailed(true);
    } finally {
      setUserLoading(false);
    }
  };

  const getPosts = async () => {
    try {
      const response = await apiClient.get(`/post/userId/${userId}`);
      if (response.posts) {
        setPosts(
          // Sort with most recent at the top
          response.posts.toSorted(
            (post1, post2) =>
              new Date(post2.created).getTime() -
              new Date(post1.created).getTime()
          )
        );
      }
    } catch (error) {
      console.error(`ProfileScreen.getPosts failed: ${error}`);
      setFetchOwnPostFailed(true);
    } finally {
      setOwnPostLoading(false);
    }
  };

  const getPostsRefresh = async () => {
    try {
      const response = await apiClient.get(`/post/userId/${userId}`);
      if (response.posts) {
        setOwnPostLoading(true);
        setPosts(
          // Sort with most recent at the top
          response.posts.toSorted(
            (post1, post2) =>
              new Date(post2.created).getTime() -
              new Date(post1.created).getTime()
          )
        );
      }
    } catch (error) {
      console.error(`ProfileScreen.getPostsRefresh failed: ${error}`);
      setFetchOwnPostFailed(true);
    } finally {
      setTimeout(() => {
        setOwnPostLoading(false);
      }, 500); //display loading animation
    }
  };

  const getArchived = async () => {
    try {
      const response = await apiClient.get(`/post/archive/userId/${userId}`);
      if (response.posts) {
        setArchived(response.posts);
      }
    } catch (error) {
      console.error(`ProfileScreen.getArchived failed: ${error}`);
      setFetchArchivedFailed(true);
    } finally {
      setArchivedLoading(false);
    }
  };

  const getArchivedRefresh = async () => {
    try {
      const response = await apiClient.get(`/post/archive/userId/${userId}`);
      if (response.posts) {
        setArchivedLoading(true);
        setArchived(response.posts);
      }
    } catch (error) {
      console.error(`ProfileScreen.getArchivedRefresh failed: ${error}`);
      setFetchArchivedFailed(true);
    } finally {
      setTimeout(() => {
        setArchivedLoading(false);
      }, 500); //display loading animation
    }
  };

  const getRequest = async () => {
    try {
      const data = await apiClient.get(`/request/userId/${userId}`);
      if (data && data.requests) {
        setRequests(data.requests);
      }
    } catch (error) {
      console.error(`ProfileScreen.getRequest failed: ${error}`);
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
          <FastImage style={styles.profileBubble} source={{ uri: image }} />
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
    paddingTop: 5,
    marginTop: Platform.OS === "ios" ? 64 : 0,
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
