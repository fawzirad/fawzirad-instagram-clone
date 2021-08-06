import React from 'react'
import { AuthProvider } from './context/auth-context'
import Home from './pages/Home'

function App() {
  return (
    <>
      <AuthProvider>
        <main className='App'>
          <Home />
        </main>
      </AuthProvider>
    </>
  )
}

export default App
