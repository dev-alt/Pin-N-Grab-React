import React from 'react';
import { Typography, Avatar, Box, useMediaQuery } from '@mui/material';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import Rating from '@mui/material/Rating'; // Import the Rating component from Material-UI

const UserRatings = ({ text, value, rating }) => {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  return (
    <Box
      sx={
        isSmallScreen
          ? { marginBottom: '20px' }
          : {
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '20px',
            }
      }
    >
      <Typography gutterBottom variant="body1">
        <strong>{text}</strong>
      </Typography>
      <Box
        sx={
          isSmallScreen
            ? {
                display: 'flex',
                alignItems: 'centre',
                justifyContent: 'space-between',
                gap: '10px',
                marginBottom: '20px',
              }
            : {
                marginBottom: '20px',
                display: 'flex',
                flexDirection: 'row',
                gap: '5px',
              }
        }
      >
        <Rating
          name="read-only"
          value={value}
          readOnly
          icon={<InsertEmoticonIcon fontSize="inherit" />}
          emptyIcon={<InsertEmoticonIcon fontSize="inherit" />}
        />

        <Typography variant={isSmallScreen ? 'body2' : 'body1'}>
          {rating}
        </Typography>
      </Box>
    </Box>
  );
};
export default UserRatings;
