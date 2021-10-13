import { LIGHT_THEME, DARK_THEME, APPDEV_THEME, SET_THEME } from "./settingTypes";

export const set_theme = (theme) => ({
  type: SET_THEME,
  payload: theme
})