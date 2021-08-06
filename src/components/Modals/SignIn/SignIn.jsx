import { Button, Input, Modal } from '@material-ui/core'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../../../context/auth-context'
import { getModalStyle, useStyles } from '../../../shared/styles'

const SignInModal = ({ openSignIn, setOpenSignIn }) => {
  const [modalStyle] = useState(getModalStyle)
  const classes = useStyles()
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const { signIn } = useContext(AuthContext)

  const signInHandler = (e) => {
    e.preventDefault()

    signIn(email, password)

    setOpenSignIn(false)
  }

  return (
    <>
      <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
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
              placeholder='email'
              autoFocus
              type='text'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type='submit' onClick={signInHandler}>
              Sign In
            </Button>
          </form>
        </div>
      </Modal>
    </>
  )
}

export default SignInModal
