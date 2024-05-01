import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  Platform,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";
import SlidingUpPanel from "rn-sliding-up-panel";
import BackButton from "../assets/svg-components/back_button";
import EllipsesIcon from "../assets/svg-components/ellipses";
import {
  DetailPullUpBody,
  DetailPullUpHeader,
} from "../components/DetailPullup";
import Gallery from "../components/Gallery";
import OptionsMenu from "../components/OptionsMenu";
import PurpleButton from "../components/PurpleButton";
import { auth, historyRef } from "../config/firebase";
import Layout, { menuBarTop } from "../constants/Layout";
import { makeToast } from "../utils/Toast";
import { useApiClient } from "../api/ApiClientProvider";

export default function ProductDetailsScreen({ route, navigation }) {
  const { post, screen, savedInitial } = route.params;
  const [maxImgRatio, setMaxImgRatio] = useState(0); // height / width
  const [isLoading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(savedInitial);
  const [item, setItem] = useState({
    images: post.images,
    title: post.title,
    price: post.altered_price,
    description: post.description,
    categories: post.categories,
    similarItems: [],
  });

  const apiClient = useApiClient();

  useEffect(() => {
    setItem({
      images: post.images,
      title: post.title,
      price: post.altered_price,
      description: post.description,
      categories: post.categories,
      similarItems: [],
    });
  }, [post]);
  const getPost = async () => {
    try {
      let response;
      if (post.categories) {
        response = await apiClient.post("/post/filter", {
          category: post.categories[0],
        });
      } else {
        response = await apiClient.get("/post");
      }
      const json = response;
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
      response = await apiClient.get(`/user/postId/${post.id}`);

      const userResult = response;

      setSellerId(userResult.user.id);
      setSellerFirstName(userResult.user.givenName);
      setSellerName(
        userResult.user.givenName + " " + userResult.user.familyName
      );
      setSellerUsername(userResult.user.username)
      setProfileImage(userResult.user.photoUrl);
      setSellerEmail(userResult.user.email);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const displayExternalProfile = () => {
    navigation.navigate("ExternalProfile", {
      sellerName: sellerName,
      sellerId: sellerId,
      sellerUsername: sellerUsername,
    });
  }

  useEffect(() => {
    getPost();
    fetchPost();
  }, [post]);

  const [similarItems, setSimilarItems] = useState([]);
  const [userId, setUserId] = useState("");
  const [sellerId, setSellerId] = useState("");
  const [sellerFirstName, setSellerFirstName] = useState("");
  const [sellerName, setSellerName] = useState("");
  const [sellerEmail, setSellerEmail] = useState("");
  const [sellerUsername, setSellerUsername] = useState("")

  const [profileImage, setProfileImage] = useState("");
  const [menuVisible, setMenuVisible] = useState(false);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [accessToken, setAccessToken] = useState("");

  const [contactSellerLoading, setContactSellerLoading] = useState(false);
  AsyncStorage.getItem("accessToken", (errs, result) => {
    if (!errs) {
      if (result !== null && result != undefined) {
        setAccessToken(result);
      }
    }
  });
  AsyncStorage.getItem("userId", (errs, result) => {
    if (!errs) {
      if (result !== null && result !== undefined) {
        setUserId(result);
      }
    }
  });

  const save = async () => {
    try {
      const response = await apiClient.post(`/post/save/postId/${post.id}`);
      setIsSaved(true);
    } catch (error) {
      console.log(error);
    }
  };

  const unsave = async () => {
    try {
      const response = await apiClient.post(`/post/unsave/postId/${post.id}`);
      setIsSaved(false);
    } catch (error) {
      console.log(error);
      alert("sadUnsave");
    }
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        title: "Check out this " + post.title + "on Resell",
        message: `
        Check out this ${post.title} posted by ${sellerName}. It's only for $${item.price
          }.
        Click the following link if you have Resell already downloaded:
        ${(<a href="resell://product/${post.id}">Open in Resell</a>)}
        `,
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

  const onReport = () => {
    setMenuVisible(false);
    navigation.navigate("ReportPost", {
      sellerName: sellerFirstName,
      sellerId: sellerId,
      postId: post.id,
      userId: userId,
      type: "Post"
    });
  };

  const getImageSizeAsync = (
    uri: string
  ): Promise<{ width: number; height: number }> => {
    return new Promise((resolve, reject) => {
      Image.getSize(uri, (width, height) => resolve({ width, height }), reject);
    });
  };

  useEffect(() => {
    Promise.all(post.images.map((uri) => getImageSizeAsync(uri)))
      .then((sizes) => {
        let maxImgRatio: number = 0;
        for (const size of sizes) {
          maxImgRatio = Math.max(maxImgRatio, size.height / size.width);
        }
        setMaxImgRatio(maxImgRatio);
      })
      .catch((error) => {
        console.log(`error: ${JSON.stringify(error)}`);
        makeToast({ message: "Images failed to load", type: "ERROR" });
      });
  }, []);

  const deletePost = () => {
    apiClient.delete(`/post/id/${post.id}`).then(function (response) {
      if (!response.post) {
        let error = new Error(response.statusText);
        throw error;
      } else {
        setModalVisibility(false);
        navigation.goBack();
        return response;
      }
    });
  };

  const archivePost = () => {
    apiClient.post(`/post/archive/postId/${post.id}`).then(function (response) {
      if (!response.post) {
        let error = new Error(response.statusText);
        throw error;
      } else {
        setModalVisibility(false);
        navigation.goBack();
        return response;
      }
    });
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const menuItems = [
    { label: "Share", iconName: "share", onPress: onShare },
    { label: "Report", iconName: "flag", onPress: onReport },
  ];

  if (userId === sellerId) {
    menuItems.push({
      label: "Delete",
      iconName: "trash",
      onPress: () => {
        setModalVisibility(true);
      },
    });
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["rgba(0,0,0,0.8)", "transparent"]}
        style={styles.topBar}
      />
      {/* Back button */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <BackButton />
      </TouchableOpacity>
      {/* Top bar options */}
      <View style={styles.optionsContainer}>
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
          <Modal
            isVisible={modalVisibility}
            backdropOpacity={0.2}
            onBackdropPress={() => {
              setModalVisibility(false);
            }}
            style={{ justifyContent: "flex-end", margin: 0 }}
          >
            <View
              style={[
                styles.modal,
                screen == "Archived" && { paddingBottom: "10%" },
              ]}
            >
              <Text style={[styles.buttonText2, { padding: "3%" }]}>
                Delete Listing Permanently?
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
              {screen != "Archived" && (
                <TouchableOpacity
                  onPress={() => {
                    archivePost();
                  }}
                >
                  <View style={styles.button1}>
                    <Text style={[styles.buttonText, { color: "#000000" }]}>
                      Archive Only
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            </View>
          </Modal>
        </Modal>
      </View>

      <View
        style={{
          height:
            maxImgRatio === 0
              ? Dimensions.get("window").height
              : Dimensions.get("window").width * maxImgRatio,
          width: Dimensions.get("window").width,
        }}
      >
        <Gallery
          isLoaded={maxImgRatio !== 0}
          imagePaths={item.images}
        ></Gallery>
      </View>
      <SlidingUpPanel
        draggableRange={{
          top: Dimensions.get("window").height - 150,
          bottom:
            Dimensions.get("window").height -
            Math.max(150, Dimensions.get("window").width * maxImgRatio),
        }}
        animatedValue={
          new Animated.Value(
            Dimensions.get("window").height -
            Math.min(400, Layout.window.width * maxImgRatio - 40)
          )
        }
      >
        <View style={styles.slideUp}>
          <DetailPullUpHeader
            item={item}
            sellerName={sellerName}
            sellerProfile={profileImage}
            isSaved={isSaved}
            save={save}
            unsave={unsave}
            displayExternalProfile={displayExternalProfile}
          />
          <DetailPullUpBody
            postId={post.id}
            sellerName={sellerName}
            sellerItem={item}
            similarItems={similarItems}
            navigation={navigation}
            screen={screen}
          />
        </View>
      </SlidingUpPanel>

      {screen != "Profile" &&
        screen != "Archived" &&
        sellerEmail != auth?.currentUser?.email && (
          <View style={styles.greyButton}>
            <PurpleButton
              onPress={async () => {
                try {
                  setContactSellerLoading(true);
                  var confirmedTime = "";
                  var confirmedViewed = false;

                  const myHistoryRef = doc(
                    collection(
                      doc(historyRef, auth.currentUser.email),
                      "sellers"
                    ),
                    sellerEmail
                  );
                  const myDoc = await getDoc(myHistoryRef);
                  if (myDoc.exists()) {
                    updateDoc(myHistoryRef, { viewed: true });
                    confirmedTime = myDoc.data().confirmedTime;
                    confirmedViewed = myDoc.data().confirmedViewed;
                  }
                  navigation.navigate("ChatWindow", {
                    name: sellerName,
                    receiverImage: profileImage,
                    email: sellerEmail,
                    post: post,
                    isBuyer: true,
                    confirmedTime: confirmedTime,
                    screen: "chat",
                  });
                  setContactSellerLoading(false);
                } catch (error) {
                  setContactSellerLoading(false);
                  makeToast({
                    message: "Problem contacting seller",
                    type: "ERROR",
                  });
                }
              }}
              text={"Contact Seller"}
              enabled={true}
              isLoading={contactSellerLoading}
            />
          </View>
        )}
      {screen != "Profile" &&
        screen != "Archived" &&
        sellerEmail != auth?.currentUser?.email && (
          <LinearGradient
            colors={["rgba(255, 255, 255, 0)", "#FFFFFF"]}
            style={styles.bottomGradient}
          />
        )}
    </View>
  );
}

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
    zIndex: 200,
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
    width: "100%",
    zIndex: 10,
    height: 80,
    backgroundColor: "white",
  },
  bottomGradient: {
    height: 60,
    width: "100%",
    position: "absolute",
    bottom: 80,
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
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
    fontFamily: "Rubik-Medium",
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
    fontSize: 18,
    textAlign: "center",
    fontWeight: "500",
    fontFamily: "Rubik-Medium",
  },
  optionsContainer: {
    position: "absolute",
    top: Platform.OS === "ios" ? menuBarTop + 5 : 20,
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
});
