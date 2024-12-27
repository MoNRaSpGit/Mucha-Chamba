// src/store/index.js
import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "../Slice/notificationSlice";

const store = configureStore({
  reducer: {
    notifications: notificationReducer,
  },
});

export default store;
