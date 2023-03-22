import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { fonts } from "../globalStyle/globalFont";

export default function HistoryList({ searchHistory, searchSubmit }) {
  /**
   *
   * @param {state} searchHistory - state passed in from search screen a list of search history
   * @param {state} searchSubmit - method that will update keyword and issearchsubmit in the search home screen, will also update the history list
   */
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.outer} onPress={() => searchSubmit(item)}>
      <View>
        <Text style={[styles.text, fonts.body1]}>{item}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={searchHistory}
      renderItem={renderItem}
      keyExtractor={(item) => item}
      keyboardShouldPersistTaps="always"
    />
  );
}
const styles = StyleSheet.create({
  outer: { marginStart: 24, marginTop: 9, marginBottom: 12, width: "auto" },
  text: { color: "#707070" },
});
