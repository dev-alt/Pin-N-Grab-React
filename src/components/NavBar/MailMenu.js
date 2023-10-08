import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const styles = {
  mailMenu: {
    position: 'relative',
  },
  badge: {
    '& .MuiBadge-badge': {
      backgroundColor: 'red',
      color: 'white',
    },
  },
  messageHeader: {
    fontWeight: 'bold',
    padding: '8px 16px',
  },
  messageItem: {
    padding: '8px 16px',
    '&:hover': {
      backgroundColor: '#f0f0f0',
    },
    textDecoration: 'none', // Added for clickable messages
    color: 'inherit', // Added for clickable messages
  },
  seeAll: {
    textAlign: 'center',
    color: 'blue',
    cursor: 'pointer',
    padding: '8px 16px',
    textDecoration: 'none', // Added for clickable link
  },
};

function MailMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMailOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMailClose = () => {
    setAnchorEl(null);
  };

  const messages = [
    {
      name: 'Peter Theil',
      time: '6:45 am',
      content: 'Commented on file Guest list....',
      link: '/message/1', // Add the link to the message page
    },
    {
      name: 'Abagael Luth',
      time: '10:35 am',
      content: 'New Meetup Started......',
      link: '/message/2', // Add the link to the message page
    },
    // Add more messages with links as needed
  ];

  // Add a link for "See all Messages"
  const seeAllLink = '/email'; // Define the route for all messages

  return (
    <div style={styles.mailMenu}>
      <IconButton
        size="large"
        aria-label="show new mails"
        color="inherit"
        onClick={handleMailOpen}
        sx={styles.badge}
      >
        <Badge badgeContent={messages.length} color="error">
          <MailIcon />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        id="mail-menu"
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={open}
        onClose={handleMailClose}
      >
        <MenuItem sx={styles.messageHeader}>
          <strong>You have {messages.length} Messages</strong>
        </MenuItem>
        {messages.map((message, index) => (
          <MenuItem key={index} sx={styles.messageItem} component={Link} to={message.link}>
            <div>
              <strong>{message.name}</strong>
              <br />
              <small>{message.time}</small>
              <br />
              {message.content}
            </div>
          </MenuItem>
        ))}
        <MenuItem sx={styles.seeAll} component={Link} to={seeAllLink}>
          <em>See all Messages</em>
        </MenuItem>
      </Menu>
    </div>
  );
}

export default MailMenu;
