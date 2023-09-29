import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { token: null, user: null },
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken, user } = action.payload;
      console.log("1", accessToken, user);
      state.token = accessToken;
      state.user = user;
      console.log("2", state);
    },
    // logOut: (state, action) => {
    //   state.token = null;
    // },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = (state) => state.auth.token;
export const selectCurrentUser = (state) => state.auth.user;
