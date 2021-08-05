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

  