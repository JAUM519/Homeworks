import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { App } from './App'

import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase/config'
import { setAuthenticated, setNotAuthenticated } from './store/slices/authSlice'

onAuthStateChanged(auth, (user) => {
  if (user) {
    store.dispatch(setAuthenticated({
      uid: user.uid,
      email: user.email,
      displayName: user.displayName ?? '',
      photoURL: user.photoURL ?? null,
    }))
  } else {
    store.dispatch(setNotAuthenticated())
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
