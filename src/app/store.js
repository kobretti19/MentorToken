import { configureStore } from "@reduxjs/toolkit";
import loginClickedReducer from "./checkLogin";
import authReducer from "./AuthProvider";

export default configureStore({
  reducer: {
    loginClickedController: loginClickedReducer,
    authController: authReducer,
  },
});
