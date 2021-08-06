import React, { createContext, useEffect, useState } from 'react'
import { auth } from '../firebase'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [open, setOpen] = useState(false)
  const [username, setUsername] = useState('')
  const [user, setUser] = useState(null)

  // function signUp event
  const signUp = (email, password, username) => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        })
      })
      .catch((error) => alert(error.message))
    setOpen(false)
  }

  // function signIn event
  const signIn = (email, password) => {
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message))
  }

  // gets user from firebase
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser)
        if (!authUser.displayName) {
          return authUser.updateProfile({
            displayName: username,
          })
        }
      } else {
        setUser(null)
      }
    })
    return () => unsubscribe
  }, [user, username])

  const values = { signIn, signUp, open, user, setUsername, username }
  return <AuthContext.Provider value={values} children={children} />
}
