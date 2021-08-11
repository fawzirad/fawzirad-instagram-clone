import React, { useContext, useEffect, useState } from 'react'
import ImageUpload from '../components/ImageUpload/ImageUpload'
import Post from '../components/Post/Post'
import Navbar from '../components/Navbar/Navbar'
import { AuthContext } from '../context/auth-context'
import { useData } from '../context/data-context'
import { Link } from 'react-router-dom'

const Home = () => {
  const { user } = useContext(AuthContext)
  const { users, posts } = useData()

  return (
    <>
      <section>
        <Navbar />
        {user?.displayName ? (
          <ImageUpload username={user.displayName} />
        ) : (
          <h3>Sorry you need to login to upload</h3>
        )}
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
            <h1>You may also follow !</h1>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
