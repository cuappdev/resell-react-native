import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { SUser } from "../../data/struct";

export const userInfoSlice = createSlice({
  name: "UserInfo",
  initialState: {
    username: "",
    realname: "",
    bio: "",
    photoUrl: "",
  } as SUser,
  reducers: {
    save_user: (state, action: PayloadAction<SUser>) => {
      state.username = action.payload.username;
      state.realname = action.payload.realname;
      state.bio = action.payload.bio;
      state.photoUrl = action.payload.photoUrl;
    },
    update_username: (state, action: PayloadAction<SUser>) => {
      state.username = action.payload.username;
    },

    update_bio: (state, action: PayloadAction<SUser>) => {
      state.bio = action.payload.bio;
    },
    update_photoUrl: (state, action: PayloadAction<SUser>) => {
      state.photoUrl = action.payload.photoUrl;
    },

    clear_user: (state, action: PayloadAction<SUser>) => {
      state.username = "";
      state.realname = "";
      state.bio = "";
      state.photoUrl = "";
    },
  },
});

export const getUsername = (state: RootState) => (state.user as SUser).username;
export const {
  save_user,
  update_username,
  update_bio,
  update_photoUrl,
  clear_user,
} = userInfoSlice.actions;
export default userInfoSlice.reducer;
