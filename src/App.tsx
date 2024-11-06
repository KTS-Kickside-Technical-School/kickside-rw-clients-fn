import React from 'react'
import { BrowserRouter, Router } from 'react-router-dom'
import './App.scss'
import AppRouter from './Router'

const App: React.FC = () => {

  return (
    <BrowserRouter>
      {/* <Router> */}
        <AppRouter />
      {/* </Router> */}
    </BrowserRouter>
  )
}

export default App
