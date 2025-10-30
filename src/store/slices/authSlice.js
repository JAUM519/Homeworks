import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { auth, googleProvider } from '../../firebase/config'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth'

// Thunks
export const registerWithEmail = createAsyncThunk(
  'auth/registerWithEmail',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password)
      if (name) await updateProfile(user, { displayName: name })
      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName ?? name ?? '',
        photoURL: user.photoURL ?? null,
      }
    } catch (e) { return rejectWithValue(e.message) }
  }
)

export const loginWithEmail = createAsyncThunk(
  'auth/loginWithEmail',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password)
      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName ?? '',
        photoURL: user.photoURL ?? null,
      }
    } catch (e) { return rejectWithValue(e.message) }
  }
)

export const loginWithGoogle = createAsyncThunk(
  'auth/loginWithGoogle',
  async (_, { rejectWithValue }) => {
    try {
      const { user } = await signInWithPopup(auth, googleProvider)
      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName ?? '',
        photoURL: user.photoURL ?? null,
      }
    } catch (e) { return rejectWithValue(e.message) }
  }
)

export const logoutFirebase = createAsyncThunk('auth/logout', async () => {
  await signOut(auth)
  return true
})

// Slice
const initialState = {
  status: 'checking',
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthenticated: (state, { payload }) => {
      state.status = 'authenticated'
      state.uid = payload.uid
      state.email = payload.email
      state.displayName = payload.displayName ?? ''
      state.photoURL = payload.photoURL ?? null
      state.errorMessage = null
    },
    setNotAuthenticated: (state) => {
      state.status = 'not-authenticated'
      state.uid = null
      state.email = null
      state.displayName = null
      state.photoURL = null
      state.errorMessage = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerWithEmail.fulfilled, (s, { payload }) => {
        s.status = 'authenticated'
        Object.assign(s, payload)
        s.errorMessage = null
      })
      .addCase(registerWithEmail.rejected, (s, a) => {
        s.status = 'not-authenticated'
        s.errorMessage = a.payload ?? 'Register error'
      })
      .addCase(loginWithEmail.fulfilled, (s, { payload }) => {
        s.status = 'authenticated'
        Object.assign(s, payload)
        s.errorMessage = null
      })
      .addCase(loginWithEmail.rejected, (s, a) => {
        s.status = 'not-authenticated'
        s.errorMessage = a.payload ?? 'Login error'
      })
      .addCase(loginWithGoogle.fulfilled, (s, { payload }) => {
        s.status = 'authenticated'
        Object.assign(s, payload)
        s.errorMessage = null
      })
      .addCase(loginWithGoogle.rejected, (s, a) => {
        s.status = 'not-authenticated'
        s.errorMessage = a.payload ?? 'Google login error'
      })
      .addCase(logoutFirebase.fulfilled, (s) => {
        s.status = 'not-authenticated'
        s.uid = s.email = s.displayName = s.photoURL = null
        s.errorMessage = null
      })
  },
})

export const { setAuthenticated, setNotAuthenticated } = authSlice.actions
export default authSlice.reducer
