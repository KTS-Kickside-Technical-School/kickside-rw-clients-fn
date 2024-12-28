import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './App.css'

import { createStore } from "redux"
import { Provider } from "react-redux"

const store = createStore()
createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
    <StrictMode>
      <App />
    </StrictMode>
  </Provider>
)
