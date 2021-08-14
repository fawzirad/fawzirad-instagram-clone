import React from 'react'
import ImageUpload from '../components/ImageUpload/ImageUpload'
import { useAuth } from '../context/auth-context'
const CreatePost = () => {
  const { user } = useAuth()
  return (
    <>
      <section className='post__create'>
        <h1>Create Post</h1>
        {user?.displayName ? (
          <ImageUpload username={user.displayName} />
        ) : (
          <h3>Sorry you need to login to upload</h3>
        )}
      </section>
    </>
  )
}

export default CreatePost
