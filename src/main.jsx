import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Provider } from 'react-redux'
import store from './app/store.js'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="133364040354-5he4ipkgi6kb60dofcu3tlms5gaom666.apps.googleusercontent.com">
      <Provider store={store}>
        <App />
      </Provider>
    </GoogleOAuthProvider>
  </StrictMode>,
)
