import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Typography,
  useMediaQuery,
  Tab,
  Dialog,
} from '@mui/material';

import JobDetails from '../Job/JobDetails';
import StarIcon from '@mui/icons-material/Star';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import {
  ElectricalServices,
  LocalFlorist,
  LocalShipping,
  Palette,
  Build,
} from '@mui/icons-material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import UserReview from '../Job/UserReviews';
import { fetchJobListings } from '../Job/Listings/GetAllJobs';
import JobCardForProfile from '../Job/JobCardForProfile';

const UserProfileView = ({ userId }) => {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const [value, setValue] = useState('1');
  const [reviews, setReviews] = useState([]);
  const [user, setUser] = useState(null);
  const hasListedJob = true;
  const [jobListings, setJobListings] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isJobDialogOpen, setIsJobDialogOpen] = useState(false);

  const handleJobDialogClose = () => {
    setSelectedJob(null);
    setIsJobDialogOpen(false);
    setTimeout(() => {
      console.log('Selected Job when closing dialog:', selectedJob);
    }, 100);
  };

  const handleCardClick = (job) => {
    try {
      console.log('Selected Job when clicking a card:', job);
      setSelectedJob(job);
      setIsJobDialogOpen(true);
    } catch (error) {
      console.error('Error when clicking a card:', error);
    }
  };

  useEffect(() => {
    fetchJobListings()
      .then((data) => {
        const filteredJobListings = data.filter(
          (job) => job.user_id === userId && job.jobStatus === 'Open',
        );
        setJobListings(filteredJobListings);
        console.log(filteredJobListings);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [userId]);

  useEffect(() => {
    // Fetch user profile
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`/api/users/${userId}/profile`);
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          console.error('Failed to fetch user profile.');
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    // Fetch reviews for the user
    const fetchReviews = async () => {
      try {
        const response = await fetch(`/api/review/user/${userId}`);
        if (response.ok) {
          const reviewData = await response.json();
          setReviews(reviewData);
        } else {
          console.error('Failed to fetch user reviews.');
        }
      } catch (error) {
        console.error('Error fetching user reviews:', error);
      }
    };

    // Call the async functions to fetch data
    fetchUserProfile();
    fetchReviews();
  }, [userId]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getDaySuffix = (day) => {
    if (day >= 11 && day <= 13) {
      return 'th';
    }
    switch (day % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  };

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return (
    <Container
      maxWidth="lg"
      sx={
        isSmallScreen
          ? {
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
            }
          : { display: 'flex', justifyContent: 'center', padding: '2rem' }
      }>
      <Container sx={{ margin: '20px' }}>
        <Card
          sx={
            isSmallScreen
              ? {
                  borderRadius: '9px',
                  padding: '1rem',
                  maxWidth: '600px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }
              : {
                  borderRadius: '9px',
                  padding: '1rem',
                  width: '300px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'fixed',
                }
          }>
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}>
            <Typography variant="h4" sx={{ marginBottom: '20px' }}>
              {user?.username}
            </Typography>
            <Avatar
              src={`/avatars/avatar_${user?.profile.avatar}.jpg`}
              sx={
                isSmallScreen
                  ? { width: '100px', height: '100px', marginBottom: '20px' }
                  : { width: '200px', height: '200px', marginBottom: '20px' }
              }
            />
            <Box sx={{ display: 'flex', marginTop: '20px' }}>
              <Typography
                variant={isSmallScreen ? 'body2' : 'body1'}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  marginRight: isSmallScreen ? '20px' : '0',
                }}>
                <StickyNote2Icon
                  sx={{ fontSize: 'medium', marginRight: '5px' }}
                />
                {reviews.length} Reviews
              </Typography>

              <Typography
                variant={isSmallScreen ? 'body2' : 'body1'}
                sx={{
                  display: 'flex',
                  alignItems: 'center', // Align icons and text vertically
                  marginLeft: '5px',
                }}>
                <StarIcon sx={{ fontSize: 'medium', marginRight: '5px' }} />
                {reviews.reduce((total, review) => total + review.rating, 0) /
                  reviews.length}{' '}
                Rating
              </Typography>
            </Box>

            <Typography
              variant={isSmallScreen ? 'body2' : 'body1'}
              sx={
                isSmallScreen
                  ? { marginRight: '20px', whiteSpace: 'nowrap' }
                  : {}
              }>
              {user?.profile?.createdAt
                ? `Joined ${new Date(
                    user.profile.createdAt,
                  ).getDate()}${getDaySuffix(
                    new Date(user.profile.createdAt).getDate(),
                  )} ${
                    months[new Date(user.profile.createdAt).getMonth()]
                  } ${new Date(user.profile.createdAt).getFullYear()}`
                : ''}
            </Typography>
          </CardContent>
        </Card>
        {isSmallScreen && <Divider light sx={{ marginTop: '40px' }} />}
      </Container>
      <Container>
        <Typography variant={isSmallScreen ? 'h6' : 'h4'} gutterBottom>
          <strong>Hi, I am {user?.username}</strong>
        </Typography>
        <Typography variant="subtitle1" fontFamily="roboto" gutterBottom>
          {user?.profile?.bio}
        </Typography>
        <Divider light />
        <Box component="div" sx={{ marginTop: '30px' }}>
          <Typography variant="h5" gutterBottom>
            <strong>{user?.username}'s Listings</strong>
          </Typography>
          {hasListedJob ? (
            <Box sx={{ overflow: 'auto', height: '300px' }}>
              {jobListings.map((job) => (
                <JobCardForProfile
                  key={job.id}
                  data={job}
                  onCardClick={handleCardClick}
                />
              ))}
            </Box>
          ) : (
            <Typography variant="h6">
              {user?.username} hasn't listed any jobs
            </Typography>
          )}
        </Box>

        <Box component="div" sx={{ marginTop: '30px' }}>
          <Typography variant="h5" gutterBottom>
            <strong>Job Completed</strong>
          </Typography>
          <Box sx={{ display: 'flex', marginTop: '20px' }}>
            <Typography
              variant="h5"
              color="#433E0E"
              sx={{ marginRight: '20px' }}>
              <ElectricalServices fontSize="inherit" /> +1
            </Typography>
            <Typography
              variant="h5"
              color="#433E0E"
              sx={{ marginRight: '20px' }}>
              <LocalFlorist fontSize="inherit" /> +1
            </Typography>
            <Typography
              variant="h5"
              color="#433E0E"
              sx={{ marginRight: '20px' }}>
              <LocalShipping fontSize="inherit" /> +1
            </Typography>
            <Typography
              variant="h5"
              color="#433E0E"
              sx={{ marginRight: '20px' }}>
              <Palette fontSize="inherit" /> +1
            </Typography>
            <Typography
              variant="h5"
              color="#433E0E"
              sx={{ marginRight: '20px' }}>
              <Build fontSize="inherit" /> +1
            </Typography>
          </Box>
        </Box>
        <Box component="div" sx={{ marginTop: '30px' }}>
          <Typography variant="h5" gutterBottom>
            <strong>Reviews</strong>
          </Typography>
          <Box>
            <TabContext value={value}>
              <Box>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example">
                  <Tab label="From Clients" value="1" />
                  <Tab label="From Workers" value="2" />
                </TabList>
              </Box>
              <TabPanel value="1">
                {reviews
                  .filter((review) => review.type === 'Client')
                  .map((review) => (
                    <UserReview
                      key={review.id}
                      reviewUserName={review.Job.User.username}
                      date={review.createdAt}
                      review={review.reviewText}
                      rating={review.rating}
                    />
                  ))}
              </TabPanel>
              <TabPanel value="2">
                {reviews
                  .filter((review) => review.type === 'Worker')
                  .map((review) => (
                    <UserReview
                      key={review.id}
                      reviewUserName={review.Job.User.username}
                      date={review.createdAt}
                      review={review.reviewText}
                      rating={review.rating}
                      userId={review.Job.User.id}
                    />
                  ))}
              </TabPanel>
            </TabContext>
          </Box>
          <Dialog
            open={isJobDialogOpen}
            onClose={handleJobDialogClose}
            maxWidth={{ sm: 'sm', md: 'md' }}
            sx={{ mt: 5 }}>
            <JobDetails job={selectedJob} onClose={handleJobDialogClose} />
          </Dialog>
        </Box>
      </Container>
    </Container>
  );
};

export default UserProfileView;
