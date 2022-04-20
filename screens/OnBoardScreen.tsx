import * as React from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, Text, View, Image, Platform, TextInput, ScrollView } from 'react-native';
import PurpleButton from "../components/PurpleButton";
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { menuBarTop } from '../constants/Layout';

import { IconButton, Colors } from 'react-native-paper';
import { black } from 'react-native-paper/lib/typescript/styles/colors';

export default function OnBoardScreen({ navigation }) {

  // HOW DO U DEFINE LIKE THE NEW HOME??
  const toVenmo = () => {
    navigation.navigate("Venmo");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>
        Set Up Your Profile
      </Text>
      <Image
        style={styles.profilePic}
        source={require('../assets/images/empty_profile.png')}
      />
      <Text style={styles.username}>
        Username*
      </Text>
      <TextInput
        style={styles.username_input}
        placeholderTextColor={"#707070"}
      />
      <Text style={styles.bio}>
        Bio
      </Text>

      {/* this doesn't work */}
      {/* <TextInput multiline={true} style={styles.bio_input} placeholderTextColor={"#707070"} /> */}
      <TextInput
        style={styles.bio_input}
        placeholderTextColor={"#707070"}
      />
      <View style={styles.purpleButton}>
        <TouchableOpacity style={{ marginStart: 15 }} onPress={toVenmo}>
          <PurpleButton text={"Continue"} />

        </TouchableOpacity>
      </View>

      {/* how do u click the purple button and get the next screen to appear */}
      {/* onPress={() => {
        navigation.navigate("LinkVenmoScreen")
      }; */}



    </View>
  )
}


const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  container: {
    position: 'absolute',
    top: menuBarTop,
    left: 20,
    right: 20,
    alignItems: 'center',
    // possubly remove this if all the text is center
  },
  titleText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 18,
    marginTop: 20
  },
  profilePic: {
    height: 132,
    width: 132,
    marginTop: 40
  },
  username: {
    marginTop: 30,
    marginRight: 260,
    fontWeight: 'bold'
    // position: "absolute"
  },
  username_input: {
    backgroundColor: "#F4F4F4",
    width: "100%",
    borderRadius: 15,
    height: 40,
  },
  bio: {
    marginTop: 30,
    marginRight: 320,
    fontWeight: 'bold'
    // position: "absolute"
  },
  bio_input: {
    backgroundColor: "#F4F4F4",
    width: "100%",
    borderRadius: 15,
    height: 40,
  },
  purpleButton: {
    // position: "absolute",
    bottom: 100,
    alignItems: "center",
    width: "100 %",
    zIndex: 10,
    height: 170,
    backgroundColor: "white",
    marginTop: 350
  },


});



