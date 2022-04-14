import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

export default function HistoryList({ searchHistory, searchSubmit }) {
  /**
   *
   * @param {state} count - state passed in representing which button is getting clicked, should be less than equal to len(data) -1
   * @param {setState} setCount - setState method passed in to change the current count when new button get clicked
   * @param {list} data - a list of button names
   * @returns a horizontally scrollable button banner
   */
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.outer} onPress={() => searchSubmit(item)}>
      <View>
        <Text style={styles.text}>{item}</Text>
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
  text: { color: "#707070", fontSize: 19, fontFamily: "Rubik-Regular" },
});
