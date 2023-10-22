import React, { useState } from 'react';
import { Container, CssBaseline, Paper, Typography, Box } from '@mui/material';
import EmailCompose from '../components/Email/EmailCompose';
import EmailInbox from '../components/Email/EmailInbox';
import EmailContent from '../components/Email/EmailContent';
import EmailNavMenu from '../components/Email/EmailNavMenu';

const Email = () => {
  const [selectedTab, setSelectedTab] = useState('inbox'); // Keep track of selected tab
  const [selectedEmail, setSelectedEmail] = useState(null); // Keep track of selected email

  const handleTabChange = (tabName) => {
    setSelectedTab(tabName);
    setSelectedEmail(null); // Reset selected email when changing tabs
  };

  const handleEmailClick = (email) => {
    setSelectedEmail(email);
    setSelectedTab('emailContent'); // Change the tab to display email content
  };

  const handleComposeClose = () => {
    setSelectedTab('inbox'); // Set the tab to 'inbox' when the compose component is closed
  };

  return (
    <Container sx={{ margin: 0 }}>
      <CssBaseline />
      <Box sx={{ display: 'flex', alignItems: 'centre' }}>
        <Typography variant="h5" gutterBottom sx={{ paddingTop: '20px' }}>
          Messages
        </Typography>

        {/* Navigation Menu */}
        <EmailNavMenu onTabChange={handleTabChange} selectedTab={selectedTab} />
      </Box>
      {/* Content Area */}
      <Paper elevation={0} sx={{ padding: '16px', height: '500px' }}>
        {selectedTab === 'compose' ? (
          <EmailCompose onClose={handleComposeClose} />
        ) : (
          <div>
            {selectedEmail ? (
              <EmailContent email={selectedEmail} />
            ) : (
              <EmailInbox
                onEmailClick={handleEmailClick}
                maxHeight="400px" // Set the max height for the email list
              />
            )}
          </div>
        )}
      </Paper>
    </Container>
  );
};

export default Email;
