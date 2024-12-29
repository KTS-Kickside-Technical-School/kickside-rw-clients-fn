import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from "react-redux"

import App from './App.tsx'
import './App.css'
import { store } from "./state/store.ts"



createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
    <StrictMode>
      <App />
    </StrictMode>
  </Provider>
)
