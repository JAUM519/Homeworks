import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "checking", // 'checking' | 'authenticated' | 'not-authenticated'
  uid: null,
  email: null,
  displayName: null,
  errorMessage: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    checkingCredentials: (s) => { s.status = "checking"; s.errorMessage = null; },
    login: (s, { payload }) => {
      s.status = "authenticated";
      s.uid = payload.uid;
      s.email = payload.email || null;
      s.displayName = payload.displayName || null;
      s.errorMessage = null;
    },
    logout: (s, { payload }) => {
      s.status = "not-authenticated";
      s.uid = null; s.email = null; s.displayName = null;
      s.errorMessage = payload?.errorMessage || null;
    },
  },
});

export const { checkingCredentials, login, logout } = authSlice.actions;
export default authSlice.reducer;
