import { combineReducers } from 'redux';
import profileScreenReducer from './profileScreenReducer'

export default combineReducers({
    profile: profileScreenReducer
})
