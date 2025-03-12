import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  data: null,
  assignments: null,
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
    handleAssignments: (state, action) => {
      state.assignments = action.payload;
    },
  },
});

export const {
  handleChangeEmail,
  handleChangePassword,
  handleData,
  handleAssignments,
  assignments,
  data,
  firstName,
  lastName,
  email,
  password,
} = createUserSlice.actions;

export default createUserSlice.reducer;
