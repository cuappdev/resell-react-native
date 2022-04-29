import React, { useEffect, useState, useRef } from "react";
import BackButton from "../assets/svg-components/back_button";
import BookMarkButton from "../assets/svg-components/bookmark_button";
import BookMarkButtonSaved from "../assets/svg-components/bookmark_button_saved";
import ExportButton from "../assets/svg-components/export_button";
import {
  Item,
  DetailPullUpHeader,
  DetailPullUpBody,
} from "../components/DetailPullup";
import Gallery from "../components/Gallery";
import {
  View,
  TouchableOpacity,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Platform,
  Image,
  Dimensions,
} from "react-native";
import SlidingUpPanel from "rn-sliding-up-panel";
import GreyButton from "../components/GreyButton";
import { menuBarTop } from "../constants/Layout";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { pressedOpacity } from "../constants/Values";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  topBar: {
    height: menuBarTop + 60,
    width: "100%",
    position: "absolute",
    top: 0,
    zIndex: 10,
  },
  backButton: {
    position: "absolute",
    top: menuBarTop,
    left: 20,
    zIndex: 15,
    width: 20,
    height: 30,
  },
  trashButton: {
    position: "absolute",
    top: menuBarTop - 2,
    right: 110,
    zIndex: 15,
    // width: 20,
    // height: 30,
  },
  bookmarkButton: {
    position: "absolute",
    top: menuBarTop,
    right: 65,
    zIndex: 15,
    width: 20,
    height: 30,
  },
  exportButton: {
    position: "absolute",
    top: menuBarTop,
    right: 20,
    zIndex: 15,
    width: 20,
    height: 30,
  },
  slideUp: {
    flex: 1,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  greyButton: {
    position: "absolute",
    bottom: 0,
    alignItems: "center",
    width: "100 %",
    zIndex: 10,
    height: 100,
    backgroundColor: "white",
  },
  bottomGradient: {
    height: 60,
    width: "100%",
    position: "absolute",
    bottom: 100,
    zIndex: 10,
  },
});

export default function ProductDetailsScreen({ route, navigation }) {
  const { post, showTrash } = route.params;

  const [maxImgRatio, setMaxImgRatio] = useState(0); // height / width

  const [isLoading, setLoading] = useState(true);
  const [similarItems, setSimilarItems] = useState([]);

  const getPost = async () => {
    try {
      const response = await fetch(
        "https://resell-dev.cornellappdev.com/api/post/"
      );
      const json = await response.json();
      setSimilarItems(json.posts.slice(0, 4));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  const item: Item = {
    images: post.images,
    title: post.title,
    price: post.price,
    sellerName: post.user.givenName + " " + post.user.familyName,
    sellerProfile: post.user.photoUrl,
    description: post.description,
    similarItems: [],
  };
  const sPanel = useRef(null);
  useEffect(() => {
    sPanel.current.show(
      Dimensions.get("window").height -
        Math.min(400, Dimensions.get("window").width * maxImgRatio - 40)
    );
    // makes the slide up cover the very bottom of images if they are wide, or a larger portion of the image if the image is long
  });

  useEffect(() => {
    for (let i = 0; i < post.images.length; i++) {
      Image.getSize(post.images[i], (width, height) => {
        if (height / width > maxImgRatio) {
          setMaxImgRatio(height / width);
        }
      });
    }
  });

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["rgba(0,0,0,0.8)", "transparent"]}
        style={styles.topBar}
      />
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <BackButton />
      </TouchableOpacity>
      {showTrash && (
        <TouchableOpacity
          activeOpacity={pressedOpacity}
          style={styles.trashButton}
          onPress={() => {}}
        >
          <Feather name="trash" size={23} color="white" />
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={() => {}} style={styles.bookmarkButton}>
        <BookMarkButton />
        {/* if saved, show the following */}
        {/* <BookMarkButtonSaved/> */}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {}} style={styles.exportButton}>
        <ExportButton />
      </TouchableOpacity>
      <View
        style={{
          height: Dimensions.get("window").width * maxImgRatio,
          width: Dimensions.get("window").width,
        }}
      >
        <Gallery imagePaths={item.images} />
      </View>
      <SlidingUpPanel
        ref={(c) => {
          sPanel.current = c;
        }}
        draggableRange={{
          top: Dimensions.get("window").height - 100,
          bottom:
            Dimensions.get("window").height -
            Math.max(100, Dimensions.get("window").width * maxImgRatio),
        }} // 100 is used to avoid overlapping with top bar
      >
        <View style={styles.slideUp}>
          <DetailPullUpHeader item={item} />
          <DetailPullUpBody
            item={item}
            similarItems={similarItems}
            navigation={navigation}
          />
        </View>
      </SlidingUpPanel>
      <View style={styles.greyButton}>
        <GreyButton text={"Contact Seller"} />
      </View>
      <LinearGradient
        colors={["rgba(255, 255, 255, 0)", "#FFFFFF"]}
        style={styles.bottomGradient}
      />
    </View>
  );
}
