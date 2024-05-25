import { Feather } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  LogBox,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { fonts } from "../globalStyle/globalFont";

LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs();

// State imports
import { useIsFocused } from "@react-navigation/native";
import FastImage from "react-native-fast-image";
import { useApiClient } from "../api/ApiClientProvider";
import { getUserId } from "../utils/asychStorageFunctions";
import BackButton from "../assets/svg-components/back_button";
import { menuBarTop } from "../constants/Layout";
import OptionsMenu from "../components/OptionsMenu";
import Modal from "react-native-modal";
import EllipsesIcon from "../assets/svg-components/ellipses";
import { ExternalPostRoute } from "./ExternalPostRoute";
import PopupSheet from "../components/PopupSheet";
import { makeToast } from "../utils/Toast";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BlurView } from "@react-native-community/blur";

export default function ExternalProfileScreen({ navigation, route }) {
  const { sellerName, sellerId, sellerUsername } = route.params;

  const apiClient = useApiClient();

  const isFocused = useIsFocused();
  const [userId, setUserId] = useState("");
  const [isUserLoading, setUserLoading] = useState(true);
  const [fetchUserFailed, setFetchUserFailed] = useState(false);
  const [isOwnPostLoading, setOwnPostLoading] = useState(true);
  const [fetchOwnPostFailed, setFetchOwnPostFailed] = useState(false);
  const [username, setUsername] = useState("");
  const [realname, setRealname] = useState("");

  const [bio, setBio] = useState("");
  const [image, setImage] = useState("");
  const [posts, setPosts] = useState([]);
  const [menuVisible, setMenuVisible] = useState(false);
  const [expandedProfile, setExpandedProfile] = useState(false);
  const [blockModalVisibility, setBlockModalVisibility] = useState(false);
  const [unblockModalVisibility, setUnblockModalVisibility] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);

  // At the start load the current user ID
  useEffect(() => {
    getUserId(setUserId);
  }, []);

  // Fetch on tab switch
  useEffect(() => {
    if (userId && isFocused) {
      getUser();
      getPosts();
      getBlockedUsers();
    }
  }, [userId, isFocused]);

  const getUser = async () => {
    try {
      const response = await apiClient.get(`/user/id/${sellerId}`);
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
      const response = await apiClient.get(`/post/userId/${sellerId}`);
      if (response.posts) {
        setPosts(
          // Sort with most recent at the top
          response.posts.sort(
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
      const response = await apiClient.get(`/post/userId/${sellerId}`);
      if (response.posts) {
        setOwnPostLoading(true);
        setPosts(
          // Sort with most recent at the top
          response.posts.sort(
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

  const onReport = () => {
    setMenuVisible(false);
    navigation.navigate("ReportPost", {
      sellerName: sellerName,
      sellerId: sellerId,
      postId: "",
      userId: userId,
      type: "User"
    });
  };

  const onBlock = () => {
    setBlockModalVisibility(true);
  }

  const onUnblock = () => {
    setUnblockModalVisibility(true);
  }

  const getBlockedUsers = async () => {
    try {
      const response = await apiClient.get(`/user/blocked/id/${userId}`);
      if (response.users) {
        setIsBlocked(response.users.some(user => user.id === sellerId))
      } else {
        makeToast({ message: "Error blocking user", type: "ERROR" });
      }
    } catch (error) {
      console.log(`BlockedUsersScreen.getBlockedUsers failed: ${error}`);
    }
  };

  const blockUser = async () => {
    try {
      const response = await apiClient.post("/user/block/", {
        blocked: sellerId,
      });
      if (response.user) {
        makeToast({ message: `Blocked ${sellerName}` });
        setBlockModalVisibility(false);
        navigation.goBack();
        navigation.goBack();
      } else {
        makeToast({ message: "Error blocking user", type: "ERROR" });
      }
    } catch (e: unknown) { }
  };

  const unblockUser = async () => {
    try {
      const response = await apiClient.post(`/user/unblock/`, {
        unblocked: sellerId,
      });
      if (response.user) {
        navigation.goBack()
      } else {
        makeToast({ message: "Error unblocking user", type: "ERROR" });
      }
    } catch (e) {
      console.log(`BlockedUsersScreen.unblockUser: ${e}`);
    }
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const menuItems = [
    { label: "Report", iconName: "flag", onPress: onReport },
  ];

  if (userId !== sellerId) {
    menuItems.push({
      label: isBlocked ? "Unblock" : "Block", iconName: "slash", onPress: isBlocked ? onUnblock : onBlock
    });
  }

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
          <TouchableOpacity
            onPress={() => setExpandedProfile(true)}
          >
            <FastImage style={styles.profileBubble} source={{ uri: image }} />
          </TouchableOpacity>
          <Modal
            isVisible={expandedProfile}
            onBackdropPress={() => setExpandedProfile(false)}
            backdropOpacity={0.9}
            animationIn="zoomInDown"
            animationOut="zoomOutDown"
            animationInTiming={400}
            animationOutTiming={400}
          >
            <FastImage style={styles.expandedProfileBubble} source={{ uri: image }} />
            <TouchableOpacity
              onPress={() => setExpandedProfile(false)}
              style={styles.closeIconContainer}
            >
              <Feather name="x" size={32} color="white" />
            </TouchableOpacity>
          </Modal>
        </View>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <BackButton color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => {
            AsyncStorage.getItem("history", (errs, result) => {
              if (!errs) {
                var tempt =
                  result !== null && result !== undefined
                    ? JSON.parse(result)
                    : [];
                navigation.navigate("SearchProfile", {
                  history: tempt,
                  userId: sellerId,
                  username: sellerUsername,
                });
              }
            });
          }}
        >
          <Feather name="search" color="black" size={28} />
        </TouchableOpacity>
        <View style={styles.optionsContainer}>
          <TouchableOpacity onPress={toggleMenu} style={styles.optionsButton}>
            <EllipsesIcon color={"black"} props />
          </TouchableOpacity>
          <Modal
            isVisible={menuVisible}
            onBackdropPress={() => setMenuVisible(false)}
            backdropOpacity={0.2}
            animationIn="fadeIn"
            animationOut="fadeOut"
            style={styles.optionsMenu}
          >
            <OptionsMenu items={menuItems}></OptionsMenu>
            <PopupSheet
              isVisible={blockModalVisibility}
              setIsVisible={setBlockModalVisibility}
              actionName={"Block User"}
              submitAction={blockUser}
              buttonText={"Block"}
              description={"Are you sure you’d like to block this user?"}
            />
          </Modal>
        </View>

      </View >
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

      <View style={styles.separator} />
      <ExternalPostRoute
        navigation={navigation}
        isLoading={isOwnPostLoading}
        fetchFailed={fetchOwnPostFailed}
        posts={posts}
        onRefresh={getPostsRefresh}
      />
      {isBlocked && (
        <BlurView
          style={styles.blockingOverlay}
          blurType="dark"
          blurAmount={5}
        >
          <Text style={styles.blockedText}>This profile is blocked</Text>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton2}
          >
            <BackButton color="white" />
          </TouchableOpacity>
          <View style={styles.optionsContainer2}>
            <TouchableOpacity onPress={toggleMenu} style={styles.optionsButton}>
              <EllipsesIcon color={"white"} props />
            </TouchableOpacity>
            <Modal
              isVisible={menuVisible}
              onBackdropPress={() => setMenuVisible(false)}
              backdropOpacity={0.2}
              animationIn="fadeIn"
              animationOut="fadeOut"
              style={styles.optionsMenu}
            >
              <OptionsMenu items={menuItems}></OptionsMenu>
              <PopupSheet
                isVisible={unblockModalVisibility}
                setIsVisible={setUnblockModalVisibility}
                actionName={`Unblock ${sellerUsername}`}
                submitAction={unblockUser}
                buttonText={"Unblock"}
                description={"They will be able to message you and view your posts."}
                errorState={true}
              />
            </Modal>
          </View>
        </BlurView>
      )}
    </View >
  );
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
  backButton: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 15,
    width: 50,
    height: 50,
    alignItems: "center",
  },
  optionsContainer: {
    position: "absolute",
    top: 10,
    right: 0,
    zIndex: 15,
    width: 50,
    height: 50,
    alignItems: "center",
  },
  optionsButton: {
    zIndex: 15,
    width: 50,
    height: 25,
  },
  optionsMenu: {
    position: "absolute",
    right: 0,
    top: Platform.OS === "ios" ? menuBarTop + 20 : 35,
    width: 254,
    backgroundColor: "#EDEDEDEE",
    zIndex: 100,
    borderRadius: 12,
  },
  separator: {
    height: 1,
    backgroundColor: "#BEBEBE",
    marginVertical: 16
  },
  expandedProfileBubble: {
    width: Dimensions.get("window").width - 48,
    height: Dimensions.get("window").width - 48,
    borderRadius: (Dimensions.get("window").width - 48) / 2,
    backgroundColor: "#F4F4F4",
  },
  closeIconContainer: {
    position: "absolute",
    top: Platform.OS === "ios" ? menuBarTop : 15,
    right: 5,
    zIndex: 100,
  },
  searchButton: {
    position: "absolute",
    top: 0,
    right: 50,
    zIndex: 15,
    width: 50,
    height: 50,
    alignItems: "center",
  },
  blockingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    top: -100,
  },
  // Style for the text in the blocking overlay
  blockedText: {
    fontSize: 18,
    fontFamily: "Rubik-Medium",
    color: "white",
    textAlign: "center",
  },
  backButton2: {
    position: "absolute",
    top: Platform.OS === "ios" ? menuBarTop + 50 : 50,
    left: 10,
    width: 50,
    height: 50,
    alignItems: "center",
  },
  optionsContainer2: {
    position: "absolute",
    top: Platform.OS === "ios" ? menuBarTop + 60 : 60,
    right: 0,
    zIndex: 15,
    width: 50,
    height: 50,
    alignItems: "center",
  },
});
