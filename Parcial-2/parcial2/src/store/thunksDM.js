import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { setInbox } from "./slices/socialSlice";
import { saveNotification } from "./thunks";

const messagesRef = collection(db, "messages");
const notificationsRef = collection(db, "notifications");

export const sendDM = (msg) => async (dispatch) => {
  await addDoc(messagesRef, msg);

  const notif = {
    id: crypto.randomUUID(),
    text: `Nuevo mensaje de ${msg.from}`,
    to: msg.to,
    ts: Date.now(),
  };
  await addDoc(notificationsRef, notif);
};

export const listenInbox = (email) => (dispatch) => {
  const q = query(messagesRef, where("to", "==", email), orderBy("ts", "asc"));
  return onSnapshot(q, (snap) => {
    const msgs = snap.docs.map((d) => d.data());
    dispatch(setInbox(msgs));
  });
};
