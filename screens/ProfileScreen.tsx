import * as React from "react";
import { Feather } from "@expo/vector-icons";
import { pressedOpacity } from "../constants/Values";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "../components/Themed";
import { FlatList, SafeAreaView, StatusBar, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import ProductCard from "../components/ProductCard";
import { LogBox } from "react-native";
import { ProductList } from "../components/ProductList";
// LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
// LogBox.ignoreAllLogs();

// State imports
import { setBio, setName } from "../state_manage/actions/profileScreenActions";
import { useDispatch, useSelector } from "react-redux";

export default function ProfileScreen({ navigation }) {
  const dispatch = useDispatch();

  const changeName = (name: string) => dispatch(setName(name));
  const changeBio = (bio: string) => dispatch(setBio(bio));

  const name = useSelector((state: any) => {
    return state.profile.name;
  });

  const bio = useSelector((state: any) => {
    return state.profile.bio;
  });

  return (
    <View style={styles.container}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
      >
        <SafeAreaView>
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
            <Text style={styles.profileNameText}>{name}</Text>
            <Text style={styles.profileBioText}>{bio}</Text>
          </View>
          <TouchableOpacity
            style={styles.plusButton}
            onPress={() => navigation.navigate("NewPost")}
          >
            <ProfileScreenIcon name="plus" color="black" size={36} />
          </TouchableOpacity>
          <ProductList count={null} data={DATA} filter={null} />
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
    title: "Milk and Honey Paperback",
    image: require("../assets/images/item1.png"),
    price: "$16.00",
  },
  {
    id: "3",
    title: "Brown Rotating Chair",
    image: require("../assets/images/item3.png"),
    price: "$52.00",
  },
  {
    id: "4",
    title: "Lamp",
    image: require("../assets/images/item4.png"),
    price: "$14.00",
  },
  {
    id: "5",
    title: "Pants",
    image: require("../assets/images/Pants.png"),
    price: "$52.00",
  },
  {
    id: "6",
    title: "Nice Pair of Jeans",
    image: require("../assets/images/item5.png"),
    price: "$18.00",
  },
  {
    id: "7",
    title: "Nike Air Force - Size 9.5",
    image: require("../assets/images/item1.png"),
    price: "$90.00",
  },

  {
    id: "8",
    title: "Clock",
    image: require("../assets/images/Clock.png"),
    price: "$14.00",
  },
  {
    id: "9",
    title: "Guitar",
    image: require("../assets/images/Guitar.png"),
    price: "$90.00",
  },
  {
    id: "10",
    title: "White Shirt",
    image: require("../assets/images/WhiteT.png"),
    price: "$14.00",
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingBottom: 75,
  },
  upperContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "stretch",
    paddingHorizontal: 18,
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
    paddingHorizontal: 18,
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
