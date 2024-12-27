// src/store/notificationSlice.js
import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notifications",
  initialState: {
    list: [], // Lista de notificaciones
  },
  reducers: {
    addNotification: (state, action) => {
      state.list.push(action.payload);
    },
    clearNotifications: (state) => {
      state.list = [];
    },
  },
});

export const { addNotification, clearNotifications } = notificationSlice.actions;

export default notificationSlice.reducer;
