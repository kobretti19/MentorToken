import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginClicked: false,
};

const loginClickedSlice = createSlice({
  name: "loginClickedController",
  initialState,
  reducers: {
    handleLoginClicked: (state, action) => {
      state.loginClicked = action.payload;
    },
  },
});

export const { loginClicked, handleLoginClicked } = loginClickedSlice.actions;

export default loginClickedSlice.reducer;
