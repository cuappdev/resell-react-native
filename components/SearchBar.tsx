import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { View, StyleSheet, TextInput, TouchableOpacity } from "react-native";

export default function SearchBar({ back, setSearchResult }) {
  return (
    <View style={styles.general}>
      <View style={styles.container}>
        <View style={styles.searchBar__clicked}>
          <TextInput
            style={styles.input}
            placeholder="What are you looking for"
            //   onChangeText={Do something to searchresult and pass it back to home page}
          />
        </View>
      </View>
      <TouchableOpacity style={{ marginStart: 15 }} onPress={back}>
        <AntDesign name="close" size={25} color="#707070" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    marginLeft: 20,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    width: "85%",
  },
  general: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  searchBar__clicked: {
    padding: 10,
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#F4F4F4",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  input: {
    fontSize: 16,
    width: "90%",
  },
});
