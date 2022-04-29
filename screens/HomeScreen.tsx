import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, Image} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DetailPullUpHeader } from "../components/GetStartedPullUp";
import Modal from "react-native-modal";
import { View } from "../components/Themed";
// import { SafeAreaView, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FAB } from "react-native-paper";
import { LogBox } from "react-native";
import { FILTER } from "../data/filter";
import { DATA } from "../data/product";
import { ButtonBanner } from "../components/ButtonBanner";
import { ProductList } from "../components/ProductList";
import Header from "../assets/svg-components/header";
import { HeaderIcon } from "../navigation/index";
import { pressedOpacity } from "../constants/Values";
import { homeBackgroundGray } from "../constants/Colors";
import LoadingScreen from "../screens/LoadingScreen";
import SlidingUpPanel from "rn-sliding-up-panel";
import PurpleButton from "../components/PurpleButton";
import ResellLogo from "../assets/svg-components/resell_logo";

// LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
// LogBox.ignoreAllLogs();

export default function HomeScreen({ navigation, route }) {
  const [count, setCount] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [fetchFailed, setFetchFailed] = useState(false);
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    try {
      setLoading(true)
      const response = await fetch("https://resell-dev.cornellappdev.com/api/post");
      const json = await response.json();
      setPosts(json.posts);
    } catch (error) {
      console.error(error);
      setFetchFailed(true);
    } finally {
      setLoading(false);
    }
  }
  
  useEffect(() => {
    getPosts();
  }, []);

  const { showPanel } = route.params;
  const [welcomeState, setWelcomeState] = useState(showPanel);

  return (
    <SafeAreaView style={styles.outer}>
      <View style={styles.header}>
        <Header style={styles.resellLogo} />

        <TouchableOpacity
          activeOpacity={pressedOpacity}
          style={styles.searchButton}
          onPress={() => {
            AsyncStorage.getItem("history", (errs, result) => {
              if (!errs) {
                var tempt = result !== null ? JSON.parse(result) : [];
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

      {isLoading ? <LoadingScreen/> : 
        (fetchFailed ? 
          <LoadingScreen/> :
          <ProductList
            count={count}
            data={posts}
            filter={FILTER}
            navigation={navigation}
          />
        )
      }

      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate("NewPostImage")}
        color={"#808080"}
        theme={{ colors: { accent: "white" } }}
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
              description={"Thrifting and selling has never been this easy"}
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
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 10,
    bottom: 90,
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
  },
  slideUp: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    height: 400,
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
});
