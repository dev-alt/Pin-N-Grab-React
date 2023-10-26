import React, { useState, useEffect } from 'react';
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { useAuth } from '../../AuthContext';
import CheckIcon from '@mui/icons-material/Check';
import { UseUnreadMessages } from '../../UnreadMessagesContext';
import axios from 'axios';

const EmailInbox = ({ onEmailClick }) => {
  const { profile } = useAuth();
  const [emails, setEmails] = useState();
  const userToken = localStorage.getItem('token');
  const { decrementUnreadCount } = UseUnreadMessages();

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await axios.get(`/api/message/get/inbox/${profile.profile.UserId}`, {
          headers: {
            Authorization: userToken,
          },
        });

        if (response.status === 200) {
          setEmails(response.data);
        } else {
          console.error('Error fetching emails:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching emails:', error);
      }
    };

    fetchEmails();
  }, [profile, userToken]);

  const handleEmailClick = async (email) => {
    if (!email.read) {
      try {
        // Send a request to mark the email as read
        await axios.patch(`/api/message/mark-as-read/${email.id}`, null, {
          headers: {
            Authorization: userToken,
          },
        });
        decrementUnreadCount();
        onEmailClick(email);
      } catch (error) {
        console.error('Error marking email as read:', error);
      }
    }
    onEmailClick(email);
  };

  return (
    <div>
      <List>
        {emails &&
          emails.map((email) => (
            <ListItem
              key={email.id}
              onClick={() => handleEmailClick(email)}
              sx={{
                cursor: 'pointer',
                backgroundColor: email.read ? '#f7eb3b' : '#ebba09',
                display: 'flex',
                borderRadius: '50px',
                mb: 2,
              }}
            >
              <ListItemAvatar>
                <Avatar alt="Avatar" src={email.sender.senderAvatar} />
              </ListItemAvatar>
              <ListItemText
                primaryTypographyProps={{ sx: { fontWeight: 900 } }}
                primary={email.subject}
                secondary={
                  <>
                    {email.sender.username}
                    <br />
                    {email.date}
                  </>
                }
              />
              {email.read ? (
                <ListItemIcon>
                  <CheckIcon sx={{ color: '#eb6009', marginLeft: '2rem' }} />
                </ListItemIcon>
              ) : (
                <ListItemIcon>
                  <MailOutlineIcon
                    color="secondary"
                    sx={{ marginLeft: '2rem' }}
                  />
                </ListItemIcon>
              )}
            </ListItem>
          ))}
      </List>
    </div>
  );
};

export default EmailInbox;
