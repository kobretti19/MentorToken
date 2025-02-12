import { configureStore } from "@reduxjs/toolkit";
import loginClickedReducer from "./checkLogin";

export default configureStore({
  reducer: {
    loginClickedController: loginClickedReducer,
  },
});
