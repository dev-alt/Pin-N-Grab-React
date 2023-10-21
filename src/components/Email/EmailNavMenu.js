import React from 'react';
import { Button, Paper, Tab, Tabs } from '@mui/material';

const EmailNavMenu = ({ onTabChange }) => {
  const handleTabChange = (tabName) => {
    onTabChange(tabName);
  };

  return (
    <Paper elevation={3} sx={{ padding: '16px' }}>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={() => handleTabChange('compose')}
      >
        Compose
      </Button>
      <Tabs
        textColor="primary"
        orientation="vertical"
        variant="scrollable"
        value={false}
      >
        <Tab label="Inbox" onClick={() => handleTabChange('inbox')} />
      </Tabs>
    </Paper>
  );
};

export default EmailNavMenu;
