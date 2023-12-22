import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.jsx'
import './index.css'
import { SessionProvider } from './context/session.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <SessionProvider>
    <App />
  </SessionProvider>
)
