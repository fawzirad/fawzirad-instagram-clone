import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { AuthProvider } from './context/auth-context'
import { DataProvider } from './context/data-context'
import Home from './pages/Home'
import Navbar from './components/Navbar/Navbar'
import CreatePost from './pages/CreatePost'
import Profile from './pages/Profile'

function App() {
  return (
    <>
      <AuthProvider>
        <DataProvider>
          <main className='App'>
            <Router>
              <Navbar />
              <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/post/create' component={CreatePost} />
                <Route path='/p/:uid' component={Profile} />
                <Route path='*'>
                  <h1>Error 404 Page not found</h1>
                </Route>
              </Switch>
            </Router>
          </main>
        </DataProvider>
      </AuthProvider>
    </>
  )
}

export default App
