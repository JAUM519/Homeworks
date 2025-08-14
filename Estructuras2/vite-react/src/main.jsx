import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Props from './Props.jsx'
import Functions from './Functions.jsx'
import Hooks from './Hooks.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Props />
    <Functions value = {200}/>
    <Hooks />
  </React.StrictMode>,
)
