import React from 'react';
import {
  IconButton,
  Typography,
  Box,
  Tooltip,
  useMediaQuery,
} from '@mui/material';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

const JobHeader = ({ job }) => {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {/* Job title */}
      <Typography
        variant={isSmallScreen ? 'h6' : 'h4'}
        color="rgba(20, 8, 14, 1)"
        sx={{ marginLeft: '20px' }}
      >
        {job.title}
      </Typography>
      <IconButton>
        <Tooltip title="Delete Job">
          <DeleteForeverOutlinedIcon
            sx={{
              fontSize: { xs: '1rem', sm: '1.5rem' },
              color: 'error.main',
            }}
          />
        </Tooltip>
      </IconButton>
    </Box>
  );
};

export default JobHeader;
