import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';

export default function GreyButton({ text }) {
  // export default function GreyButton({text, onPress}){
  return (
    // <></>
    // <TouchableOpacity onPress = {onPress}>
    <TouchableOpacity>
      <View style={styles.button}>
        <Text style={styles.buttonText}> {"Contact Seller"}</Text>

      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    width: 230,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: "3%",
    borderRadius: 25,
    shadowOffset: { width: 3, height: 3 },
    shadowColor: "grey",
    shadowOpacity: 0.5
  },

  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 16,
    textAlign: 'center'
  }
})