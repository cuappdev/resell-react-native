import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, Text, Image, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DetailPullUpHeader } from "../components/GetStartedPullUp";
import Modal from "react-native-modal";
// import { SafeAreaView, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LogBox } from "react-native";
import { FILTER } from "../data/filter";

import { ButtonBanner } from "../components/ButtonBanner";
import { ProductList } from "../components/ProductList";
import Header from "../assets/svg-components/header";
import { HeaderIcon } from "../navigation/index";
import { pressedOpacity } from "../constants/Values";
import LoadingScreen from "../screens/LoadingScreen";
import PurpleButton from "../components/PurpleButton";
import { useIsFocused } from "@react-navigation/native";
import { fonts } from "../globalStyle/globalFont";
import { getAccessToken, getUserId } from "../utils/asychStorageFunctions";

LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs();

export default function HomeScreen({ navigation, route }) {
  const [accessToken, setAccessToken] = useState("");
  getUserId(setAccessToken);
  console.log(accessToken);
  const [count, setCount] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [fetchFailed, setFetchFailed] = useState(false);
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();
  useEffect(() => {
    if (count == 0) {
      getPostsIngress();
    } else {
      filterPostsIngress(FILTER[count].title);
    }
  }, [isFocused]);

  useEffect(() => {
    if (count == 0) {
      getPosts();
    } else {
      filterPost(FILTER[count].title);
    }
  }, [count]);
  const filterPost = async (keyword) => {
    const Json = JSON.stringify({
      category: keyword,
    });
    try {
      setLoading(true);

      const response = await fetch(
        "https://resell-dev.cornellappdev.com/api/post/filter/",

        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: Json,
        }
      );
      if (response.ok) {
        const json = await response.json();
        setPosts(json.posts);
      }
    } catch (error) {
      console.error(error);
      setFetchFailed(true);
    } finally {
      setLoading(false);
    }
  };

  const getPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://resell-dev.cornellappdev.com/api/post"
      );
      const json = await response.json();
      if (JSON.stringify(json.posts) != JSON.stringify(posts)) {
        setPosts(json.posts);
      }
    } catch (error) {
      console.error(error);
      setFetchFailed(true);
    } finally {
      setLoading(false);
    }
  };

  const getPostsRefresh = async () => {
    try {
      const response = await fetch(
        "https://resell-dev.cornellappdev.com/api/post"
      );
      setLoading(true);
      const json = await response.json();
      setPosts(json.posts);
    } catch (error) {
      console.error(error);
      setFetchFailed(true);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500); //display loading animation
    }
  };
  const getPostsIngress = async () => {
    // does not set isLoading to hide data fetch
    try {
      const response = await fetch(
        "https://resell-dev.cornellappdev.com/api/post"
      );
      const json = await response.json();
      if (JSON.stringify(json.posts) != JSON.stringify(posts)) {
        setPosts(json.posts);
      }
    } catch (error) {
      console.error(error);
      setFetchFailed(true);
    }
  };

  const filterPostsIngress = async (keyword) => {
    const Json = JSON.stringify({
      category: keyword,
    });
    try {
      const response = await fetch(
        "https://resell-dev.cornellappdev.com/api/post/filter/",

        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: Json,
        }
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
  }, []);
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
      <View style={{ height: "100%", flex: 1 }}>
        {isLoading ? (
          <LoadingScreen screen={"Home"} />
        ) : fetchFailed ? (
          <LoadingScreen screen={"Home"} />
        ) : posts.length == 0 ? (
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
            onRefresh={getPostsRefresh}
            navigation={navigation}
            screen={"Home"}
          />
        )}
      </View>
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
});
