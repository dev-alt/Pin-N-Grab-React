import React, { useState, useEffect } from 'react';
import {
  IconButton,
  Typography,
  Paper,
  Grid,
  Box,
  Avatar,
  Divider,
  useMediaQuery,
  Dialog,
  Container,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import ImageCarousel from './ImageCarousel';
import useJobSave from '../useJobSave';
import { useAuth } from '../../AuthContext';
import UserProfileView from '../Profile/UserProfileView';
import {
  paperStyle,
  closeButtonStyle,
  labelStyle,
  images,
  fetchReviewsForUser,
} from './Utils';
import EmailCompose from '../Email/EmailCompose';
import JobHeader from './JobHeader';
import JobDescription from './JobDescription';
import UserProfile from './UserProfile';
import UserReviewsPage from './UserReviewPage';
import JobDetailsSection from './JobDetailSection';
import ApplicationSection from './ApplicationSection';

// React component for displaying job details
const JobDetails = ({ job, onClose }) => {
  const { toggleSaved } = useJobSave(job?.id);
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const [reviews, setReviews] = useState([]);
  const { profile } = useAuth();
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);
  const isOwner = job && profile && job.user_id === profile.profile.UserId;
  const [isUserProfileOpen, setIsUserProfileOpen] = useState(false);
  const currentDateTime = new Date();
  const createdAtDate = job ? new Date(job.createdAt) : null;
  const daysSincePosted = createdAtDate
    ? Math.floor((currentDateTime - createdAtDate) / (1000 * 60 * 60 * 24))
    : 0;

  const openUserProfile = () => {
    setIsUserProfileOpen(true);
  };
  const closeUserProfile = () => {
    setIsUserProfileOpen(false);
  };

  useEffect(() => {
    if (job) {
      fetchReviewsForUser(job.user_id, setReviews);
    } else {
      setReviews([]);
    }
  }, [job]);

  const closeMessageDialog = () => {
    setIsMessageDialogOpen(false);
  };

  const openMessageDialog = () => {
    setIsMessageDialogOpen(true);
  };

  if (!job) {
    return (
      <Paper sx={paperStyle}>
        <IconButton sx={closeButtonStyle} onClick={onClose}>
          <Close />
        </IconButton>
        <Typography
          variant="h6"
          color="rgba(20, 8, 14, 1)"
          sx={{ marginLeft: '20px' }}>
          No job details available.
        </Typography>
      </Paper>
    );
  }

  // Render the job details and components
  return (
    <Container sx={{ ...paperStyle, margin: 0 }}>
      {/* Close button */}
      <IconButton sx={closeButtonStyle} onClick={onClose}>
        <Close />
      </IconButton>

      <JobHeader job={job} isOwner={isOwner} />

      {/* Job details */}
      <JobDetailsSection
        daysSincePosted={daysSincePosted}
        isSmallScreen={isSmallScreen}
        job={job}
        toggleSaved={toggleSaved}
        labelStyle={labelStyle}
      />

      {/* Divider */}
      <Divider variant="middle" light sx={{ marginBottom: '20px' }} />
      <Grid container spacing={2} justifyContent="flex-start">
        <Grid item xs={12} md={8}>
          {/* Job description */}
          <JobDescription job={job} isSmallScreen={isSmallScreen} />
        </Grid>
        {/* User details and offer */}
        <Grid item xs={12} md={4}>
          {/* User profile Box */}
          <Paper
            elevation={0}
            sx={{
              display: 'flex',
              padding: '1rem',
              border: '0.5px solid #d2d2d4 ',
              borderRadius: '8px',
              justifyContent: 'center',
            }}>
            <Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '2px',
                }}>
                <Avatar onClick={openUserProfile} sx={{ cursor: 'pointer' }} />
                <UserProfile
                  job={job}
                  openUserProfile={openUserProfile}
                  openMessageDialog={openMessageDialog}
                  isSmallScreen={isSmallScreen}
                />
              </Box>

              {/* Divider */}
              <Divider variant="fullwidth" light />

              <Typography
                variant={isSmallScreen ? 'subtitle1' : 'h6'}
                sx={{ marginTop: '20px' }}>
                {job.User.username} is happy to pay:{' '}
              </Typography>
              <Typography variant={isSmallScreen ? 'h5' : 'h4'}>
                ${job.paymentAmount}
              </Typography>

              {/* Applications */}
              <ApplicationSection job={job} isOwner={isOwner} />
            </Box>
          </Paper>
        </Grid>
      </Grid>
      {/* Image carousel */}
      <ImageCarousel images={images} />

      {/* Divider */}
      <Divider variant="fullwidth" light sx={{ marginTop: '30px' }} />

      {/* User reviews and ratings */}

      <UserReviewsPage reviews={reviews} isSmallScreen={isSmallScreen} />

      <Dialog
        open={isUserProfileOpen}
        onClose={closeUserProfile}
        maxWidth="md"
        fullWidth
        sx={{
          height: '80vh',
          mt: 12,
        }}>
        <UserProfileView userId={job.user_id} />
      </Dialog>
      <Dialog
        open={isMessageDialogOpen}
        onClose={closeMessageDialog}
        maxWidth="md"
        fullWidth
        sx={{
          height: '80vh',
          margin: '0 auto',
          marginTop: '5vh',
          padding: '20px',
        }}>
        <EmailCompose onClose={closeMessageDialog} />
      </Dialog>
    </Container>
  );
};

export default JobDetails;
