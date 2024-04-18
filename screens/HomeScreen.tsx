import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { LogBox, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { SafeAreaView } from "react-native-safe-area-context";
import { DetailPullUpHeader } from "../components/GetStartedPullUp";
import { FILTER } from "../data/filter";

import { useIsFocused } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import ApiClient from "../api/ApiClient";
import Header from "../assets/svg-components/header";
import { ButtonBanner } from "../components/ButtonBanner";
import { ProductList } from "../components/ProductList";
import PurpleButton from "../components/PurpleButton";
import { auth } from "../config/firebase";
import { pressedOpacity } from "../constants/Values";
import { fonts } from "../globalStyle/globalFont";
import { HeaderIcon } from "../navigation/index";
import LoadingScreen from "../screens/LoadingScreen";
import { logout } from "../state_manage/reducers/signInReducer";
import { makeToast } from "../utils/Toast";
import {
  getUserId,
  storeEmail,
  storeSignedIn,
} from "../utils/asychStorageFunctions";
import { ExpandablePlusButton } from "../components/ExpandablePlusButton";

LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs();

export default function HomeScreen({ navigation, route }) {
  const [count, setCount] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [posts, setPosts] = useState(null);
  const [blockedUsers, setBlockedUsers] = useState([]);
  const isFocused = useIsFocused();
  const [userId, setUserId] = useState("");
  const [expand, setExpand] = useState(false);

  const dispatch = useDispatch();
  const log_out = () => {
    dispatch(logout());
  };

  const apiClient = new ApiClient();

  const getBlockedUsers = async () => {
    try {
      const response = await apiClient.get(`/user/blocked/id/${userId}`);
      if (response.users) {
        setBlockedUsers(response.users);
      } else {
        makeToast({ message: "Error fetching blocked users", type: "ERROR" });
      }
    } catch (error) {
      console.error(`HomeScreen.getBlockedUsers failed: ${error}`);
    }
  };

  // At the start load the current user ID, we need to check if the session is valid
  useEffect(() => {
    getUserId(setUserId);
  }, []);

  useEffect(() => {
    if (userId) {
      apiClient.get(`/auth/sessions/${userId}`).then(async (res) => {
        if (res.sessions) {
          const currentSession = res.sessions[0];
          if (!currentSession.active) {
            storeSignedIn("false");
            storeEmail("");
            AsyncStorage.clear();

            makeToast({
              message: "Session expired, please login again",
              type: "INFO",
            });
            log_out();

            auth
              .signOut()
              .then(() => {})
              .catch((error) => {});
          }
        }
      });

      getBlockedUsers();
    }
  }, [userId]);

  // When they change the filter or navigate back to the screen, refresh posts
  useEffect(() => {
    if (isFocused) {
      if (count === 0) {
        getPosts();
      } else {
        filterPost(FILTER[count].title);
      }
    }
  }, [count, isFocused]);

  const getPosts = async () => {
    const makeError = () => {
      makeToast({
        message: "Failed to load posts, reload the app",
        type: "ERROR",
      });
    };
    try {
      if (!posts) {
        setLoading(true);
      }
      const response = await apiClient.get("/post");
      if (response.posts) {
        setPosts(
          // Sort with most recent at the top
          response.posts
            .toSorted(
              (post1, post2) =>
                new Date(post2.created).getTime() -
                new Date(post1.created).getTime()
            )
            .slice(0, 200) // Restrict to only 200 posts, can change if needed
          // .filter(post => !blockedUsers.some(user => user.id === post.user.id))
        );
      } else {
        makeError();
        console.log(`response: ${JSON.stringify(response)}`);
      }
    } catch (error) {
      makeError();
      console.log(`error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const filterPost = async (keyword: string) => {
    try {
      const response = await apiClient.post("/post/filter", {
        category: keyword,
      });
      if (response.posts) {
        setPosts(
          response.posts.toSorted(
            (post1, post2) =>
              new Date(post1.created).getTime() -
              new Date(post2.created).getTime()
          )
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Displays loading animation for better feedback on refresh
  const refreshPosts = () => {
    setLoading(true);
    setTimeout(async () => {
      await getBlockedUsers();
      await getPosts();
    }, 500);
  };
  const { showPanel } = route.params;
  const [welcomeState, setWelcomeState] = useState(showPanel);

  return (
    <SafeAreaView style={[styles.outer]}>
      <View style={styles.header}>
        <View style={styles.resellLogo}>
          <Header />
        </View>

        <TouchableOpacity
          activeOpacity={pressedOpacity}
          style={styles.searchButton}
          onPress={() => {
            AsyncStorage.getItem("history", (errs, result) => {
              if (!errs) {
                var tempt =
                  result !== null && result !== undefined
                    ? JSON.parse(result)
                    : [];
                navigation.navigate("SearchHome", {
                  history: tempt,
                });
              }
            });
          }}
        >
          <HeaderIcon name="search" color="black" size={28} />
        </TouchableOpacity>
      </View>

      <ButtonBanner count={count} setCount={setCount} data={FILTER} />
      <View style={styles.listView}>
        {isLoading ? (
          <LoadingScreen screen={"Home"} />
        ) : posts && posts.length == 0 ? (
          <View style={styles.noResultView}>
            <Text style={[fonts.pageHeading2, { marginBottom: 8 }]}>
              No Posts Found
            </Text>
            <Text style={[fonts.body1, { color: "#707070" }]}>
              Please try another category
            </Text>
          </View>
        ) : (
          <ProductList
            data={posts}
            onRefresh={refreshPosts}
            navigation={navigation}
            screen={"Home"}
          />
        )}
      </View>
      <ExpandablePlusButton
        onListingPressed={() => navigation.navigate("NewPostImage")}
        onRequestPressed={() => navigation.navigate("NewRequest")}
        expand={expand}
        setExpand={setExpand}
      />
      {showPanel && (
        <Modal
          isVisible={welcomeState}
          backdropOpacity={0.2}
          onBackdropPress={() => {
            setWelcomeState(false);
            navigation.navigate("Root");
          }}
          style={{ justifyContent: "flex-end", margin: 0 }}
        >
          <View style={styles.slideUp}>
            <DetailPullUpHeader
              title={"Welcome to Resell"}
              description={"Empowering sustainable buyers and sellers"}
            />
            <View style={styles.purpleButton}>
              <PurpleButton
                text={"Get Started"}
                onPress={() => {
                  setWelcomeState(false);
                }}
                enabled={true}
              />
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  outer: {
    backgroundColor: "#FFFFFF",
    flex: 1,
    paddingTop: 10,
  },
  welcome: {
    height: 40,
    color: "#9E70F6",
  },
  header: {
    height: 40,
  },
  resellLogo: {
    position: "absolute",
    left: 26,
  },
  searchButton: {
    position: "absolute",
    right: 20,
    top: 4,
    alignItems: "flex-end",
    width: 50,
    height: 50,
  },
  slideUp: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    height: 370,
    backgroundColor: "#ffffff",
    width: "100%",
    marginHorizontal: 0,
    alignItems: "center",
  },
  purpleButton: {
    alignItems: "center",
    width: "100%",
    backgroundColor: "white",
  },
  noResultView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  listView: { height: "100%", flex: 1 },
});
