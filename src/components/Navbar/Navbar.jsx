import './Navbar.css'

import React, { useState } from 'react'
import { AiFillHome } from 'react-icons/ai'
import { Button } from '@material-ui/core'
import { ProfileBurger } from '../ProfileBurger/ProfileBurger'
import { useAuth } from '../../context/auth-context'
import SignInModal from '../Modals/SignIn/SignIn'
import SignUpModal from '../Modals/SignUp/SignUp'

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const [openSignIn, setOpenSignIn] = useState(false)
  const { user } = useAuth()

  return (
    <>
      <div className='app__header'>
        <img
          className='app__headerImage'
          src='https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png'
          alt='instagram'
        />
        <div className='menu_nav'>
          <Button>
            <AiFillHome style={{ fontSize: '20px' }} />
          </Button>

          {user ? (
            <ProfileBurger />
          ) : (
            <div className='app__loginContainer'>
              <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
              <Button onClick={() => setOpen(true)}>Sign Up</Button>
            </div>
          )}
        </div>
      </div>

      <SignInModal setOpenSignIn={setOpenSignIn} openSignIn={openSignIn} />
      <SignUpModal setOpen={setOpen} open={open} />
    </>
  )
}

export default Navbar
