import React, { useState, useEffect } from 'react';
import { IconButton, Badge, Dialog, Grow } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import Email from '../../pages/Email';
import axios from 'axios';
import { useAuth } from '../../AuthContext';

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
};

function MailMenu() {
  const [isMessageOpen, setMessageOpen] = useState(false);
  const [unreadMessageCount, setUnreadMessageCount] = useState(0);
  const userToken = localStorage.getItem('token');
  const { profile } = useAuth();

  const handleMailOpen = () => {
    setMessageOpen(true);
  };

  const closeMessageDialog = () => {
    setMessageOpen(false);
  };

  useEffect(() => {
    const fetchUnreadMessages = async () => {
      try {
        const response = await axios.get(
          `/api/message/get/inbox/${profile.profile.UserId}/unread`,
          {
            headers: {
              Authorization: userToken,
            },
          },
        );

        if (response.status === 200) {
          const data = response.data;
          const count = data.length;
          setUnreadMessageCount(count);
        } else {
          console.error('Error fetching unread messages:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching unread messages:', error);
      }
    };
    // Fetch unread messages on component mount
    fetchUnreadMessages();
  }, [userToken, profile]);

  return (
    <div style={styles.mailMenu}>
      <IconButton
        size="large"
        aria-label="show new mails"
        color="inherit"
        onClick={handleMailOpen}
        sx={styles.badge}
      >
        <Badge badgeContent={unreadMessageCount} color="error">
          <MailIcon />
        </Badge>
      </IconButton>

      <Dialog
        open={isMessageOpen}
        onClose={closeMessageDialog}
        TransitionComponent={Grow}
        transitionDuration={500}
        sx={{ height: '100vh' }}
      >
        <Email onClose={closeMessageDialog} />
      </Dialog>
    </div>
  );
}

export default MailMenu;
