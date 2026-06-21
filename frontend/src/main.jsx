import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';

// Use a placeholder or environment variable for the real client ID
const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || "1028308432168-m83391gq8a4h8q14l1v64v1v88u0u7v9.apps.googleusercontent.com";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>,
)
