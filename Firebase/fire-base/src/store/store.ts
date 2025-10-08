import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/auth/authSlice";
import { auth } from "../firebase/config";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
    },
});