import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  TextField,
  Grow,
  useMediaQuery,
  Button,
  Tooltip,
  Fade,
} from '@mui/material';

import CardGrid from '../components/CardGrid';
import Dialog from '@mui/material/Dialog';
import { CreateJob } from './PostJob';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import JobDetails from '../components/Job/JobDetails';
import CategoryFilter from '../components/CategoryFilter';
import LocationSelect from '../components/LocationSelect';
import locationsData from '../components/Locations';
import UserProfileView from '../components/Profile/UserProfileView';
import { Container } from '@mui/system';
import CardComponent from '../components/CardComponent';

export function HomePage({ isLoggedIn }) {
  const [username, setUsername] = useState('');
  const [jobListings, setJobListings] = useState([]);
  const [filteredJobListings, setFilteredJobListings] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isCreateJobOpen, setIsCreateJobOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isJobDialogOpen, setIsJobDialogOpen] = useState(false);
  const [isUserProfileOpen, setIsUserProfileOpen] = useState(false);

  const openUserProfile = () => {
    setIsUserProfileOpen(true);
  };

  const closeUserProfile = () => {
    setIsUserProfileOpen(false);
  };
  const openCreateJobDialog = () => {
    setIsCreateJobOpen(true);
  };

  const closeCreateJobDialog = () => {
    setIsCreateJobOpen(false);
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

  const handleJobDialogClose = () => {
    setSelectedJob(null);
    setIsJobDialogOpen(false);
    setTimeout(() => {
      console.log('Selected Job when closing dialog:', selectedJob);
    }, 100); 
  };

  const toggleCategory = (categoryId) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(
        selectedCategories.filter((id) => id !== categoryId),
      );
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
    handleCategoryFilter();
  };

  const handleCategoryFilter = () => {
    const filteredJobs = jobListings.filter((job) => {
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(job.category_id);
      const matchesLocation =
        !selectedLocation || selectedLocation === job.location_id;

      return matchesCategory && matchesLocation;
    });

    setFilteredJobListings(filteredJobs);
  };

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setSelectedLocation('');
    setFilteredJobListings(jobListings);
  };

  useEffect(() => {
    // Retrieve the username from local storage, if available
    const storedUsername = localStorage.getItem('username');
    // Set the username state if it exists in local storage
    if (storedUsername) {
      setUsername(storedUsername);
    }
    // Fetch job listings from the server
    const fetchJobListings = async () => {
      try {
        const response = await fetch('/api/jobs/all');
        if (response.ok) {
          const data = await response.json();
          setJobListings(data);
          setFilteredJobListings(data); // Initialize filtered job listings
        } else {
          console.error('Failed to fetch job listings.');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchJobListings();
  }, []);
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  return (
    <Box sx={{ mt: 5 }}>
      {isLoggedIn ? (
        <p>Welcome, {username}!</p>
      ) : (
        <Grid container justifyContent="center">
          {/* filter box */}
          <Grid item xs={12} sm={10} md={8} lg={6}>
            <Paper
              style={{
                padding: '1rem',
                boxShadow: '0px 0px 10px 1px #a6a48b',
                borderRadius: '50px',
                marginTop: '50px',
              }}>
              <Grid container justifyContent="center" alignItems="center">
                {/* category filter */}
                <Grid item sx={{ mb: 2 }}>
                  <CategoryFilter
                    selectedCategories={selectedCategories}
                    toggleCategory={toggleCategory}
                    handleClearFilters={handleClearFilters}
                  />
                </Grid>
              </Grid>

              <Grid container justifyContent="center">
                {/* search */}
                <Grid item xs={12} sm={10} md={8} lg={6}>
                  <LocationSelect
                    location={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    locationsData={locationsData}
                  />
                </Grid>
                {/* location filter */}
                <Grid item xs={12} sm={10} md={8} lg={6}>
                  <TextField
                    fullWidth
                    variant="standard"
                    placeholder="baby sitter, garderner, handyman,etc."
                    label="Search a job"
                  />
                </Grid>
                {/* Create button */}
                <Grid
                  item
                  xs={12}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '1rem',
                  }}>
                  <Fab
                    variant="extended"
                    color="primary"
                    onClick={openCreateJobDialog}
                    style={{ marginTop: '1rem' }}>
                    <Tooltip title="Create a job">
                      <AddIcon />
                    </Tooltip>
                  </Fab>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Container
            sx={{
              width: '80vw',
              height: '300px',
              border: '1px,solid',
              overflow: 'auto',
              display: 'flex',
            }}>
            {filteredJobListings.map((job, index) => (
              <Box key={index} sx={{ height: 'auto' }}>
                <CardComponent job={job} onCardClick={handleCardClick} />
              </Box>
            ))}
          </Container>
          {/* Listing Masonry */}
          <Grid item xs={12}>
            {/* testing button */}
            <Button variant="outlined" onClick={openUserProfile}>
              Open User Profile
            </Button>
           <CardGrid
              jobListings={filteredJobListings}
              onCardClick={handleCardClick}
            /> 
            {/* Job detail dialog */}

            <Dialog
              open={isJobDialogOpen}
              onClose={handleJobDialogClose}
              maxWidth={isSmallScreen ? 'sm' : 'lg'}
              fullWidth>
              <JobDetails job={selectedJob} onClose={handleJobDialogClose} />
            </Dialog>
          </Grid>
          {/* create job dialog */}
          <Dialog
            open={isCreateJobOpen}
            onClose={closeCreateJobDialog}
            TransitionComponent={Grow}
            transitionDuration={500}
            maxWidth="sm"
            fullWidth>
            <CreateJob onClose={closeCreateJobDialog} />
          </Dialog>
          {/* testing button dialog */}
          <Dialog
            open={isUserProfileOpen}
            onClose={closeUserProfile}
            maxWidth="lg"
            fullWidth>
            <UserProfileView />
          </Dialog>
        </Grid>
      )}
    </Box>
  );
}
