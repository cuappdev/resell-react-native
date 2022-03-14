import { combineReducers } from 'redux';
import profileScreenReducer from './profileScreenReducer'
import settingsReducer from './settingsReducer';

export default combineReducers({
    profile: profileScreenReducer,
    settings: settingsReducer,
})
