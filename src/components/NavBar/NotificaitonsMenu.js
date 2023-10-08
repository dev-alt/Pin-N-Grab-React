import React from 'react';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

function NotificationsMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleNotificationsOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>

      <IconButton
        size="large"
        aria-label="show new notifications"
        color="inherit"
        onClick={handleNotificationsOpen}
      >
        <Badge badgeContent={17} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        id="notifications-menu"
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={handleNotificationsClose}
      >
        <MenuItem onClick={handleNotificationsClose}>Notification 1</MenuItem>
        <MenuItem onClick={handleNotificationsClose}>Notification 2</MenuItem>
      </Menu>
    </div>
  );
}

export default NotificationsMenu;
