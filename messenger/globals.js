import { DarkTheme } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { DARK_THEME, LIGHT_THEME } from "./store/settings/settingTypes";


class global_styles {
  static isLight(theme) {
    return theme === LIGHT_THEME
  }

  static _themes(theme) {
    let light = global_styles.isLight(theme)
    return StyleSheet.create({
      background: {
        backgroundColor: light ? '#EEE' : '#AAA'
      },
      title: {
        color: light ? '#333' : '#FFF',
        fontSize: 30,
      },
      subheader: {
        color: light ? '#333' : '#FFF',
        fontSize: 15,
      },
      details: {
        color: light ? '#333' : '#FFF',
        fontSize: 20,
        padding: 2.5
      }
    });
  }

  static _layout() {
    return StyleSheet.create({
      container: {
        flex: 1,
        alignItems: 'center',
      }
    });
  }


  static title(user) {
    return [global_styles._themes(user).title, global_styles._themes(user).background]
  }
  static subheader(user) {
    return [global_styles._themes(user).subheader, global_styles._themes(user).background]
  }
  static details(user) {
    return [global_styles._themes(user).details, global_styles._themes(user).background]
  }
  static container(user) {
    return [global_styles._themes(user).background, global_styles._layout(user).container]
  }
}

export default global_styles;
