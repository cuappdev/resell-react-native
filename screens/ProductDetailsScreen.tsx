import React, { useEffect, useState, useRef } from "react";
import BackButton from "../assets/svg-components/back_button";
import BookMarkButton from "../assets/svg-components/bookmark_button";
import BookMarkButtonSaved from "../assets/svg-components/bookmark_button_saved";
import ExportButton from "../assets/svg-components/export_button";
import {
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
  Share,
} from "react-native";
import SlidingUpPanel from "rn-sliding-up-panel";
import GreyButton from "../components/GreyButton";
import { menuBarTop } from "../constants/Layout";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { pressedOpacity } from "../constants/Values";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Modal from "react-native-modal";
import PurpleButton from "../components/PurpleButton";
import { auth, historyRef } from "../config/firebase";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  topBar: {
    height: Platform.OS === "ios" ? menuBarTop + 60 : 80,
    width: "100%",
    position: "absolute",
    top: 0,
    zIndex: 10,
  },
  backButton: {
    position: "absolute",
    top: Platform.OS === "ios" ? menuBarTop : 20,
    left: 10,
    zIndex: 15,
    width: 50,
    height: 50,
    alignItems: "center",
  },
  trashButton: {
    position: "absolute",
    top: Platform.OS === "ios" ? menuBarTop - 2 : 18,
    right: 110,
    zIndex: 15,
    width: 50,
    alignItems: "center",
    height: 50,
  },
  bookmarkButton: {
    position: "absolute",
    top: Platform.OS === "ios" ? menuBarTop : 20,
    right: 60,
    zIndex: 15,
    width: 50,
    alignItems: "center",
    height: 50,
  },
  exportButton: {
    position: "absolute",
    top: Platform.OS === "ios" ? menuBarTop : 20,
    right: 10,
    zIndex: 15,
    width: 50,
    alignItems: "center",
    height: 50,
  },
  modal: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    height: 200,
    backgroundColor: "#ffffff",
    width: "100%",
    marginHorizontal: 0,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-evenly",
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
  button: {
    width: 230,
    flexDirection: "column",
    alignItems: "center",
    padding: "3%",
    borderRadius: 25,
    backgroundColor: "#d52300",
  },

  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
    fontFamily: "Rubik-Regular",
  },
  button1: {
    width: 230,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
    padding: "3%",
    borderRadius: 25,
  },

  buttonText2: {
    color: "black",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "500",
    fontFamily: "Rubik-Medium",
  },
});

export default function ProductDetailsScreen({ route, navigation }) {
  const { post, screen, savedInitial } = route.params;
  const [maxImgRatio, setMaxImgRatio] = useState(0); // height / width
  const [isLoading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(savedInitial);
  const [item, setItem] = useState(
    screen === "Saved"
      ? {
          images: post.images,
          title: post.title,
          price: post.price,
          description: post.description,
          categories: post.categories,
          similarItems: [],
          sellerName: "",
          sellerImage: "",
        }
      : {
          images: post.images,
          title: post.title,
          price: post.price,
          description: post.description,
          categories: post.categories,
          similarItems: [],
          sellerName: post.user.givenName + " " + post.user.familyName,
          sellerImage: post.user.photoUrl,
        }
  );

  useEffect(() => {
    setItem(
      screen === "Saved"
        ? {
            images: post.images,
            title: post.title,
            price: post.price,
            description: post.description,
            categories: post.categories,
            similarItems: [],
            sellerName: "",
            sellerImage: "",
          }
        : {
            images: post.images,
            title: post.title,
            price: post.price,
            description: post.description,
            categories: post.categories,
            similarItems: [],
            sellerName: post.user.givenName + " " + post.user.familyName,
            sellerImage: post.user.photoUrl,
          }
    );
  }, [post]);

  useEffect(() => {
    getPost();
    if (screen === "Saved") {
      fetchPost();
    } else {
      setProfileImage(post.user.photoUrl);
      setSellerEmail(post.user.email);
      setSellerName(post.user.givenName + " " + post.user.familyName);
      setSellerVenmo(post.user.venmoHandle);
    }
  }, [post]);
  const [similarItems, setSimilarItems] = useState([]);
  const [userId, setUserId] = useState("");
  const [sellerName, setSellerName] = useState("");
  const [sellerEmail, setSellerEmail] = useState("");
  const [sellerVenmo, setSellerVenmo] = useState("");

  const [profileImage, setProfileImage] = useState("");
  const [modalVisibility, setModalVisibility] = useState(false);

  AsyncStorage.getItem("userId", (errs, result) => {
    if (!errs) {
      if (result !== null) {
        setUserId(result);
      }
    }
  });
  const getPost = async () => {
    try {
      let response;
      if (post.categories) {
        response = await fetch(
          "https://resell-dev.cornellappdev.com/api/post/filter/",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              category: post.categories[0],
            }),
          }
        );
      } else {
        response = await fetch(
          "https://resell-dev.cornellappdev.com/api/post/"
        );
      }
      const json = await response.json();
      setSimilarItems(json.posts.slice(0, 4));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPost = async () => {
    try {
      let response;
      // console.log(post.id);
      response = await fetch(
        "https://resell-dev.cornellappdev.com/api/user/postId/" + post.id,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      const userResult = await response.json();

      setSellerName(
        userResult.user.givenName + " " + userResult.user.familyName
      );
      setSellerVenmo(userResult.user.venmoHandle);
      setProfileImage(userResult.user.photoUrl);
      setSellerEmail(userResult.user.email);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchIsSaved = async () => {
    try {
      const response = await fetch(
        "https://resell-dev.cornellappdev.com/api/post/isSaved/userId/" +
          userId +
          "/postId/" +
          post.id
      );
      if (response.ok) {
        const json = await response.json();
        setIsSaved(json.isSaved);
      }
    } catch (error) {
      //console.error(error);
    }
  };
  fetchIsSaved();

  const save = async () => {
    try {
      const response = await fetch(
        "https://resell-dev.cornellappdev.com/api/post/save/userId/" +
          userId +
          "/postId/" +
          post.id
      );
      const json = await response.json();
      setIsSaved(json.isSaved);
    } catch (error) {
      //console.error(error);
    }
  };

  const unsave = async () => {
    try {
      const response = await fetch(
        "https://resell-dev.cornellappdev.com/api/post/unsave/userId/" +
          userId +
          "/postId/" +
          post.id
      );
      const json = await response.json();
      setIsSaved(json.isSaved);
    } catch (error) {
      //console.error(error);
    }
  };

  const onShare = async () => {
    try {
      //product, differ by device

      const result = await Share.share({
        message:
          "Checkout this " +
          post.title +
          "posted by " +
          sellerName +
          "on Cornell Appdev Resell App, it's only for " +
          post.price,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  const [accessToken, setAccessToken] = useState("");

  AsyncStorage.getItem("accessToken", (errs, result) => {
    if (!errs) {
      if (result !== null) {
        setAccessToken(result);
      }
    }
  });
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

  const deletePost = () => {
    fetch("https://resell-dev.cornellappdev.com/api/post/id/" + post.id, {
      method: "DELETE",
      headers: {
        Authorization: accessToken,

        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(function (response) {
      // alert(JSON.stringify(response));

      if (!response.ok) {
        let error = new Error(response.statusText);
        throw error;
      } else {
        console.log("deleted");
        setModalVisibility(false);
        navigation.goBack();
        return response.json();
      }
    });
  };

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
      {screen === "Profile" && (
        <TouchableOpacity
          activeOpacity={pressedOpacity}
          style={styles.trashButton}
          onPress={() => {
            setModalVisibility(true);
          }}
        >
          <Feather name="trash" size={23} color="white" />
        </TouchableOpacity>
      )}
      <TouchableOpacity
        onPress={() => {
          isSaved ? unsave() : save();
        }}
        style={styles.bookmarkButton}
      >
        {isSaved ? <BookMarkButtonSaved /> : <BookMarkButton />}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onShare()} style={styles.exportButton}>
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
          <DetailPullUpHeader
            item={item}
            sellerName={sellerName}
            sellerProfile={profileImage}
          />
          <DetailPullUpBody
            sellerName={sellerName}
            item={item}
            similarItems={similarItems}
            navigation={navigation}
            screen={screen}
          />
        </View>
      </SlidingUpPanel>
      {screen != "Profile" && sellerEmail != auth?.currentUser?.email && (
        <View style={styles.greyButton}>
          <PurpleButton
            onPress={() => {
              // console.log(sellerName);
              // console.log(sellerEmail);
              // console.log(profileImage);
              historyRef
                .doc(auth?.currentUser?.email)
                .collection("sellers")
                .doc(sellerEmail)
                .update({ viewed: true });
              navigation.navigate("ChatWindow", {
                name: sellerName,
                receiverImage: profileImage,
                venmo: sellerVenmo,
                email: sellerEmail,
                post: post,
                isBuyer: true,
              });
            }}
            text={"Contact Seller"}
            enabled={true}
          />
        </View>
      )}
      {screen != "Profile" && sellerEmail != auth?.currentUser?.email && (
        <LinearGradient
          colors={["rgba(255, 255, 255, 0)", "#FFFFFF"]}
          style={styles.bottomGradient}
        />
      )}
      <Modal
        isVisible={modalVisibility}
        backdropOpacity={0.2}
        onBackdropPress={() => {
          setModalVisibility(false);
        }}
        style={{ justifyContent: "flex-end", margin: 0 }}
      >
        <View style={styles.modal}>
          <Text style={[styles.buttonText2, { padding: "3%" }]}>
            Delete Listing?
          </Text>
          <TouchableOpacity
            onPress={() => {
              deletePost();
            }}
          >
            <View style={styles.button}>
              <Text style={styles.buttonText}> Delete</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setModalVisibility(false);
            }}
          >
            <View style={styles.button1}>
              <Text style={styles.buttonText2}> Cancel</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}
