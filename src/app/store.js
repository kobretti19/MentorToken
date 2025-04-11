import { configureStore } from "@reduxjs/toolkit";
import loginClickedReducer from "./checkLogin";
import createUserReducer from "./AuthProvider";
import sidebarReducer from "./sideBar";
import createSearchReducer from "./searchQuery";

export default configureStore({
  reducer: {
    loginClickedController: loginClickedReducer,
    createUser: createUserReducer,
    sidebarController: sidebarReducer,
    searchQuery: createSearchReducer,
  },
});
