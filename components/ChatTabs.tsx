import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

/**
 *
 * @param {state} count - state passed in representing which button is getting clicked, should be less than equal to len(data) -1
 * @param {setState} setCount - setState method passed in to change the current count when new button get clicked
 * @param {int} id - presented current button id, starting from 0, comparing with count to determine whether is clicked
 * @param {string} title - content on the button
 * @returns a button with linear gradient outline, the "All" button will always be initially marked as clicked
 */
function ChatTbas({ isPurchase, setIsPurchase, purchaseUnread, offerUnread }) {
  return (
    <View style={{ flexDirection: "row", marginStart: 24 }}>
      {isPurchase ? (
        <LinearGradient
          colors={["#DF9856", "#DE6CD3", "#AD68E3"]}
          style={styles.highLight}
          start={{ x: 0.9, y: 0 }}
          end={{ x: 0.1, y: 1 }}
        >
          <TouchableOpacity
            style={styles.appButtonContainer}
            onPress={() => setIsPurchase(true)}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={styles.appButtonText}>Purchases</Text>
              {purchaseUnread !== 0 && (
                <View
                  style={{
                    width: 20,
                    height: 16,
                    backgroundColor: "#FF0000",
                    borderRadius: 8,
                    alignItems: "center",
                    justifyContent: "center",
                    marginStart: 12,
                  }}
                >
                  <Text style={{ color: "#FFFFFF" }}>{purchaseUnread}</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        </LinearGradient>
      ) : (
        <TouchableOpacity
          style={styles.appUnclickedContainer}
          onPress={() => setIsPurchase(true)}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={styles.appUnclickText}>Purchases</Text>
            {purchaseUnread !== 0 && (
              <View
                style={{
                  width: purchaseUnread > 9 ? 26 : 20,
                  height: 16,
                  backgroundColor: "#FF0000",
                  borderRadius: 8,
                  alignItems: "center",
                  justifyContent: "center",
                  marginStart: 12,
                }}
              >
                <Text style={{ color: "#FFFFFF" }}>
                  {purchaseUnread > 9 ? "9+" : purchaseUnread}
                </Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      )}
      {!isPurchase ? (
        <LinearGradient
          colors={["#DF9856", "#DE6CD3", "#AD68E3"]}
          style={styles.highLight}
          start={{ x: 0.9, y: 0 }}
          end={{ x: 0.1, y: 1 }}
        >
          <TouchableOpacity
            style={styles.appButtonContainer}
            onPress={() => setIsPurchase(false)}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={styles.appUnclickText}>Offers</Text>
              {offerUnread !== 0 && (
                <View
                  style={{
                    width: offerUnread > 9 ? 26 : 20,
                    height: 16,
                    backgroundColor: "#FF0000",
                    borderRadius: 8,
                    alignItems: "center",
                    justifyContent: "center",
                    marginStart: 12,
                  }}
                >
                  <Text style={{ color: "#FFFFFF" }}>
                    {offerUnread > 9 ? "9+" : offerUnread}
                  </Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        </LinearGradient>
      ) : (
        <TouchableOpacity
          style={styles.appUnclickedContainer}
          onPress={() => setIsPurchase(false)}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={styles.appUnclickText}>Offers</Text>
            {offerUnread !== 0 && (
              <View
                style={{
                  width: 20,
                  height: 16,
                  backgroundColor: "#FF0000",
                  borderRadius: 8,
                  alignItems: "center",
                  justifyContent: "center",
                  marginStart: 12,
                }}
              >
                <Text style={{ color: "#FFFFFF" }}>{offerUnread}</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  appButtonContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 100,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginVertical: 2,
    marginHorizontal: 2,
    borderWidth: 1,
    borderColor: "#D3D3D3",
    minWidth: 60,
  },
  appUnclickedContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 100,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginVertical: 6,
    marginHorizontal: 6,
    borderWidth: 1,

    borderColor: "#ffffff",
    minWidth: 60,
  },
  appUnclickText: {
    fontFamily: "Rubik-Medium",
    fontWeight: "bold",
    fontSize: 15,
    lineHeight: 18,
    color: "#4D4D4D",
  },
  appButtonText: {
    fontFamily: "Rubik-Medium",
    fontWeight: "bold",
    fontSize: 15,
    lineHeight: 18,
    color: "#4D4D4D",
    alignSelf: "center",
  },
  highLight: {
    borderRadius: 23,
    marginVertical: 5,
    marginHorizontal: 5,
    elevation: 8,
  },
});
export default ChatTbas;
