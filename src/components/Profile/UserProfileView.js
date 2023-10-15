import React, { useState } from 'react';
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

const UserReview = ({ reviewUserName, date, review }) => {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  return (
    <>
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
      <Divider fullwidth light sx={{ marginBottom: '20px' }} />
    </>
  );
};

const UserProfileView = () => {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
            <Avatar
              sx={
                isSmallScreen
                  ? { width: '100px', height: '100px', marginBottom: '20px' }
                  : { width: '200px', height: '200px', marginBottom: '20px' }
              }
            />
            <Typography variant="h5">
              <strong>UserName</strong>
            </Typography>
            <Box sx={{ display: 'flex', marginTop: '20px' }}>
              <Typography
                variant={isSmallScreen ? 'body2' : 'body1'}
                sx={isSmallScreen && { marginRight: '20px' }}
              >
                number Reviews
              </Typography>
              <Typography
                variant={isSmallScreen ? 'body2' : 'body1'}
                sx={isSmallScreen && { marginRight: '20px' }}
              >
                value Ratings
              </Typography>
              <Typography
                variant={isSmallScreen ? 'body2' : 'body1'}
                sx={
                  isSmallScreen && { marginRight: '20px', whiteSpace: 'nowrap' }
                }
              >
                Join since year
              </Typography>
            </Box>
          </CardContent>
        </Card>
        {isSmallScreen && (
          <Divider fullwidth light sx={{ marginTop: '40px' }} />
        )}
      </Container>
      <Container>
        <Typography variant={isSmallScreen ? 'h6' : 'h4'} gutterBottom>
          <strong>Hi, I am UserName</strong>
        </Typography>
        <Typography
          variant={isSmallScreen ? 'subtitle1' : 'h5'}
          fontFamily="roboto"
          gutterBottom
        >
          This is my Bio: Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Aspernatur veritatis voluptas consequatur autem deleniti
          recusandae, incidunt aliquid ipsum mollitia illo eligendi quasi
          placeat quis ut commodi earum reprehenderit ducimus harum!
        </Typography>
        <Divider fullwidth light />
        <Box component="div" sx={{ marginTop: '30px' }}>
          <Typography variant="h5" gutterBottom>
            <strong>UserName's Listings</strong>
          </Typography>
          {hasListedJob ? (
            <Box sx={{ overflow: 'auto', height: '300px' }}>
              <JobCard data={jobData} iconComponent={<HelpIcon />} />
              <JobCard data={jobData} iconComponent={<HelpIcon />} />
              <JobCard data={jobData} iconComponent={<HelpIcon />} />
            </Box>
          ) : (
            <Typography variant="h6">
              UserName hasn't listed any jobs
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
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab label="From Clients" value="1" />
                  <Tab label="From Workerso" value="2" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <UserReview
                  reviewUserName="useName"
                  date="date"
                  review="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur veritatis voluptas consequatur autem deleniti recusandae, incidunt aliquid ipsum mollitia illo eligendi quasi placeat quis ut commodi earum reprehenderit ducimus harum!'"
                />
                <UserReview
                  reviewUserName="useName"
                  date="date"
                  review="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur veritatis voluptas consequatur autem deleniti recusandae, incidunt aliquid ipsum mollitia illo eligendi quasi placeat quis ut commodi earum reprehenderit ducimus harum!'"
                />
              </TabPanel>
              <TabPanel value="2">
                <UserReview
                  reviewUserName="useName"
                  date="date"
                  review="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur veritatis voluptas consequatur autem deleniti recusandae, incidunt aliquid ipsum mollitia illo eligendi quasi placeat quis ut commodi earum reprehenderit ducimus harum!'"
                />
                <UserReview
                  reviewUserName="useName"
                  date="date"
                  review="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur veritatis voluptas consequatur autem deleniti recusandae, incidunt aliquid ipsum mollitia illo eligendi quasi placeat quis ut commodi earum reprehenderit ducimus harum!'"
                />
              </TabPanel>
            </TabContext>
          </Box>
        </Box>
      </Container>
    </Container>
  );
};

export default UserProfileView;
