import React from 'react';
import { Typography, Avatar, Box, useMediaQuery, Divider } from '@mui/material';

const UserReview = ({ reviewUserName, date, review, rating }) => {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  return (
    
    <div key={review.id}> 
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
          <Typography variant="h6">{reviewUserName}</Typography>
          <Typography variant="body1" color="grey">
            {date}{' '}
          </Typography>
          <Typography variant="body1" color="grey">
            Rating: {rating}{' '}
          </Typography>
        </Box>
      </Box>
      <Typography
        variant={isSmallScreen ? 'body1' : 'h6'}
        sx={
          isSmallScreen
            ? { marginRight: '10px', marginLeft: '10px', marginBottom: '40px' }
            : { marginLeft: '20px', marginBottom: '40px', marginRight: '40px' }
        }
      >
        {review}
      </Typography>
      <Divider variant="fullwidth" light />
    </div>
  );
};

export default UserReview;
