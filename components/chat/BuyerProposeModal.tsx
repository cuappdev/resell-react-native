import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import moment from "moment";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";
import { auth, historyRef } from "../../config/firebase";
import { fonts } from "../../globalStyle/globalFont";
import PurpleButton from "../PurpleButton";
export default function BuyerProposeModal({
  visible,
  setVisible,
  setAvailabilityVisible,
  startDate,
  sellerEmail,
  post,
  setStartDate,
}: {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setAvailabilityVisible: React.Dispatch<React.SetStateAction<boolean>>;
  startDate: string;
  sellerEmail: string;
  post: any;
  setStartDate: React.Dispatch<React.SetStateAction<string>>;
}) {
  const momentDate = moment(startDate, "MMMM Do YYYY, h:mm a");
  const startText = moment(momentDate).format("dddd, MMMM Do · h:mm");
  const endDate = moment(momentDate).add(30, "m").format("h:mm a");
  const dateText = startText + "-" + endDate;
  console.log(`visible: ${visible}`);

  const [shouldOpenAvailability, setShouldOpenAvailability] = useState(false);

  const [proposeLoading, setProposeLoading] = useState(false);
  return (
    <Modal //Confirm Meeting details
      isVisible={visible}
      backdropOpacity={0.2}
      onBackdropPress={() => {
        setVisible(false);
        setStartDate(null);
        setShouldOpenAvailability(true);
      }}
      style={{ justifyContent: "flex-end", margin: 0 }}
      onModalHide={() => {
        if (shouldOpenAvailability) {
          setAvailabilityVisible(true);
        }
      }}
    >
      <View style={styles.slideUp}>
        <Text style={[fonts.pageHeading3, { marginTop: "14%" }]}>
          Meeting Details
        </Text>
        <View style={{ marginTop: 24 }}>
          <Text style={fonts.body1}>
            You are proposing the following meeting:
          </Text>

          <Text
            style={[fonts.pageHeading3, { marginTop: 24, marginBottom: 4 }]}
          >
            Time
          </Text>
          <Text style={fonts.body1}>{dateText}</Text>
        </View>
        <View style={{ position: "absolute", bottom: "22%" }}>
          <PurpleButton
            isLoading={proposeLoading}
            text={"Propose Meeting"}
            onPress={async () => {
              setProposeLoading(true);
              // update the interaction history to include the time proposal
              const interactionHistoryRef = doc(
                collection(doc(historyRef, sellerEmail), "buyers"),
                auth.currentUser.email
              );
              const updateData = {
                recentMessage: "Proposed a Time",
                recentSender: auth?.currentUser?.email,
                proposedTime: startDate,
                proposedViewed: false,
                viewed: false,
              };
              const interactionHistoryDoc = await getDoc(interactionHistoryRef);
              if (interactionHistoryDoc.exists()) {
                await updateDoc(interactionHistoryRef, updateData);
              } else {
                await setDoc(interactionHistoryRef, {
                  item: post,
                  name: auth?.currentUser?.displayName,
                  image: auth?.currentUser?.photoURL,
                  ...updateData,
                });
              }
              setShouldOpenAvailability(false);
              setProposeLoading(false);
              setVisible(false);
            }}
            enabled={true}
          />
        </View>
        <Text
          style={[fonts.Title2, { position: "absolute", bottom: "11%" }]}
          onPress={() => {
            setStartDate(null);
            setShouldOpenAvailability(true);
            setVisible(false);
          }}
        >
          Cancel
        </Text>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  slideUp: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    height: 400,
    backgroundColor: "#ffffff",
    width: "100%",
    marginHorizontal: 0,
    alignItems: "center",
    paddingLeft: "14%",
    paddingRight: "14%",
  },
});
