import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dashboardMentor: false,
  myStats: false,
  jobFeed: false,
};

const sidebarSlice = createSlice({
  name: "sidebarController",
  initialState,
  reducers: {
    handleDashboardMentor: (state, action) => {
      state.myStats = false;
      state.jobFeed = false;
      state.dashboardMentor = action.payload;
    },
    handlemyStatsMentor: (state, action) => {
      state.dashboardMentor = false;
      state.jobFeed = false;
      state.myStats = action.payload;
    },
    handlejobFeedMentor: (state, action) => {
      state.dashboardMentor = false;
      state.myStats = false;
      state.jobFeed = action.payload;
    },
  },
});

export const {
  handleDashboardMentor,
  handlemyStatsMentor,
  handlejobFeedMentor,
  dashboardMentor,
  myStats,
  jobFeed,
} = sidebarSlice.actions;

export default sidebarSlice.reducer;
