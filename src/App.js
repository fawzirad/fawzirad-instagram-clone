import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProvider } from './context/auth-context'
import { DataProvider } from './context/data-context'
import Home from './pages/Home'

function App() {
  return (
    <>
      <AuthProvider>
        <DataProvider>
          <Router>
            <main className='App'>
              <Home />
            </main>
          </Router>
        </DataProvider>
      </AuthProvider>
    </>
  )
}

export default App
