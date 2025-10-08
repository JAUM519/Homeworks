import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App.jsx';
import { store } from './store/store';
import { Registro } from './components/register.jsx';
import Login from './components/login.jsx';
import Profile from './components/profile.jsx';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Registro />
      <Login />
      <Profile />
    </Provider>
  </React.StrictMode>
);
