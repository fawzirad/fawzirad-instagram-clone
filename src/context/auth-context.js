import React, { createContext, useEffect, useState } from 'react'
import { db, auth } from '../firebase'

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
        return authUser.user
          .updateProfile({
            displayName: username,
          })
          .then(() => {
            db.collection('users').add({
              userId: authUser.user.uid,
            })
            window.location.reload()
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
      setUser(authUser ? authUser : null)
    })
    return () => unsubscribe
  }, [user])

  const values = { signIn, signUp, open, user, setUsername, username }
  return <AuthContext.Provider value={values} children={children} />
}
