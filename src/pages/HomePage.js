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
import RecentJob from '../components/Job/RecentJob';
import SaveJobs from '../components/Job/SavedJobs';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

export function HomePage() {
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

  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ mt: 5 }}>
      <Grid container justifyContent="center">
        {/* filter box */}
        <Grid item xs={12} sm={10} md={8} lg={6}>
          <Paper
            style={{
              padding: '30px',
              boxShadow: '0px 0px 10px 1px #a6a48b',
              borderRadius: '50px',
              marginTop: '50px',
              paddingBottom: '50px',
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
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} sx={{ justifyItems: 'center' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: { sm: '100vw', md: 'auto' },
            }}>
            {/* Create button */}
            <Fab
              color="primary"
              onClick={openCreateJobDialog}
              style={{ marginTop: '1rem' }}>
              <Tooltip title="Pin a job">
                <AddIcon />
              </Tooltip>
            </Fab>

            <Box>
              <TabContext value={value}>
                <Box sx={{ marginBottom: '-20px' }}>
                  <TabList
                    onChange={handleChange}
                    aria-label="slider container">
                    <Tab
                      label="Most Recent Pinned"
                      value="1"
                      style={{ color: '#c7a602', fontWeight: 'bolder' }}
                    />
                    <Tab
                      label="Saved Jobs"
                      value="2"
                      style={{ color: '#c7a602', fontWeight: 'bolder' }}
                    />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  {/* recent listed rob */}
                  <RecentJob
                    jobs={filteredJobListings}
                    onCardClick={handleCardClick}
                  />
                </TabPanel>
                <TabPanel value="2">
                  {/* Saved jobs*/}
                  <SaveJobs onCardClick={handleCardClick} />
                </TabPanel>
              </TabContext>
            </Box>
          </Box>
        </Grid>

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
    </Box>
  );
}
