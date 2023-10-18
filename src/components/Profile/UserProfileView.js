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
} from '@mui/material';

import HelpIcon from '@mui/icons-material/Help';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PaidIcon from '@mui/icons-material/Paid';
import {
  ElectricalServices,
  LocalFlorist,
  LocalShipping,
  Palette,
  Build,
} from '@mui/icons-material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import UserReview from '../Job/UserReviews';

const jobData = {
  JobName: 'Job Name',
  Deadline: 'dealine date',
  Amount: '$Amount',
};

const hasListedJob = true;

const JobCard = ({ data, iconComponent }) => {
  return (
    <>
      <Card sx={{ margin: '10px' }}>
        <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
          {iconComponent}
          <Typography variant="h6" sx={{ marginLeft: '20px' }}>
            {data.JobName}
          </Typography>
        </CardContent>
        <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            sx={{ display: 'flex', alignItems: 'center', marginRight: '30px' }}
          >
            <CalendarMonthIcon style={{ marginRight: '0.5rem' }} />
            <Typography>{data.Deadline}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <PaidIcon style={{ marginRight: '0.5rem' }} />
            <Typography>{data.Amount}</Typography>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

const UserProfileView = () => {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const [value, setValue] = useState('1');
  const [reviews, setReviews] = useState([]);
  const [user, setUser] = useState(null); // State to store user data

  useEffect(() => {
    // Fetch reviews for the user with ID 20
    fetch(`/api/review/user/20`)
      .then((response) => response.json())
      .then((data) => setReviews(data));
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    // Fetch user data
    fetch('/api/users/20/profile')
      .then((response) => response.json())
      .then((data) => setUser(data));
  }, []);
  console.log(user);

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
      }
    >
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
          }
        >
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Typography variant="h4" sx={{ marginBottom: '20px' }}>
              {user?.username}
            </Typography>
            <Avatar
              sx={
                isSmallScreen
                  ? { width: '100px', height: '100px', marginBottom: '20px' }
                  : { width: '200px', height: '200px', marginBottom: '20px' }
              }
            />
            <Typography variant="h5">
              <strong>{}</strong>
            </Typography>
            <Box sx={{ display: 'flex', marginTop: '20px' }}>
              <Typography
                variant={isSmallScreen ? 'body2' : 'body1'}
                sx={isSmallScreen ? { marginRight: '20px' } : {}}
              >
                {reviews.length} Reviews
              </Typography>

              <Typography
                variant={isSmallScreen ? 'body2' : 'body1'}
                sx={isSmallScreen ? { marginRight: '20px' } : {}}
              >
                {reviews.reduce((total, review) => total + review.rating, 0) /
                  reviews.length}{' '}
                Rating
              </Typography>

              <Typography
                variant={isSmallScreen ? 'body2' : 'body1'}
                sx={
                  isSmallScreen
                    ? { marginRight: '20px', whiteSpace: 'nowrap' }
                    : {}
                }
              >
                Joined:{' '}
                {user?.profile?.createdAt &&
                  new Date(user.profile.createdAt).getFullYear()}
              </Typography>
            </Box>
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
              <JobCard data={jobData} iconComponent={<HelpIcon />} />
              <JobCard data={jobData} iconComponent={<HelpIcon />} />
              <JobCard data={jobData} iconComponent={<HelpIcon />} />
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
              sx={{ marginRight: '20px' }}
            >
              <ElectricalServices fontSize="inherit" /> +1
            </Typography>
            <Typography
              variant="h5"
              color="#433E0E"
              sx={{ marginRight: '20px' }}
            >
              <LocalFlorist fontSize="inherit" /> +1
            </Typography>
            <Typography
              variant="h5"
              color="#433E0E"
              sx={{ marginRight: '20px' }}
            >
              <LocalShipping fontSize="inherit" /> +1
            </Typography>
            <Typography
              variant="h5"
              color="#433E0E"
              sx={{ marginRight: '20px' }}
            >
              <Palette fontSize="inherit" /> +1
            </Typography>
            <Typography
              variant="h5"
              color="#433E0E"
              sx={{ marginRight: '20px' }}
            >
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
                  aria-label="lab API tabs example"
                >
                  <Tab label="From Clients" value="1" />
                  <Tab label="From Workerso" value="2" />
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
                    />
                  ))}
              </TabPanel>
            </TabContext>
          </Box>
        </Box>
      </Container>
    </Container>
  );
};

export default UserProfileView;
