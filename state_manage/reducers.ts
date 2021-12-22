import * as ActionTypes from './actions/actionTypes';
import { combineReducers } from 'redux';

const initialState = {
    profile: {
        'name': 'Sergio Diaz',
        'bio': 'Junior in the college of engineering. Selling a bunch of textbooks and clothes I don\'t need.'
    }
}

const profileReducer = (state = initialState, action) => {
    console.log(state)
    switch (action.type) {
        case ActionTypes.SET_NAME:
            return {
                ...state,
                'name': action.name
            }
        case ActionTypes.SET_BIO:
            return {
                ...state,
                'bio': action.bio
            }
        default: 
            return state.profile
    }
}

const globalReducer = combineReducers({
    'profile': profileReducer
})

export type RootState = typeof initialState;

export default globalReducer;
