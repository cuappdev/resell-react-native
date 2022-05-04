import { combineReducers } from 'redux';
import profileScreenReducer from './profileScreenReducer'
import settingsReducer from './settingsReducer';
import signInReducer from './signInReducer';

export const   rootReducer = combineReducers({
    profile: profileScreenReducer,
    settings: settingsReducer,
    signIn:signInReducer
})
export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;