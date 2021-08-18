import React, { useEffect, useState } from 'react'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { useAuth } from '../../context/auth-context'
import { useData } from '../../context/data-context'

const Like = ({ post, postId }) => {
  const { user } = useAuth()
  const { likePost } = useData()
  const [liked, setLiked] = useState(false)

  useEffect(() => {
    const isLiked = user && post.likes.find((_uid) => _uid === user.uid)

    setLiked(isLiked || false)
  }, [user, post.likes])

  const submitHandler = (e) => {
    e.preventDefault()

    setLiked(!liked)
    likePost(postId)
  }
  return (
    <>
      <section>
        <form className='like__form' onSubmit={(e) => submitHandler(e)}>
          {user && (
            <button className='like__button'>
              {liked ? <AiFillHeart className='liked' /> : <AiOutlineHeart />}
            </button>
          )}
          <span className='text-danger'>{post.likes.length} likes </span>
        </form>
      </section>
    </>
  )
}

export default Like
