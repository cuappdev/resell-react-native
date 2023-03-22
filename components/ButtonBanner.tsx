import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Button from "../components/Button";

import { LinearGradient } from "expo-linear-gradient";
import { useState, useEffect } from "react";
import Venmo from "../assets/svg-components/venmo";

export function ButtonBanner(props) {
  /**
   *
   * @param {state} count - state passed in representing which button is getting clicked, should be less than equal to len(data) -1
   * @param {setState} setCount - setState method passed in to change the current count when new button get clicked
   * @param {list} data - a list of button names
   * @returns a horizontally scrollable button banner
   */
  const renderButton = ({ item }) => {
    if (item.title !== "Send Availablity" || !props.isBuyer) {
      return (
        <Button
          title={item.title}
          id={item.id}
          count={props.count}
          setCount={props.setCount}
          modalVisible={props.modalVisible}
          setModalVisible={props.setModalVisible}
          availabilityVisible={props.availabilityVisible}
          setAvailabilityVisible={props.setAvailabilityVisible}
          setIsBubble={props.setIsBubble}
          alwaysColor={props.alwaysColor}
          OthersEmail={props.OthersEmail}
        />
      );
    }
  };

  return (
    <SafeAreaView style={styles.filter}>
      <FlatList
        data={props.data}
        renderItem={renderButton}
        keyExtractor={(item) => item.id.toString(10)}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={true}
        horizontal={true}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  filter: { marginStart: 12, marginTop: 9, marginBottom: 6 },
});

export default ButtonBanner;
