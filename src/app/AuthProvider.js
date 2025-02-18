import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  password: "",
};

export const authSlice = createSlice({
  name: "authController",
  initialState,
  reducers: {
    handleUserName: (state, action) => {
      state.username = action.payload;
    },
    handlePassword: (state, action) => {
      state.password = action.payload;
    },
  },
});

export const { username, password, handleUserName, handlePassword } =
  authSlice.actions;

export default authSlice.reducer;
