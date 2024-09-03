import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ToastContainer } from 'react-toastify'
import { AuthProvider } from './hooks/aaaa.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthProvider>
  <React.StrictMode>
    <App />
    <ToastContainer
     bodyClassName="toastBody"
position="top-right"
autoClose={2000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover={false}
theme="colored"
// transition: Bounce
/>
  </React.StrictMode>
  </AuthProvider>
)
