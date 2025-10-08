import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        status: "checking",
        uid: null,
        email: null,
        displayName: null,
        photoURL: null,
        errorMessage: null,
    },
    reducers: {
        register: (state, action) => {
            state.email = action.payload.email;
        },
        login: (state, action) => {
            state.status = "authenticated";
            state.uid = action.payload.uid ?? null;
            state.email = action.payload.email ?? null;
            state.displayName = action.payload.displayName ?? null;
            state.photoURL = action.payload.photoURL ?? null;
            state.errorMessage = null;
        },
        logout: (state, action) => {
            state.status = "not-authenticated";
            state.uid = null;
            state.email = null;
            state.displayName = null;
            state.photoURL = null;
            state.errorMessage = action?.payload?.errorMessage ?? null;
        },
        checkingCredentials: (state, action) => {
            state.status = "checking";
            state.errorMessage = null;
        }
    }
});

export const { register, login, logout, checkingCredentials } = authSlice.actions;
export default authSlice.reducer;