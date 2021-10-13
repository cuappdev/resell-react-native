import { DARK_THEME, SET_THEME } from "./settingTypes";

const initial_state = {
  profile: {
    "name": "Noah",
    "handle": "Kelkamon",
    "profile_img": "",
    "current_theme": DARK_THEME,
  },
}

const settings_reducer = (state = initial_state, action) => {
  console.log(state)
  switch (action.type) {
    case SET_THEME:
      return {
        ...state,
        ["profile"]: {
          ...state.profile,
          ["current_theme"]: action.payload
        }
      }
    default:
      return state
  }
}

export default settings_reducer;