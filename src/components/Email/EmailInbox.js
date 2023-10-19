import React, { useState, useEffect } from 'react';
import { Paper, Container, Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { useAuth } from '../../AuthContext';

const EmailInbox = ({ onEmailClick }) => {
  const { profile } = useAuth();
  const [emails, setEmails] = useState([]);
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

  const handleEmailClick = (email) => {
    onEmailClick(email);
  };

  return (
    <div>
      <Container maxWidth="lg">
        <Paper elevation={3} sx={{ padding: '16px' }}>
          <List>
            {emails.map((email) => (
              <ListItem
                key={email.id}
                onClick={() => handleEmailClick(email)}
                sx={{ cursor: 'pointer' }}
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
              </ListItem>
            ))}
          </List>
        </Paper>
      </Container>
    </div>
  );
};

export default EmailInbox;
