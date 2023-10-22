import React from 'react';
import { IconButton, Box } from '@mui/material';
import MapsUgcIcon from '@mui/icons-material/MapsUgc';
import MarkAsUnreadIcon from '@mui/icons-material/MarkAsUnread';
const EmailNavMenu = ({ onTabChange }) => {
  const handleTabChange = (tabName) => {
    onTabChange(tabName);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'centre', marginLeft: '20px' }}>
      <IconButton
        variant="contained"
        color="primary"
        onClick={() => handleTabChange('compose')}>
        <MapsUgcIcon />
      </IconButton>
      <IconButton
        color="primary"
        value={false}
        onClick={() => handleTabChange('inbox')}>
        <MarkAsUnreadIcon />
      </IconButton>
    </Box>
  );
};

export default EmailNavMenu;
