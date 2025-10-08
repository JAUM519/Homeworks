import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase/config";
import { register } from "./authSlice";
import { login, logout, checkingCredentials } from "./authSlice";

export const registerAuth = ( email, password ) => {
    return async ( dispatch ) => {
        const response = await createUserWithEmailAndPassword( auth, email, password );
        if (response) {

            await updateProfile( auth.currentUser, { 
                displayName: "Jorge",
                photoURL: ""
            });

            const { email } = response.user;
            dispatch( register({ email }) );
        } else {
            throw new Error("Login Failed");
        }
    }
};

export const startLoginWithEmailPassword = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    try {
      const resp = await signInWithEmailAndPassword(auth, email, password);
      const user = resp.user;
      dispatch(
        login({
          uid: user.uid,
          displayName: user.displayName ?? null,
          email: user.email ?? null,
          photoURL: user.photoURL ?? null,
        })
      );
    } catch (error) {
      dispatch(logout({ errorMessage: error?.message ?? "Error de autenticación" }));
    }
  };
};