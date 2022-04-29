// this is the general layout for the button that allows users to contact seller
// this is actually purple in color ;)
import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';

export default function GreyButton({ text }) {
  return (
    <TouchableOpacity>
      <View style={styles.button}>
        <Text style={styles.buttonText}> {"Contact Seller"}</Text>

      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#9E70F6",
    padding: "3%",
    paddingRight: 40,
    paddingLeft: 40,
    borderRadius: 30,
    shadowOffset: { width: 3, height: 3 },
  },

  buttonText: {
    color: 'white',
    fontFamily: 'Rubik-Medium',
    fontSize: 16,
    textAlign: 'center'
  }
})