import React, { useState } from 'react'
import { Provider, useSelector } from 'react-redux'
import { store } from './store/store.js'
import { Registro } from './components/register.jsx'
import Login from './components/login.jsx'
import Profile from './components/profile.jsx'
import { Crud } from './components/Crud.jsx'
import './App.css'

function PageLogic() {
  const { user, status } = useSelector((s) => s.auth ?? {})
  const [view, setView] = useState('login')

  if (user || status === 'authenticated') {
    return (
      <div className="container">
        <Profile />
        <h2>Gestión de usuarios (Firestore Database)</h2>
        <Crud />
      </div>
    )
  }

  return (
    <div className="container">
      {view === 'login' ? (
        <>
          <Login />
          <button className='boton' onClick={() => setView('register')}>Crear cuenta</button>
        </>
      ) : (
        <>
          <Registro />
          <button className='boton' onClick={() => setView('login')}>Ya tengo cuenta</button>
        </>
      )}
    </div>
  )
}

export default function App() {
  return (
    <Provider store={store}>
      <PageLogic />
    </Provider>
  )
}