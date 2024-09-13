import React, { useEffect, useState } from "react";
import Modal from "react-native-modal";

import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { Dimensions, Platform, StyleSheet, Text, View } from "react-native";
import PagerView from "react-native-pager-view";
import Colors from "../../constants/Colors";
import { shadows } from "../../globalStyle/globalShadow";
import { NumberPad } from "../CustomizedNumKeyBoard";
import { NegotiationProductBubble } from "./NegotationProductModal";
const windowHeight = Dimensions.get("window").height;
const modalHeight =
  Platform.OS === "ios" ? windowHeight - 212 - 35 : windowHeight - 212;
export function NegotiationModal({
  modalVisible,
  setModalVisible,
  text,
  setText,
  setHeight,
  screen,
  post,
  items,
}: {
  modalVisible;
  setModalVisible;
  text;
  setText;
  setHeight;
  screen;
  post;
  items: FirebaseFirestoreTypes.DocumentData[];
}) {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [negotiationBubbles, setNegotiationBubbles] = useState<JSX.Element[]>(
    []
  );
  useEffect(() => {
    if (items) {
      setNegotiationBubbles(
        items.map((item, index) => (
          <View style={styles.negotiationBubbleContainer}>
            <NegotiationProductBubble
              product={item.title}
              price={item.original_price}
              image={item.images[0]}
              key={index}
            />
          </View>
        ))
      );
    }
  }, [items]);

  const onPageSelected = (event: any) => {
    setCurrentPage(event.nativeEvent.position);
  };

  return (
    <Modal
      backdropColor="black"
      backdropOpacity={0.2}
      isVisible={modalVisible}
      onBackdropPress={() => {
        setModalVisible(false);

        if (
          (screen === "NewPost" ||
            screen == "NewRequestMax" ||
            screen == "NewRequestMin") &&
          text.length > 0 &&
          text.slice(0, 1) != "$"
        ) {
          setText("$".concat(text));
        }
      }}
      style={{ margin: 0, justifyContent: "flex-end" }}
    >
      <View
        style={[
          styles.centeredView,
          screen === "NewPost" ||
          screen == "NewRequestMax" ||
          screen == "NewRequestMin"
            ? { height: modalHeight }
            : { height: "85%" },

          screen == "NewRequestMax" && {
            alignItems: "flex-end",
          },
        ]}
      >
        {(screen === "ChatBuyer" || screen === "ChatSeller") && (
          <>
            {negotiationBubbles.length > 1 && (
              <View style={[styles.dotNavContainer]}>
                {negotiationBubbles.map((_, index) => (
                  <View
                    style={[
                      styles.circle,
                      index === currentPage
                        ? { backgroundColor: Colors.resellPurple }
                        : { backgroundColor: Colors.iconInactive },
                    ]}
                  />
                ))}
              </View>
            )}

            <View
              style={{
                width: "100%",
                alignItems: "center",
                height: 100,
                marginBottom: 24,
              }}
            >
              <PagerView
                onPageSelected={onPageSelected}
                style={[styles.pagerView]}
                initialPage={0}
              >
                {negotiationBubbles.length > 0 ? (
                  negotiationBubbles
                ) : (
                  <View style={[{ width: "100%", alignItems: "center" }]}>
                    <NegotiationProductBubble
                      product={post.title}
                      price={post.original_price}
                      image={post.images[0]}
                    />
                  </View>
                )}
              </PagerView>
            </View>
          </>
        )}
        {screen === "NewPost" && (
          <View
            style={{
              paddingVertical: 10,
              paddingHorizontal: 10,
              width: 120,
              height: 40,
              backgroundColor: "#F4F4F4",
              borderRadius: 10,
              marginHorizontal: 24,
            }}
          >
            <Text
              style={{
                fontFamily: "Rubik-Regular",
                fontSize: 18,
                color: "#707070",
              }}
            >
              {"$" + text}
            </Text>
          </View>
        )}
        {screen == "NewRequestMax" && (
          <View
            style={{
              paddingVertical: 10,
              paddingHorizontal: 10,
              width: "35%",
              height: 40,
              backgroundColor: "#F4F4F4",
              borderRadius: 10,
              marginHorizontal: 24,
            }}
          >
            <Text
              style={{
                fontFamily: "Rubik-Regular",
                fontSize: 18,
                color: "#707070",
              }}
            >
              {"$" + text}
            </Text>
            <Text
              style={{
                fontFamily: "Rubik-Regular",
                fontSize: 14,
                position: "absolute",
                right: 16,
                bottom: 7,
              }}
            >
              max
            </Text>
          </View>
        )}
        {screen == "NewRequestMin" && (
          <View
            style={{
              paddingVertical: 10,
              paddingHorizontal: 10,
              width: screen === "NewPost" ? 120 : "35%",
              height: 40,
              backgroundColor: "#F4F4F4",
              borderRadius: 10,
              marginHorizontal: 24,
            }}
          >
            <Text
              style={{
                fontFamily: "Rubik-Regular",
                fontSize: 18,
                color: "#707070",
              }}
            >
              {"$" + text}
            </Text>
            <Text
              style={{
                fontFamily: "Rubik-Regular",
                fontSize: 14,
                position: "absolute",
                right: 16,
                bottom: 7,
              }}
            >
              min
            </Text>
          </View>
        )}
        {(screen === "NewPost" ||
          screen === "NewRequestMax" ||
          screen === "NewRequestMin") && (
          <View style={styles.modalView}>
            {screen === "NewPost" && (
              <Text style={[styles.textStyle, { marginBottom: 24 }]}>
                What price do you want to sell your product?
              </Text>
            )}
            {screen === "NewRequestMin" && (
              <Text style={[styles.textStyle, { marginBottom: 24 }]}>
                What's the minimum of your prefered price range?
              </Text>
            )}
            {screen === "NewRequestMax" && (
              <Text style={[styles.textStyle, { marginBottom: 24 }]}>
                What's the maximum of your prefered price range?{" "}
              </Text>
            )}
            <NumberPad
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
              originalText={text}
              setOriginalText={setText}
              screen={screen}
              productName={undefined}
              setHeight={setHeight}
            />
          </View>
        )}

        {(screen === "ChatBuyer" || screen === "ChatSeller") && (
          <View style={styles.modalView}>
            <Text style={[styles.textStyle, { marginBottom: 24 }]}>
              What price do you want to negotiate for?
            </Text>
            <NumberPad
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
              originalText={text}
              setOriginalText={setText}
              screen={screen}
              productName={post.title}
              setHeight={setHeight}
            />
          </View>
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flexDirection: "column",
    width: "100%",
  },
  modalView: {
    flex: 1,
    width: "100%",
    backgroundColor: "white",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingHorizontal: 30,
    paddingTop: 20,
    paddingBottom: 0,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 5,
    marginTop: 20,
  },

  textStyle: {
    fontFamily: "Rubik-Regular",
    fontSize: 20,
    fontWeight: "700",
    color: "black",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  pagerView: {
    flex: 1,
    width: "100%",
    // borderWidth: 1,
    // borderStyle: "solid",
    // borderColor: "blue",
    marginBottom: -40,
  },
  dotNavContainer: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
    backgroundColor: "white",
    alignSelf: "center",
    borderRadius: 100,
    ...shadows.cardDrop,
  },
  circle: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  negotiationBubbleContainer: {
    width: "100%",
    alignItems: "center",
    marginVertical: 12,
  },
});
