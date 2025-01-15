import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast';
import { store } from './slices/store'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store = {store}>
    <Toaster/>
    <App />
    </Provider>
  </StrictMode>,
)
