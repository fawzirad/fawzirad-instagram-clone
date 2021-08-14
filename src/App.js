import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { AuthProvider } from './context/auth-context'
import { DataProvider } from './context/data-context'
import Home from './pages/Home'
import Navbar from './components/Navbar/Navbar'
import CreatePost from './pages/CreatePost'

function App() {
  return (
    <>
      <AuthProvider>
        <DataProvider>
          <main className='App'>
            <Router>
              <Navbar />
              <Route exact path='/' component={Home} />
              <Route path='/post/create' component={CreatePost} />
            </Router>
          </main>
        </DataProvider>
      </AuthProvider>
    </>
  )
}

export default App
