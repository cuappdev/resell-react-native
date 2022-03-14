import * as ActionTypes from '../actions/settingsScreenActionTypes';

const initialState = {
  pauseAllNotifications: false,
  chatNotifications: true,
  newListings: true,
};

const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_PAUSE_ALL_NOTIFICATIONS:
      switch(action.payload.newSetting) {
        case true:
          return {
            ...state,
            pauseAllNotifications: true,
            chatNotifications: false,
            newListings: false,
          };
        case false:
          return {
            ...state,
            pauseAllNotifications: false,
            chatNotifications: true,
            newListings: true,
          };
        default:
          return state;
      }
    case ActionTypes.SET_CHAT_NOTIFICATIONS:
      return {
        ...state,
        chatNotifications: state.pauseAllNotifications ? false : action.payload.newSetting,
      };
    case ActionTypes.SET_NEW_LISTINGS:
      return {
        ...state,
        newListings: state.pauseAllNotifications ? false : action.payload.newSetting,
      };
    default:
      return state;
  }
}

export default settingsReducer;