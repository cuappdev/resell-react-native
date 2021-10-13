import React from "react"
import { Component, Fragment } from "react";
import { View, Text } from "react-native"
import { useSelector } from "react-redux";
import global_styles from "../globals";

const ConversationsPage = () => {

  const theme = useSelector(state => {
    return state.profile.current_theme
  })

  return (
    <View style={global_styles.container(theme)}>
      <Text style={global_styles.title(theme)}>Hi</Text>
    </View>
  )
}

export default ConversationsPage;