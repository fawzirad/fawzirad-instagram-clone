import React, { createContext, useEffect, useState, useContext } from 'react'
import { db, timestamp } from '../firebase'

const DataContext = createContext()

const DataProvider = ({ children }) => {
  const [users, setUsers] = useState([])
  const [posts, setPosts] = useState([])
  const [comments, setComments] = useState([])

  const getUsers = () => {
    db.collection('users').onSnapshot((snapshot) => {
      setUsers(
        snapshot.docs.map((doc) => ({
          docId: doc.id,
          ...doc.data(),
        }))
      )
    })
  }

  const createPost = () => {}

  const getPosts = () => {
    db.collection('posts')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          }))
        )
      })
  }

  const createPostsLike = () => {}

  const createPostComment = (postId, comment, user) => {
    db.collection('posts').doc(postId).collection('comments').add({
      text: comment,
      username: user.displayName,
      timestamp: timestamp(),
    })
  }

  const getPostComments = (postId) => {
    let unsubscribe
    if (postId) {
      unsubscribe = db
        .collection('posts')
        .doc(postId)
        .collection('comments')
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) => {
          const _comments = snapshot.docs.map((doc) => {
            return {
              docId: doc.id,
              ...doc.data(),
            }
          })
          setComments(_comments)
        })
    }

    return () => unsubscribe()
  }

  useEffect(() => {
    getPosts()
    getUsers()

    return getUsers
  }, [])
  const values = { users, posts, comments, getPostComments, createPostComment }
  return <DataContext.Provider value={values} children={children} />
}

const useData = () => {
  return useContext(DataContext)
}

export { useData, DataProvider }
