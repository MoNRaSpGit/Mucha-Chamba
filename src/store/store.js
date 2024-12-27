// src/store/index.js
import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "../Slice/notificationSlice";
import userReducer from "../Slice/userSlice"; // Importar el slice de usuario

const store = configureStore({
  reducer: {
    notifications: notificationReducer,
    user: userReducer, // Agregar el reducer de usuario
  },
});

export default store;
