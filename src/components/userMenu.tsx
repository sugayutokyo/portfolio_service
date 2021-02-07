import React from 'react'
import { auth } from '@/firebase'
import { IconButton } from '@material-ui/core'
import AccountCircle from '@material-ui/icons/AccountCircle'
import { Menu, MenuItem } from '@material-ui/core'

const userMenu = () => {
  const [userAnchorEl, setUserAnchorEl] = React.useState<null | HTMLElement>(null)
  const isUserMenuOpen = Boolean(userAnchorEl)

  return (
    <>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={(e: React.MouseEvent<HTMLElement>) => setUserAnchorEl(e.currentTarget)}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="userMenu"
        getContentAnchorEl={null} // コンテンツのAnchorElを取得するために呼び出される
        anchorEl={userAnchorEl} // Menuを表示するための元になるElement、このコンポーネントではIconButtonコンポーネントを指す
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={isUserMenuOpen}
        onClose={() => setUserAnchorEl(null)}
      >
        <MenuItem onClick={() => setUserAnchorEl(null)}>Profile</MenuItem>
        <MenuItem
          onClick={() => {
            setUserAnchorEl(null)
            auth.signOut()
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </>
  )
}

export default userMenu
