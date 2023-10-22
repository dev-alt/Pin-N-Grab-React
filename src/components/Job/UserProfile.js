import React from 'react';
import { Box, Typography, Tooltip } from '@mui/material';
import SmsIcon from '@mui/icons-material/Sms';

const UserProfile = ({ job, openMessageDialog, isSmallScreen }) => {
  return (
    <Box>
      <Typography variant="overline" textAlign="center">
        This Job is offered by:
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography
          variant={isSmallScreen ? 'subtitle1' : 'h5'}
          textAlign="center"
        >
          {job.User.username}
        </Typography>
        <Tooltip title="Send message">
          <SmsIcon
            fontSize="small"
            color="primary.main"
            sx={{ margin: '10px', cursor: 'pointer' }}
            onClick={openMessageDialog}
          />
        </Tooltip>
      </Box>
    </Box>
  );
};

export default UserProfile;
