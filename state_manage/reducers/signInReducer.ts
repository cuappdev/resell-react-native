import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export const SignInSlice = createSlice({
  name: "signedIn",
  initialState: { signedIn: false, accessToken: "" },
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.signedIn = true;
      state.accessToken = action.payload;
      return state;
    },
    logout: (state, action: PayloadAction) => {
      state.signedIn = false;
      state.accessToken = "";

      return state;
    },
  },
});
export const signedInState = (state: RootState) => state;

export const { login, logout } = SignInSlice.actions;
export default SignInSlice.reducer;
