import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  notifications: [],
  queue: [], // mensajes pendientes por enviar (cola)
  inbox: [], // mensajes recibidos desde Firestore
};

const socialSlice = createSlice({
  name: "social",
  initialState,
  reducers: {
    setPosts: (s, { payload }) => { s.posts = payload || []; },
    setNotifications: (s, { payload }) => { s.notifications = payload || []; },
    setInbox: (s, { payload }) => { s.inbox = payload || []; },

    // ---- COLA LOCAL ----
    enqueueMsg: (s, { payload }) => { s.queue.push(payload); },
    dequeueMsg: (s) => { if (s.queue.length) s.queue.shift(); },
    clearQueue: (s) => { s.queue = []; },
  },
});

export const {
  setPosts,
  setNotifications,
  setInbox,
  enqueueMsg,
  dequeueMsg,
  clearQueue,
} = socialSlice.actions;

export default socialSlice.reducer;
