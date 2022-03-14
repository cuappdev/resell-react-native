import * as ActionTypes from './settingsScreenActionTypes';

export const setPauseAllNotifications = (newSetting: boolean) => ({
    type: ActionTypes.SET_PAUSE_ALL_NOTIFICATIONS,
    payload: { newSetting }
})

export const setChatNotifications = (newSetting: boolean) => ({
    type: ActionTypes.SET_CHAT_NOTIFICATIONS,
    payload: { newSetting }
})

export const setNewListings = (newSetting: boolean) => ({
    type: ActionTypes.SET_NEW_LISTINGS,
    payload: { newSetting }
})