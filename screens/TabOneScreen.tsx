import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { FlatList, SafeAreaView, StatusBar, TouchableOpacity } from "react-native";
import { useState } from 'react'
import { ScreenContainer } from 'react-native-screens';
import { ScrollView } from 'react-native-gesture-handler';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#ECECEC" : "#ECECEC";
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
        numColumns={2}
        
      />
    
    </SafeAreaView>
  );
}

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "                                                                                                                                          ",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            ",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    ",
  },
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abba",
    title: "                                                                                                                                          ",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e292",
    title: "                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    ",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa963",
    title: "                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            ",
  },
];

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>{item.title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  outer:{
    flexDirection:'column'
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor:"#ffffff",
    padding:8
  },
  item: {
    paddingVertical:20,
    paddingHorizontal:50,
    marginVertical: 8,
    marginHorizontal: 8,
    width:"50%"
  },
  title: {
    fontSize: 32,
  },
});