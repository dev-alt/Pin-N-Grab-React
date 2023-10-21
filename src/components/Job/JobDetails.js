import React, { useState, useEffect } from 'react';
import {
  IconButton,
  Typography,
  Paper,
  Stack,
  Grid,
  Box,
  Avatar,
  Divider,
  useMediaQuery,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Container
} from '@mui/material';
import { Close, LocationOn, Favorite } from '@mui/icons-material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import UserReview from './UserReviews';
import ImageCarousel from './ImageCarousel';
import useJobSave from '../useJobSave';
import ApplyButton from './ApplyButton';
import { useAuth } from '../../AuthContext';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import UserProfileView from '../Profile/UserProfileView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getLocationName, renderApplicantsList, paperStyle, closeButtonStyle, labelStyle, images } from './Utils';


async function fetchReviewsForUser(userId, setReviews) {
  try {
    const response = await fetch(`/api/review/user/${userId}`);
    const data = await response.json();
    setReviews(data);
  } catch (error) {
    console.error('Error fetching reviews:', error);
  }
}

// React component for displaying job details
const JobDetails = ({ job, onClose }) => {
  const { isSaved, toggleSaved } = useJobSave(job?.id);
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const [reviews, setReviews] = useState([]);
  const { profile } = useAuth();
  const [applicationResult, setApplicationResult] = useState({ success: true, message: '' });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const isOwner = job && profile && job.user_id === profile.profile.UserId;
  const [isAccordionExpanded, setIsAccordionExpanded] = useState(false);
  const [isUserProfileOpen, setIsUserProfileOpen] = useState(false);
  const currentDateTime = new Date();
  const createdAtDate = job ? new Date(job.createdAt) : null;
  const daysSincePosted = createdAtDate ? Math.floor((currentDateTime - createdAtDate) / (1000 * 60 * 60 * 24)) : 0;

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

  const handleApplicationSubmitted = (message) => {
    setApplicationResult(message);
    setIsDialogOpen(true);
  };

  const handleShowApplicants = () => {
    setIsAccordionExpanded(!isAccordionExpanded);
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
    <Container sx={{
      ...paperStyle,
      padding: 0,
      margin: 0,
    }}>
      {/* Close button */}
      <IconButton sx={closeButtonStyle} onClick={onClose}>
        <Close />
      </IconButton>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {/* Job title */}
        <Typography
          variant={isSmallScreen ? 'h6' : 'h4'}
          color="rgba(20, 8, 14, 1)"
          sx={{ marginLeft: '20px' }}>
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

      {/* Job details */}
      <Grid container spacing={2} justifyContent="flex-start">
        <Grid item xs={12} sm={3}>
          <Typography
            variant="caption"
            color="textSecondary"
            sx={{ marginLeft: '30px' }}>
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
            sx={{ marginRight: '30px' }}>
            {/* Location */}
            <Typography
              variant={isSmallScreen ? 'body2' : 'subtitle1'}
              color="textSecondary">
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
                  color: isSaved ? 'red' : 'gray',
                }}
                onClick={toggleSaved}
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
                sx={{ marginLeft: '20px', marginRight: '20px' }}>
                {job.description}
              </Typography>
              <Typography
                variant={isSmallScreen ? 'body1' : 'h6'}
                sx={{
                  marginLeft: '20px',
                  marginRight: '20px',
                  marginTop: '40px',
                }}>
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
            }}>
            {/* User profile Box */}
            <Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '2px',
                }}>
                <Avatar onClick={openUserProfile} sx={{ cursor: 'pointer' }} />
                <Box>
                  <Typography variant="overline" textAlign="center">
                    This Job is offered by:
                  </Typography>
                  <Typography
                    variant={isSmallScreen ? 'subtitle1' : 'h5'}
                    textAlign="center">
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
                }}>
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
                sx={{ marginTop: '20px' }}>
                {job.User.username} is happy to pay:{' '}
              </Typography>
              <Typography variant={isSmallScreen ? 'h5' : 'h4'}>
                ${job.paymentAmount}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography
                  variant="overline"
                  sx={{ marginTop: '20px' }}
                  color="#BC4B51">
                  Number of Applicants {job.Applications?.length}
                </Typography>

                {job ? (
                  isOwner ? (
                    <Container>
                    <Accordion expanded={isAccordionExpanded} onChange={() => { }}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        onClick={handleShowApplicants}
                      >
                        <Typography>Applicants</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        {renderApplicantsList(job)}
                      </AccordionDetails>
                    </Accordion>
                  </Container>
                  ) : (
                    <ApplyButton job={job} onApplicationSubmitted={handleApplicationSubmitted} />
                  )
                ) : (
                  <p>Loading...</p>
                )
                }

                <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
                  <DialogTitle>Application Result</DialogTitle>
                  <DialogContent>
                    <Typography variant="body1">{applicationResult.message}</Typography>
                  </DialogContent>
                </Dialog>
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
          }}>
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

      <Dialog
        open={isUserProfileOpen}
        onClose={closeUserProfile}
        maxWidth="lg"
        fullWidth>
        <UserProfileView job={job} />
      </Dialog>
    </Container>
  );
};

export default JobDetails;
export { getLocationName };