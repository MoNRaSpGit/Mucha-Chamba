import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    id: null,
    username: null,
    email: null,
    address: null,
    role: null,
  },
  reducers: {
    setUser(state, action) {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.address = action.payload.address;
      state.role = action.payload.role;
      console.log("Usuario guardado en el store:", action.payload); // Verificar datos en consola
    },
    clearUser(state) {
      state.id = null;
      state.username = null;
      state.email = null;
      state.address = null;
      state.role = null;
      console.log("Datos del usuario eliminados del store."); // Confirmar limpieza en consola
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
