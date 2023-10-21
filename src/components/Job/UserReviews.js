import React, { useState } from 'react';
import {
  Typography,
  Avatar,
  Box,
  useMediaQuery,
  Divider,
  Dialog,
} from '@mui/material';
import UserProfileView from '../Profile/UserProfileView';

const UserReview = ({ reviewUserName, date, review, rating }) => {
  // For user profile dialog
  const [isUserProfileOpen, setIsUserProfileOpen] = useState(false);
  const openUserProfile = () => {
    setIsUserProfileOpen(true);
  };
  const closeUserProfile = () => {
    setIsUserProfileOpen(false);
  };

  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  return (
    <div key={review.id}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '2px',
        }}>
        <Avatar onClick={openUserProfile} sx={{ cursor: 'pointer' }} />
        <Box>
          <Typography variant="h6">{reviewUserName}</Typography>
          <Typography variant="body1" color="textSecondary">
            {date}{' '}
          </Typography>
          <Typography variant="body1" color="textSecondary">
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
        }>
        {review}
      </Typography>
      <Divider variant="fullwidth" light />
      <Dialog
        open={isUserProfileOpen}
        onClose={closeUserProfile}
        maxWidth="lg"
        fullWidth>
        <UserProfileView />
      </Dialog>
    </div>
  );
};

export default UserReview;
