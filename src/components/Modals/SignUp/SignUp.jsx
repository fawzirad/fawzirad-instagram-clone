import React, { useState } from 'react'
import { Button, Input, Modal } from '@material-ui/core'
import { getModalStyle, useStyles } from '../../../shared/styles'
import { useContext } from 'react'
import { AuthContext } from '../../../context/auth-context'

const SignUpModal = ({ open, setOpen }) => {
  const [modalStyle] = useState(getModalStyle)
  const classes = useStyles()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signUp, username, setUsername } = useContext(AuthContext)

  const signUpHandler = (e) => {
    e.preventDefault()

    signUp(email, password, username)

    setOpen(false)
  }

  return (
    <>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className='app__signup'>
            <center>
              <img
                className='app__headerImage'
                src='https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png'
                alt='instagram'
              />
            </center>
            <Input
              placeholder='username'
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder='email'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type='submit' onClick={signUpHandler}>
              Sign Up
            </Button>
          </form>
        </div>
      </Modal>
    </>
  )
}

export default SignUpModal
