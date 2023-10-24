import React from 'react';
import { IconButton, Box, Tooltip } from '@mui/material';
import MapsUgcIcon from '@mui/icons-material/MapsUgc';
import MarkAsUnreadIcon from '@mui/icons-material/MarkAsUnread';
const EmailNavMenu = ({ onTabChange }) => {
  const handleTabChange = (tabName) => {
    onTabChange(tabName);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'centre',
        marginLeft: '20px',
        marginTop: '20px',
      }}>
      <Tooltip title="New Message">
        <IconButton
          variant="contained"
          sx={{ color: '#fccf03' }}
          onClick={() => handleTabChange('compose')}>
          <MapsUgcIcon fontSize="large" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Inbox">
        <IconButton
          color="#fccf03"
          value={false}
          sx={{ color: '#fccf03' }}
          onClick={() => handleTabChange('inbox')}>
          <MarkAsUnreadIcon fontSize="large" />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default EmailNavMenu;
