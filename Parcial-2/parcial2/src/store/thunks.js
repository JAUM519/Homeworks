import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  where,
  doc,
  getDocs,
} from "firebase/firestore";
import { db, auth } from "../firebase/config";
import { setPosts, setNotifications } from "./slices/socialSlice";


const feedRef = collection(db, "feed");

export const loadFeed = () => (dispatch) => {
  const q = query(feedRef, orderBy("ts", "asc"));
  return onSnapshot(q, (snap) => {
    const posts = snap.docs.map((d) => d.data());
    dispatch(setPosts(posts));
  });
};

export const savePostToFirebase = (post) => async () => {

  const existing = await getDocs(query(feedRef, where("id", "==", post.id)));
  if (existing.empty) {
    await addDoc(feedRef, post);

    const notif = {
      id: crypto.randomUUID(),
      text: `${post.author} publicó: ${post.text}`,
      ts: Date.now(),
    };
    await addDoc(collection(db, "notifications"), notif);
  }
};

const notificationsRef = collection(db, "notifications");


export const listenNotifications = () => (dispatch) => {
  const user = auth.currentUser;
  if (!user || !user.email) return;

  const q = query(notificationsRef, orderBy("ts", "desc"));

  return onSnapshot(q, (snap) => {
    const all = snap.docs.map((d) => d.data());

    const filtered = all.filter(
      (n) => !n.to || n.to === user.email
    );

    dispatch(setNotifications(filtered));
  });
};


export const saveNotification = (notif) => async () => {
  await addDoc(notificationsRef, notif);
};


import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { checkingCredentials, login, logout } from "./slices/authSlice";

// Registro
export const startRegister =
  ({ email, password, displayName }) =>
  async (dispatch) => {
    dispatch(checkingCredentials());
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      if (displayName) await updateProfile(res.user, { displayName });
      dispatch(
        login({
          uid: res.user.uid,
          email: res.user.email,
          displayName: displayName || res.user.displayName || null,
        })
      );
    } catch (e) {
      dispatch(logout({ errorMessage: e.message }));
    }
  };


export const startLogin =
  ({ email, password }) =>
  async (dispatch) => {
    dispatch(checkingCredentials());
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      dispatch(
        login({
          uid: res.user.uid,
          email: res.user.email,
          displayName: res.user.displayName || null,
        })
      );
    } catch (e) {
      dispatch(logout({ errorMessage: e.message }));
    }
  };


export const startLogout = () => async (dispatch) => {
  await signOut(auth);
  dispatch(logout({}));
};
