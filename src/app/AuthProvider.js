import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  data: null,
};

export const createUserSlice = createSlice({
  name: "createUser",
  initialState,
  reducers: {
    handleChangeEmail: (state, action) => {
      state.email = action.payload;
    },
    handleChangePassword: (state, action) => {
      state.password = action.payload;
    },
    handleData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { handleChangeEmail, handleChangePassword, handleData } =
  createUserSlice.actions;

export default createUserSlice.reducer;
