import React from 'react';
import {
  IconButton,
  Typography,
  Box,
  Tooltip,
  useMediaQuery,
} from '@mui/material';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import axios from 'axios';
import Cookies from 'js-cookie';

const JobHeader = ({ job, isOwner }) => {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const token = Cookies.get('token');

  const handleDeleteJob = async () => {
    try {
      const config = {
        headers: { Authorization: token },
      };
      await axios.patch(
        `/api/jobs/${job.id}/close`,
        { status: 'closed' },
        config,
      );
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mt: '20px' }}>
      {/* Job title */}
      <Typography
        variant={isSmallScreen ? 'h6' : 'h4'}
        color="rgba(20, 8, 14, 1)"
        sx={{ marginLeft: '20px' }}
      >
        {job.title}
      </Typography>
      {isOwner && ( // Conditionally render the delete button if the user is the owner
        <IconButton onClick={handleDeleteJob}>
          <Tooltip title="Delete Job">
            <DeleteForeverOutlinedIcon
              sx={{
                fontSize: { xs: '1rem', sm: '1.5rem' },
                color: 'error.main',
              }}
            />
          </Tooltip>
        </IconButton>
      )}
    </Box>
  );
};

export default JobHeader;
