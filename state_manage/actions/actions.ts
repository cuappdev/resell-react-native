import * as ActionTypes from './actionTypes';

export const setName = (name: string) => ({
    type: ActionTypes.SET_NAME,
    name
})

export const setBio = (bio: string) => ({
    type: ActionTypes.SET_BIO,
    bio
})