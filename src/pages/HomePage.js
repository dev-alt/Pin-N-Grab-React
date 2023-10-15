import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  TextField,
  Grow,
  useMediaQuery,
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

export function HomePage({ isLoggedIn }) {
  const [username, setUsername] = useState('');
  const [jobListings, setJobListings] = useState([]);
  const [filteredJobListings, setFilteredJobListings] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isCreateJobOpen, setIsCreateJobOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isJobDialogOpen, setIsJobDialogOpen] = useState(false);

  const openCreateJobDialog = () => {
    setIsCreateJobOpen(true);
  };

  const closeCreateJobDialog = () => {
    setIsCreateJobOpen(false);
  };
  const handleCardClick = (job) => {
    setSelectedJob(job);
    setIsJobDialogOpen(true);
  };

  const handleJobDialogClose = () => {
    setSelectedJob(null);
    setIsJobDialogOpen(false);
  };

  const toggleCategory = (categoryId) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(
        selectedCategories.filter((id) => id !== categoryId)
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
          <Grid item xs={12} sm={10} md={8} lg={6}>
            <Paper
              style={{
                padding: '1rem',
                boxShadow: '0px 0px 15px 5px rgba(0,0,0,0.2)',
              }}
            >
              <Grid container justifyContent="center" alignItems="center">
                <Grid item sx={{ mb: 2 }}>
                  <CategoryFilter
                    selectedCategories={selectedCategories}
                    toggleCategory={toggleCategory}
                    handleClearFilters={handleClearFilters}
                  />
                </Grid>
              </Grid>
              <Grid container justifyContent="center">
                <Grid item xs={12} sm={10} md={8} lg={6}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search..."
                  />
                </Grid>
                <Grid item xs={12} sm={10} md={8} lg={6}>
                  <LocationSelect
                    location={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    locationsData={locationsData}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '1rem',
                  }}
                >
                  <Fab
                    variant="extended"
                    color="primary"
                    onClick={openCreateJobDialog}
                    style={{ marginTop: '1rem' }}
                  >
                    <AddIcon />
                  </Fab>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <CardGrid
              jobListings={filteredJobListings}
              onCardClick={handleCardClick}
            />
            {/* <JobDetails job={selectedJob} open={isJobDialogOpen} onClose={handleJobDialogClose} /> */}
            <Dialog
              open={isJobDialogOpen}
              onClose={handleJobDialogClose}
              maxWidth={isSmallScreen ? 'sm' : 'lg'}
              fullWidth
            >
              <JobDetails
                job={selectedJob}
                open={isJobDialogOpen}
                onClose={handleJobDialogClose}
              />
            </Dialog>
          </Grid>
          <Dialog
            open={isCreateJobOpen}
            onClose={closeCreateJobDialog}
            TransitionComponent={Grow}
            transitionDuration={500}
            maxWidth="sm"
            fullWidth
          >
            <CreateJob onClose={closeCreateJobDialog} />
          </Dialog>
        </Grid>
      )}
    </Box>
  );
}
