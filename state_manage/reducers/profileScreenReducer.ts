import * as ActionTypes from '../actions/profileScreenActionTypes';

const initialState = {
    profile: {
        name: 'Sergio Diaz',
        bio: 'Junior in the college of engineering. Selling a bunch of textbooks and clothes I don\'t need.'
    }
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.SET_NAME:
            return {
                ...state,
                name: action.payload
            }
        case ActionTypes.SET_BIO:
            return {
                ...state,
                bio: action.payload
            }
        default: 
            return state.profile
    }
}

export type RootState = typeof initialState;

export default profileReducer;
