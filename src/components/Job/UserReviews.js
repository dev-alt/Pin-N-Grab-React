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

const UserReview = ({ reviewUserName, date, review, rating, userId }) => {
  // For user profile dialog
  const [isUserProfileOpen, setIsUserProfileOpen] = useState(false);
  const openUserProfile = () => {
    setIsUserProfileOpen(true);
  };
  const closeUserProfile = () => {
    setIsUserProfileOpen(false);
  };

  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  const reviewerId = userId;

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
        }></Typography>
      <Divider variant="fullwidth" light />
      <Dialog
        open={isUserProfileOpen}
        onClose={closeUserProfile}
        maxWidth="md"
        fullWidth
        sx={{
          height: '80vh',
          mt: 5,
        }}>
        <UserProfileView userId={reviewerId} />
      </Dialog>
    </div>
  );
};

export default UserReview;
