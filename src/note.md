// useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((authUser) => {
  //     if (authUser) {
  //       // user has logged in...
  //       console.log(authUser)
  //       setUser(authUser)

  //       if (authUser.displayName) {
  //         // dont update username
  //       } else {
  //         // if we just created someone...
  //         return authUser.updateProfile({
  //           displayName: username,
  //         })
  //       }
  //     } else {
  //       // user has logged out...
  //       setUser(null)
  //     }
  //   })
  //   return () => {
  //     // perform some cleanup actions
  //     unsubscribe()
  //   }
  // }, [user, username])

  // function signUp event
  // const signUp = (event) => {
  //   event.preventDefault()

  //   auth
  //     .createUserWithEmailAndPassword(email, password)
  //     .then((authUser) => {
  //       return authUser.user.updateProfile({
  //         displayName: username,
  //       })
  //     })
  //     .catch((error) => alert(error.message))
  //   setOpen(false)
  // }

  // // function signIn event
  // const signIn = (event) => {
  //   event.preventDefault()

  //   auth.signInWithEmailAndPassword(email, password).catch((error) => alert(error.message))
  //   setOpenSignIn(false)
  // }