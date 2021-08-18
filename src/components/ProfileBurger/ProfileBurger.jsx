import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Fade from '@material-ui/core/Fade'
import { auth } from '../../firebase'
import { useAuth } from '../../context/auth-context'
import { useHistory } from 'react-router-dom'

export const ProfileBurger = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const history = useHistory()

  const { user } = useAuth()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    history.push(`/p/${user.uid}`)
    setAnchorEl(null)
  }

  return (
    <div>
      <Button
        aria-controls='fade-menu'
        aria-haspopup='true'
        onClick={handleClick}
      >
        {user?.displayName || 'Not Logged In'}
      </Button>
      <Menu
        id='fade-menu'
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>Settings</MenuItem>
        <hr />
        <MenuItem
          onClick={() => {
            auth.signOut()
            setAnchorEl(null)
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </div>
  )
}
