import { Logout } from '@mui/icons-material';
import { Avatar, IconButton, Tooltip, Menu, MenuItem, ListItemIcon } from '@mui/material'
import React, { MouseEvent, useState } from 'react'

export default function AccountMenu({ userName, userImg, handleLogout }:{ userName:string, userImg:string, handleLogout:() => void }) {

  const [anchorEL, setAnchorEL] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEL);

  const handleClick = (event:MouseEvent<HTMLElement>) => {
    setAnchorEL(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEL(null);
  }

  return (
    <>
      <Tooltip title="Account Settings">
        <IconButton
          onClick={handleClick}
        >
          <Avatar
            alt={userName}
            src={userImg}
          />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEL}
        id="account-menu"
        open={isOpen}
        onClose={handleClose}
        onClick={handleClose}
      >
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  )
}
