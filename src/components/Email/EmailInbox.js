import React, { useState, useEffect } from 'react';
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemIcon,  
} from '@mui/material';
import MailOutlineIcon  from '@mui/icons-material/MailOutline';
import { useAuth } from '../../AuthContext';
import CheckIcon from '@mui/icons-material/Check';

const EmailInbox = ({ onEmailClick }) => {
  const { profile } = useAuth();
  const [emails, setEmails] = useState();
  const userToken = localStorage.getItem('token');

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await fetch(`/api/message/get/inbox/${profile.profile.UserId}`, {
          headers: {
            Authorization: userToken,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setEmails(data);
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
    try {
      // Send a request to mark the email as read
      await fetch(`/api/message/mark-as-read/${email.id}`, {
        method: 'PATCH',
        headers: {
          Authorization: userToken,
        },
      });
      onEmailClick(email);
    } catch (error) {
      console.error('Error marking email as read:', error);
    }
  };

  return (
    <div>
      <List>
        {emails &&
          emails.map((email) => (
            <ListItem
              key={email.id}
              onClick={() => handleEmailClick(email)}
              sx={{ cursor: 'pointer', backgroundColor: email.read ? 'lightgray' : 'white' }}
            >
              <ListItemAvatar>
                <Avatar alt="Avatar" src={email.sender.senderAvatar} />
              </ListItemAvatar>
              <ListItemText
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
                  <CheckIcon color="primary" />
                </ListItemIcon>
              ) : (
                <ListItemIcon>
                  <MailOutlineIcon color="secondary" /> 
                </ListItemIcon>
              )}
            </ListItem>
          ))}
      </List>
    </div>
  );
};

export default EmailInbox;