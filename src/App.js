import React, { useState, useEffect } from 'react'
import './App.css'
import Post from './components/Post/Post'
import { db, auth } from './firebase'
import ImageUpload from './components/ImageUpload/ImageUpload'
import Navbar from './components/Navbar/Navbar'
import { AuthProvider } from './context/auth-context'

// Fonctions pour App en general
function App() {
  const [posts, setPosts] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // user has logged in...
        console.log(authUser)
        setUser(authUser)

        if (authUser.displayName) {
          // dont update username
        } else {
          // if we just created someone...
          // return authUser.updateProfile({
          //   displayName: username,
          // });
        }
      } else {
        // user has logged out...
        setUser(null)
      }
    })
    return () => {
      // perform some cleanup actions
      unsubscribe()
    }
  }, [user])

  // UseEffect --> Runs a piece of code based on a specific condition
  useEffect(() => {
    // this is where the code runs
    db.collection('posts')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => {
        // every time a new post is added, this code fires...
        console.log(
          'message',
          snapshot.docs.map((doc) => doc.data())
        )
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          }))
        )
      })
  }, [])

  return (
    <>
      <AuthProvider>
        <div className='App'>
          <Navbar />
          <div className='app__posts'>
            <div className='app__postsLeft'>
              {posts.map(({ id, post }) => {
                return (
                  <Post
                    key={id}
                    postId={id}
                    user={user}
                    username={post.username}
                    caption={post.caption}
                    imageUrl={post.imageUrl}
                  />
                )
              })}
            </div>

            <div className='app__postsRight'>
              <h1>Hello</h1>
            </div>
          </div>

          {user?.displayName ? (
            <ImageUpload username={user.displayName} />
          ) : (
            <h3>Sorry you need to login to upload</h3>
          )}
        </div>
      </AuthProvider>
    </>
  )
}

export default App
