import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../interface/userInterface";

type State = {
  user: User | null | undefined;
  token?: string | null | undefined;
};
const initialState: State = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.token = action?.payload?.data?.token;
      state.user = action?.payload?.data?.user;
    },
    userLoggedOut: (state) => {
      state.token = undefined;
      state.user = undefined;
    },
  },
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;
export default authSlice.reducer;
