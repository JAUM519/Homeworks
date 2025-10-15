import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider, useDispatch } from "react-redux";
import { store } from "./store/store.js";

import { listenAuth } from "./firebase/config.js";
import { login, logout } from "./store/slices/authSlice.js";

import { loadFeed, listenNotifications } from "./store/thunks.js";
import { listenInbox } from "./store/thunksDM.js";

import "./index.css";

function Boot() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    const unsub = listenAuth(async (user) => {
      if (user) {
        dispatch(login({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || null,
        }));

        dispatch(loadFeed());
        dispatch(listenNotifications());
        dispatch(listenInbox(user.email));
      } else {
        dispatch(logout({}));
      }
    });

    return () => unsub();
  }, [dispatch]);

  return <App />;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <Boot />
    </Provider>
  </React.StrictMode>
);
