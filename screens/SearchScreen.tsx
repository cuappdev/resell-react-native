import * as React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import SearchBar from '../components/SearchBar';
import { AntDesign } from '@expo/vector-icons';

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 60,
    alignItems: "center"
  }
});

export default function SearchScreen({ }) {
  const search = () => { }
  return (
    <View>
      <View style={styles.container}>
        <SearchBar
          setSearchPhrase={search} />
        <TouchableOpacity style={{ marginStart: 15 }}>
          <AntDesign name="close" size={25} color="#707070" />
        </TouchableOpacity>
      </View>
    </View>
  )
}