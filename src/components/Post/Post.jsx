/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { Avatar, Button } from '@material-ui/core'
import { useData } from '../../context/data-context'
import './Post.css'
import moment from 'moment'
import Like from './Like'

const Post = ({ postId, user, post }) => {
  const { username, caption, imageUrl } = post
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
    <article className='post'>
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
        <Like post={post} postId={postId} />
      </h4>

      <section className='post__comments'>
        {comments.map((comment, idx) => {
          return (
            <div key={idx}>
              <p>
                <strong>{comment.username.toUpperCase()} : </strong>
                {comment.text}
              </p>
              <small style={{ fontSize: '12px' }}>
                {moment(comment?.timestamp?.toDate(), 'YYYYMMDD').fromNow()}
              </small>
            </div>
          )
        })}
      </section>
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
            color='secondary'
            className='post__button'
            disabled={!comment}
            type='submit'
            onClick={postComment}
          >
            Comment
          </Button>
        </form>
      )}
    </article>
  )
}

export default Post
