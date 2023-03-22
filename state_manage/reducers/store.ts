import { configureStore } from "@reduxjs/toolkit";
import {
  useSelector as rawUseSelector,
  TypedUseSelectorHook,
} from "react-redux";
import { combineReducers } from "redux";
import settingsReducer from "./settingsReducer";
import signInReducer from "./signInReducer";
import userInfoReducer from "./userInfoReducer";
export const store = configureStore({
  reducer: {
    user: userInfoReducer,
    settings: settingsReducer,
    signIn: signInReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useSelector: TypedUseSelectorHook<RootState> = rawUseSelector;
