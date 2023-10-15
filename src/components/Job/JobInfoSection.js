import React from 'react';
import { Box, Typography, Button, Avatar, Divider } from '@mui/material';
import StarRoundedIcon from '@mui/icons-material/StarRounded';

const JobInfoSection = ({ employer }) => {
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '2px',
        }}
      >
        <Avatar />
        <Box>
          <Typography variant="overline" textAlign="center">
            This Job is offered by:{' '}
          </Typography>
          <Typography variant="h5" textAlign="center">
            {employer.userName}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '20px',
        }}
      >
        <Typography>
          <StarRoundedIcon fontSize="small" />
          {employer.rating}
        </Typography>
        {'|'}
        <Typography>{employer.numReviews} Reviews</Typography>
      </Box>
      <Divider variant="fullwidth" light />
      <Typography variant="h6" sx={{ marginTop: '20px' }}>
        userName is happy to pay:{' '}
      </Typography>
      <Typography variant="h4">{employer.amount} NZD </Typography>
      <Button variant="contained" sx={{ width: '1rem', marginTop: '20px' }}>
        Apply
      </Button>
    </Box>
  );
};

export default JobInfoSection;
