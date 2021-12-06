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
