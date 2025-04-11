import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchUser: null,
};

export const createSearchSlice = createSlice({
  name: "searchQuery",
  initialState,
  reducers: {
    handleSearchUser: (state, action) => {
      state.searchUser = action.payload;
    },
    clearSearch: (state) => {
      state.searchUser = null;
    },
  },
});

export const { handleSearchUser, clearSearch } = createSearchSlice.actions;

export default createSearchSlice.reducer;
