import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './routes'
import { HelmetProvider } from 'react-helmet-async'

const App: React.FC = () => {

  return (
    <HelmetProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </HelmetProvider >
  )
}

export default App
