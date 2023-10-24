import React, { useState } from 'react';
import { Container, CssBaseline, Paper, Typography, Box } from '@mui/material';
import EmailCompose from '../components/Email/EmailCompose';
import EmailInbox from '../components/Email/EmailInbox';
import EmailContent from '../components/Email/EmailContent';
import EmailNavMenu from '../components/Email/EmailNavMenu';

const Email = () => {
  const [selectedTab, setSelectedTab] = useState('inbox');
  const [selectedEmail, setSelectedEmail] = useState(null);

  const handleTabChange = (tabName) => {
    setSelectedTab(tabName);
    setSelectedEmail(null);
  };

  const handleEmailClick = (email) => {
    setSelectedEmail(email);
    setSelectedTab('emailContent');
  };

  const handleComposeClose = () => {
    setSelectedTab('inbox');
  };


  return (
    <Container sx={{ margin: 0 }}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'centre',
          justifyContent: 'space-between',
        }}>
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
              <EmailContent email={selectedEmail} onDelete={handleTabChange} />
            ) : (
              <EmailInbox onEmailClick={handleEmailClick} maxHeight="400px" />
            )}
          </div>
        )}
      </Paper>
    </Container>
  );
};

export default Email;
