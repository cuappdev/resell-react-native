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

export function ButtonBanner({ count, setCount, data }) {
  /**
   *
   * @param {state} count - state passed in representing which button is getting clicked, should be less than equal to len(data) -1
   * @param {setState} setCount - setState method passed in to change the current count when new button get clicked
   * @param {list} data - a list of button names
   * @returns a horizontally scrollable button banner
   */
  const renderButton = ({ item }) => {
    return (
      <Button
        title={item.title}
        id={item.id}
        count={count}
        setCount={setCount}
      />
    );
  };

  return (
    <SafeAreaView style={styles.filter}>
      <FlatList
        data={data}
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
  filter: { marginStart: 12, marginTop: 9, marginBottom: 12 },
});

export default ButtonBanner;
