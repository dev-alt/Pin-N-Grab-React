import React from 'react';
import { IconButton, Box, Tooltip } from '@mui/material';
import MapsUgcIcon from '@mui/icons-material/MapsUgc';
import MarkAsUnreadIcon from '@mui/icons-material/MarkAsUnread';
const EmailNavMenu = ({ onTabChange }) => {
  const handleTabChange = (tabName) => {
    onTabChange(tabName);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'centre', marginLeft: '20px' }}>
      <Tooltip title="New Message">
        <IconButton
          variant="contained"
          color="primary"
          onClick={() => handleTabChange('compose')}>
          <MapsUgcIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Inbox">
        <IconButton
          color="primary"
          value={false}
          onClick={() => handleTabChange('inbox')}>
          <MarkAsUnreadIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default EmailNavMenu;
