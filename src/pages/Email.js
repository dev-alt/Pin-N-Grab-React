import React, { useState } from 'react';
import { Container, CssBaseline, Grid, Paper, Typography } from '@mui/material';
import EmailCompose from '../components/Email/EmailCompose';
import EmailInbox from '../components/Email/EmailInbox';
import EmailContent from '../components/Email/EmailContent';
import EmailNavMenu from '../components/Email/EmailNavMenu';
import { MarginTwoTone } from '@mui/icons-material';

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

  return (
    <Container sx={{ margin: 0 }}>
      <CssBaseline />
      <Paper
        elevation={6}
        sx={{ borderRadius: '20px', padding: '16px', mt: '16px' }}
      >
        <Typography variant="h5" gutterBottom>
          Messages
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            {/* Navigation Menu */}
            <EmailNavMenu
              onTabChange={handleTabChange}
              selectedTab={selectedTab}
            />
          </Grid>
          <Grid item xs={9}>
            {/* Content Area */}
            <Paper elevation={3} sx={{ padding: '16px', height: '500px' }}>
              {selectedTab === 'compose' ? (
                <EmailCompose />
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
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Email;
