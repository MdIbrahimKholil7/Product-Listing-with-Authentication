import { createSlice } from "@reduxjs/toolkit";

type State = {
  user: any | null | undefined;
  token?: string | null | undefined;
};
const initialState: State = {
  user: {
    name: "",
    email: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      console.log(action.payload);
      state.token = action?.payload?.token;
      state.user = action?.payload?.data;
    },
    userLoggedOut: (state) => {
      state.token = undefined;
      state.user = undefined;
    },
  },
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;
export default authSlice.reducer;
