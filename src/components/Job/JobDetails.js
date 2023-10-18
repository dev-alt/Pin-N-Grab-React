import React, { useState, useEffect } from 'react';
import {
  IconButton,
  Typography,
  Paper,
  Stack,
  Button,
  Grid,
  Box,
  Avatar,
  Divider,
  useMediaQuery,
} from '@mui/material';
import { Close, LocationOn, Favorite } from '@mui/icons-material';
import locationsData from '../Locations';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import UserReview from './UserReviews';
import ImageCarousel from './ImageCarousel';
import { useAuth } from '../../AuthContext';
import useJobSave from '../useJobSave';
import { Container } from '@mui/system';

// Function to get the location name based on locationId
const getLocationName = (locationId) => {
  const location = locationsData.find((item) => item.id === locationId);
  if (location) {
    return `${location.cityName}, ${location.regionName}`;
  } else {
    return 'Unknown Location';
  }
};

// Styling definitions
const paperStyle = {
  padding: '1rem',
  margin: '1rem',
  boxShadow: '0px 0px 15px 5px rgba(0, 0, 0, 0.2)',
};

const closeButtonStyle = {
  position: 'absolute',
  top: '10px',
  right: '10px',
};

const labelStyle = {
  fontWeight: 'bold',
};

// Static image data
const images = [
  {
    imgUrl: 'https://picsum.photos/id/0/5000/3333',
    alt: 'Image 1 Alt Text',
  },
  {
    imgUrl: 'https://picsum.photos/id/4/5000/3333',
    alt: 'Image 2 Alt Text',
  },
  {
    imgUrl: 'https://picsum.photos/id/8/5000/3333',
    alt: 'Image 3 Alt Text',
  },
  // Add more objects as needed
];

// React component for displaying job details
const JobDetails = ({ job, onClose }) => {
  const { profile } = useAuth();
  const userId = profile.UserId;
  const { isSaved, toggleSaved } = useJobSave(job?.id);
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (job) {
      // Fetch reviews for the user associated with the selected job
      fetch(`/api/review/user/${job.user_id}`)
        .then((response) => response.json())
        .then((data) => setReviews(data));
    } else {
      setReviews([]); // Clear the reviews if job is null
    }
  }, [job]);

  if (!job) {
    return (
      <Paper sx={paperStyle}>
        <IconButton sx={closeButtonStyle} onClick={onClose}>
          <Close />
        </IconButton>
        <Typography
          variant="h6"
          color="rgba(20, 8, 14, 1)"
          sx={{ marginLeft: '20px' }}
        >
          No job details available.
        </Typography>
      </Paper>
    );
  }

  const currentDateTime = new Date();
  const createdAtDate = job ? new Date(job.createdAt) : null;
  const daysSincePosted = createdAtDate
    ? Math.floor((currentDateTime - createdAtDate) / (1000 * 60 * 60 * 24))
    : 0;

  // Render the job details and components
  return (
    <Container sx={paperStyle}>
      {/* Close button */}
      <IconButton sx={closeButtonStyle} onClick={onClose}>
        <Close />
      </IconButton>

      {/* Job title */}
      <Typography
        variant={isSmallScreen ? 'h6' : 'h4'}
        color="rgba(20, 8, 14, 1)"
        sx={{ marginLeft: '20px' }}
      >
        {job.title}
      </Typography>

      {/* Job details */}
      <Grid container spacing={2} justifyContent="flex-start">
        <Grid item xs={12} sm={3}>
          <Typography
            variant="caption"
            color="textSecondary"
            sx={{ marginLeft: '30px' }}
          >
            {daysSincePosted > 0
              ? `Posted ${daysSincePosted} days ago`
              : 'Posted today'}
          </Typography>
        </Grid>

        <Grid item xs={12} sm={9}>
          <Stack
            spacing={2}
            direction={isSmallScreen ? 'column' : 'row'}
            justifyContent="flex-end"
            sx={{ marginRight: '30px' }}
          >
            {/* Location */}
            <Typography
              variant={isSmallScreen ? 'body2' : 'subtitle1'}
              color="textSecondary"
            >
              <LocationOn /> {getLocationName(job.location_id)}
            </Typography>

            {/* Deadline */}
            <Typography variant="body2">
              <CalendarMonthIcon style={{ marginRight: '0.5rem' }} />
              <span sx={labelStyle}>Deadline:</span> {job.deadline}
            </Typography>
            <Grid item>
              <Favorite
                fontSize="medium"
                sx={{
                  cursor: 'pointer',
                  color: isSaved ? 'red' : 'gray', // Toggle the color based on the save state
                }}
                onClick={toggleSaved} // Toggle the save state on click
              />
            </Grid>
          </Stack>
        </Grid>
      </Grid>

      {/* Divider */}
      <Divider variant="middle" light />

      {/* Job description */}
      <Grid container spacing={3} sx={{ marginTop: '1rem' }}>
        <Grid item xs={12} md={8}>
          <Box>
            <Box>
              <Typography
                variant={isSmallScreen ? 'body1' : 'h6'}
                sx={{ marginLeft: '20px', marginRight: '20px' }}
              >
                {job.description}
              </Typography>
              <Typography
                variant={isSmallScreen ? 'body1' : 'h6'}
                sx={{
                  marginLeft: '20px',
                  marginRight: '20px',
                  marginTop: '40px',
                }}
              >
                <strong>Details </strong>
                <br />
                {job.details}
              </Typography>
            </Box>
          </Box>
        </Grid>

        {/* User details and offer */}
        <Grid item xs={12} md={4}>
          <Paper
            elevation={0}
            sx={{
              display: 'flex',
              padding: '1rem',
              border: '0.5px solid #d2d2d4 ',
              borderRadius: '8px',
              justifyContent: 'center',
            }}
          >
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
                    This Job is offered by:
                  </Typography>
                  <Typography
                    variant={isSmallScreen ? 'subtitle1' : 'h5'}
                    textAlign="center"
                  >
                    {job.User.username}
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
                  5.0
                </Typography>
                {'|'}
                <Typography>number Reviews</Typography>
              </Box>

              {/* Divider */}
              <Divider variant="fullwidth" light />

              <Typography
                variant={isSmallScreen ? 'subtitle1' : 'h6'}
                sx={{ marginTop: '20px' }}
              >
                {job.User.username} is happy to pay:{' '}
              </Typography>
              <Typography variant={isSmallScreen ? 'h5' : 'h4'}>
                ${job.paymentAmount}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography
                  variant="overline"
                  sx={{ marginTop: '20px' }}
                  color="#BC4B51"
                >
                  Number of Applicants {job.Applications?.length}
                </Typography>

                <Button
                  variant="contained"
                  sx={{ width: '1rem', marginTop: '20px' }}
                >
                  Apply
                </Button>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Image carousel */}
      <ImageCarousel images={images} />

      {/* Divider */}
      <Divider variant="fullwidth" light sx={{ marginTop: '30px' }} />

      {/* User reviews and ratings */}
      <Box sx={{ margin: '30px' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '20px',
            marginTop: '30px',
          }}
        >
          <Typography gutterBottom variant={isSmallScreen ? 'h6' : 'h5'}>
            <StarRoundedIcon fontSize="inherit" />
            5.0
          </Typography>
          {'|'}
          <Typography variant={isSmallScreen ? 'h6' : 'h5'}>
            number Reviews
          </Typography>
        </Box>

        {/* User reviews */}
        <Grid container sx={{ marginRight: '20px', marginTop: '40px' }}>
          {reviews.map((review) => (
            <Grid item xs={12} sm={6} key={review.id}>
              <UserReview
                key={review.id}
                reviewUserName={review.Job.User.username}
                date={review.createdAt}
                review={review.reviewText}
                rating={review.rating}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default JobDetails;
