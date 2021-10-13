import React, { useState } from "react"
import { Component, Fragment } from "react";
import { View, Text, StyleSheet, Switch, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import global_styles from "../globals";
import { set_theme } from "../store/settings/settingActions";
import { DARK_THEME, LIGHT_THEME } from "../store/settings/settingTypes";
const SettingsPage = () => {

  const dispatch = useDispatch()
  const change_theme = (theme) => dispatch(set_theme(theme))

  const profile = useSelector(state => {
    return state.profile
  })
  const theme = useSelector(state => {
    return state.profile.current_theme
  })

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    setIsEnabled(
      previousState => !previousState
    )
    change_theme(isEnabled ? LIGHT_THEME : DARK_THEME)
    console.log(theme)
  }

  return (
    <View style={[global_styles.container(theme), styles.container]}>
      <Text style={[global_styles.title(theme), styles.title]}>{profile.handle}</Text>
      <Text style={global_styles.details(theme)}>{profile.name}</Text>
      <Image source={require("../assets/derp.jpg")} style={styles.profile_image} />
      <View style={styles.settings_switch}>
        <Text style={[global_styles.details(theme), styles.settings_detail]}>Theme</Text>
        <Switch
          trackColor={{ true: "#ADA", false: "#767577" }}
          thumbColor={isEnabled ? "#FFF" : "#FFF"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    padding: 10
  },
  profile_image: {
    marginBottom: 10,
    marginTop: 10,
    width: 200,
    height: 200,
  },
  settings_switch: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  settings_detail: {
    paddingRight: 100
  }
});

export default SettingsPage;