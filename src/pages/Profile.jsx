/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Post from '../components/Post/Post'
import { useAuth } from '../context/auth-context'
import { useData } from '../context/data-context'

const Profile = () => {
  const { user } = useAuth()
  const { uid } = useParams()
  const { userProfile, getSingleUser } = useData()

  useEffect(() => {
    const unsubscribe = getSingleUser(uid)

    return () => unsubscribe
  }, [uid])

  console.log(userProfile)

  return (
    <>
      <main>
        <h1>User Profile</h1>

        {!userProfile && <span>Loading ...</span>}

        <span>{userProfile?.user.displayName}</span>
        <span>{userProfile?.user.email}</span>
        <div className='app__posts'>
          {userProfile && (
            <>
              <span>
                {userProfile?.posts?.map((post) => (
                  <Post
                    key={post.docId}
                    postId={post.docId}
                    user={user}
                    post={post}
                  />
                ))}
              </span>
            </>
          )}
        </div>
      </main>
    </>
  )
}

export default Profile
