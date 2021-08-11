/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { Avatar, Button } from '@material-ui/core'
import { useData } from '../../context/data-context'
import './Post.css'
import moment from 'moment'

function Post({ postId, user, username, caption, imageUrl }) {
  const [comment, setComment] = useState('')
  const { getPostComments, comments, createPostComment } = useData()

  useEffect(() => {
    getPostComments(postId)
  }, [postId])

  const postComment = (e) => {
    e.preventDefault()

    createPostComment(postId, comment, user)
    setComment('')
  }

  return (
    <div className='post'>
      <div className='post__header'>
        <Avatar
          className='post__avatar'
          alt='RafehQazi'
          src={'https://ui-avatars.com/api/?name=' + username}
        />
        <h3>{username}</h3>
      </div>

      <img className='post__image' src={imageUrl} alt={imageUrl} />

      <h4 className='post__text'>
        <strong>{username}</strong> {caption}
      </h4>

      <div className='post__comments'>
        {comments.map((comment, idx) => {
          return (
            <p
              key={idx}
              style={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <span>
                <strong>{comment.username}</strong> {comment.text}
              </span>
              <small>
                {moment(comment.timestamp.toDate(), 'YYYYMMDD').fromNow()}
              </small>
            </p>
          )
        })}
      </div>
      {user && (
        <form className='post__commentBox'>
          <input
            className='post__input'
            type='text'
            placeholder='Add a comment...'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button
            variant='contained'
            className='post__button'
            disabled={!comment}
            type='submit'
            onClick={postComment}
          >
            Post
          </Button>
        </form>
      )}
    </div>
  )
}

export default Post
