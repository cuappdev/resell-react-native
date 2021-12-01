import * as React from "react";
import {
  StyleSheet,
  Image,
  FlatList,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { LogBox } from "react-native";
LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs();

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";

import { ScrollView } from "react-native-gesture-handler";
import ProductCard from "../components/ProductCard";
import { FontAwesome5 } from "@expo/vector-icons";
import Button from "../components/Button";
import { useState, useEffect } from "react";

export default function TabThreeScreen() {
  const renderButton = ({ item }) => {
    return (
      <Button
        title={item.title}
        id={item.id}
        count={count}
        setCount={setCount}
        alwaysColor={true}
      />
    );
  };
  const [count, setCount] = useState(0);

  return (
    <View
      style={{
        backgroundColor: "#F9F9F9",
        height: "100%",
        padding: 0,
        paddingBottom: 75,
      }}
    >
      <SafeAreaView style={styles.filter}>
        <FlatList
          data={FILTER}
          renderItem={renderButton}
          keyExtractor={(item) => item.id.toString(10)}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={true}
          horizontal={true}
        />

        <SafeAreaView style={{ flexDirection: "row" }}>
          <TextInput style={styles.input} />
          <SafeAreaView style={{ margin: 15 }}>
            <FontAwesome5 name="arrow-circle-up" size={30} color="#878787" />
          </SafeAreaView>
        </SafeAreaView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    flexDirection: "row",
    flex: 1,
    backgroundColor: "transparent",
    marginVertical: 8,
    marginHorizontal: 8,
  },
  filter: {
    marginStart: 12,
    marginTop: "auto",
    marginBottom: 20,
  },

  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingBottom: 75,
  },
  input: {
    width: "80%",
    height: 40,
    margin: 12,
    padding: 10,
    opacity: 0.6,
    backgroundColor: "#dedede",
    borderRadius: 100,
  },
});
const FILTER = [
  {
    id: 0,
    title: "Negotiate",
  },
  {
    id: 1,
    title: "Send Avaliablity",
  },
  { id: 2, title: "Pay with Venmo" },
  { id: 3, title: "Ask For Refund" },
];
