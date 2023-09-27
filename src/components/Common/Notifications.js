import React, { useState } from 'react';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';


function Notifications({ notifications }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenNotifications = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseNotifications = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>

          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>

            <Notifications notifications={notifications} />

          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Notifications;