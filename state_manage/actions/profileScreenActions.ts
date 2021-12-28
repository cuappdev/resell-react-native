import * as ActionTypes from './profileScreenActionTypes';

export const setName = (name: string) => ({
    type: ActionTypes.SET_NAME,
    payload: { name }
})

export const setBio = (bio: string) => ({
    type: ActionTypes.SET_BIO,
    payload: { bio }
})
