import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

export default function SearchBar({ setSearchPhrase }) {
  return (
    <View style={styles.general}>
      <View style={styles.container}>
        <View
          style={
            styles.searchBar__clicked
          }
        >
          <TextInput
            style={styles.input}
            placeholder="What are you looking for"
            onChangeText={setSearchPhrase}
          />
        </View>
      </View>
      <TouchableOpacity style={{ marginStart: 15 }}>
        <AntDesign name="close" size={25} color="#707070" />
      </TouchableOpacity>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    marginLeft: 20,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    width: "60%",

  },
  general: {
    flexDirection: "row",
    marginTop: 60,
    alignItems: "center",
    width: "60%"
  },
  searchBar__clicked: {
    padding: 10,
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  input: {
    fontSize: 16,
    marginLeft: 10,
    width: "90%",
  },
});