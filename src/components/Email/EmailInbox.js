import React, { useState } from 'react';
import {
  Button,
  Paper,
  Tab,
  Tabs,
  Typography,
  Container,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';

const EmailInbox = ({ selectedTab, onTabChange }) => {
  const [value, setValue] = React.useState(0);
  const [selectedEmail, setSelectedEmail] = useState(null);

  React.useEffect(() => {
    // Update the selected tab when the parent component passes a new selectedTab prop
    setValue(selectedTab === 'inbox' ? 0 : selectedTab === 'drafts' ? 1 : selectedTab === 'starred' ? 2 : 3);
  }, [selectedTab]);

  const handleChange = (event, newValue) => {
    // Notify the parent component (Email.js) of the tab change
    onTabChange(newValue === 0 ? 'inbox' : newValue === 1 ? 'drafts' : newValue === 2 ? 'starred' : 'trash');
  };

  const fakeEmails = [
    {
      id: 1,
      subject: 'Sample Email 1',
      sender: 'Cherry Blossom (cherryblosso@gmail.com)',
      date: 'June 15, 2021 10:30 AM',
      content: 'Hi Sir/Madam...\n...Thanking you Sir/Madam',
    },
    // Add more fake emails as needed
  ];

  const handleEmailClick = (email) => {
    setSelectedEmail(email);
  };

  return (
    <div>
      <Container maxWidth="lg">
        <Paper elevation={3} sx={{ padding: '16px' }}>
          <Typography variant="h5" gutterBottom>
            Inbox
          </Typography>
          <Button variant="contained" color="primary" fullWidth onClick={() => onTabChange('compose')}>
            Compose
          </Button>

          <Paper square>
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="primary"
              orientation="vertical"
              variant="scrollable"
            >
              <Tab label="Inbox" />
              <Tab label="Drafts" />
              <Tab label="Starred" />
              <Tab label="Trash" />
            </Tabs>
          </Paper>
        </Paper>
      </Container>

      {/* Display the list of fake emails */}
      <List>
        {fakeEmails.map((email) => (
          <ListItem
            key={email.id}
            onClick={() => handleEmailClick(email)} // Handle click event
            sx={{ cursor: 'pointer' }}
          >
            <ListItemAvatar>
              <Avatar alt="Avatar" src="../assets/images/users/6.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary={email.subject}
              secondary={
                <>
                  {email.sender}
                  <br />
                  {email.date}
                </>
              }
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default EmailInbox;
