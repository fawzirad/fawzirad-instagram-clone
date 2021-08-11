import React from 'react'
import ImageUpload from '../components/ImageUpload/ImageUpload'
import Post from '../components/Post/Post'
import Navbar from '../components/Navbar/Navbar'
import { useAuth } from '../context/auth-context'
import { useData } from '../context/data-context'
import { Link } from 'react-router-dom'
import { Avatar } from '@material-ui/core'

const Home = () => {
  const { user } = useAuth()
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
              return <Post key={id} postId={id} user={user} {...post} />
            })}
          </div>
          <div className='app__postsRight'>
            <h1>You may also follow !</h1>

            <h2>Users</h2>
            {users.length > 0 ? (
              <>
                <ul>
                  {users?.map(({ docId, displayName }) => (
                    <li className='post__header' key={docId}>
                      <Avatar
                        className='post__avatar'
                        alt='RafehQazi'
                        src={'https://ui-avatars.com/api/?name=' + displayName}
                      />
                      <Link to={`/p/${docId}`}>{displayName}</Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <span>no users</span>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
