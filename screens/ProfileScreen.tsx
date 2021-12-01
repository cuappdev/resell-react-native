import * as React from "react";
import { Feather } from "@expo/vector-icons";
import { pressedOpacity } from "../constants/Values";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "../components/Themed";
import { FlatList, SafeAreaView, StatusBar } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import ProductCard from "../components/ProductCard";

export default function ProfileScreen({ navigation }) {
  const renderItem = ({ item }) => {
    return (
      <ProductCard title={item.title} price={item.price} image={item.image} />
    );
  };
  return (
    <View style={styles.container}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.upperContainer}>
          <TouchableOpacity activeOpacity={pressedOpacity}>
            <ProfileScreenIcon name="search" color="black" size={24} />
          </TouchableOpacity>
          <View style={styles.profileTextContainer}>
            <View style={styles.profileBubble} />
          </View>
          <TouchableOpacity activeOpacity={pressedOpacity}>
            <ProfileScreenIcon name="settings" color="black" size={24} />
          </TouchableOpacity>
        </View>
        <View style={styles.profileTextContainer}>
          <Text style={styles.profileNameText}>Sergio Pablo Diaz</Text>
          <Text style={styles.profileBioText}>
            Junior in the college of engineering. Selling a bunch of textbooks
            and clothes I don't need.
          </Text>
        </View>
        <TouchableOpacity
          style={styles.plusButton}
          onPress={() => navigation.navigate("NewPost")}
        >
          <ProfileScreenIcon name="plus" color="black" size={36} />
        </TouchableOpacity>
        <SafeAreaView style={styles.outer}>
          <FlatList
            data={DATA}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={false}
          />
          <FlatList
            data={DATA1}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={false}
          />
        </SafeAreaView>
      </ScrollView>
    </View>
  );
}

function ProfileScreenIcon(props: {
  name: React.ComponentProps<typeof Feather>["name"];
  color: string;
  size: number;
}) {
  return <Feather size={props.size} {...props} />;
}
const DATA = [
  {
    id: "1",
    title: "Nike Air Force - Size 9.5",
    image: require("../assets/images/item2.png"),
    price: "$90.00",
  },
  {
    id: "2",
    title: "Brown Rotating Chair",
    image: require("../assets/images/item3.png"),
    price: "$52.00",
  },
  {
    id: "3",
    title: "Pants",
    image: require("../assets/images/Pants.png"),
    price: "$52.00",
  },
  {
    id: "4",
    title: "Nike Air Force - Size 9.5",
    image: require("../assets/images/item1.png"),
    price: "$90.00",
  },
  {
    id: "5",
    title: "Guitar",
    image: require("../assets/images/Guitar.png"),
    price: "$90.00",
  },
];
const DATA1 = [
  {
    id: "1",
    title: "Milk and Honey Paperback",
    image: require("../assets/images/item1.png"),
    price: "$16.00",
  },
  {
    id: "2",
    title: "Lamp",
    image: require("../assets/images/item4.png"),
    price: "$14.00",
  },
  {
    id: "3",
    title: "Nice Pair of Jeans",
    image: require("../assets/images/item5.png"),
    price: "$18.00",
  },
  {
    id: "4",
    title: "Clock",
    image: require("../assets/images/Clock.png"),
    price: "$14.00",
  },
  {
    id: "5",
    title: "White Shirt",
    image: require("../assets/images/WhiteT.png"),
    price: "$14.00",
  },
];

const styles = StyleSheet.create({
  outer: {
    flexDirection: "row",
    flex: 1,
    marginTop: 32,
    backgroundColor: "transparent",
    marginVertical: 8,
    marginHorizontal: 8,
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    padding: 18,
    paddingBottom: 75,
  },
  upperContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "stretch",
  },
  profileBubbleContainer: {
    flexGrow: 1,
  },
  profileBubble: {
    width: 89,
    height: 89,
    borderRadius: 50,
    backgroundColor: "#e0e0e0",
  },
  profileTextContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  profileNameText: {
    fontFamily: "Roboto-Bold",
    fontSize: 20,
    paddingTop: 12,
    paddingBottom: 9,
  },
  profileBioText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    maxWidth: "93%",
    textAlign: "center",
  },
  plusButton: {
    position: "absolute",
    right: 24,
    bottom: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    width: 60,
    height: 60,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
  },
});
