import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  TextField,
  Grow,
  useMediaQuery,
  Button,
} from '@mui/material';

import CardGrid from '../components/CardGrid';
import Dialog from '@mui/material/Dialog';
import { CreateJob } from './PostJob';
import JobDetails from '../components/Job/JobDetails';
import CategoryFilter from '../components/CategoryFilter';
import LocationSelect from '../components/LocationSelect';
import locationsData from '../components/Locations';
import SaveJobs from '../components/Job/SavedJobs';
import AppliedJobs from '../components/Job/AppliedJobs';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Email from '../pages/Email';

export function HomePage() {
  const [jobListings, setJobListings] = useState([]);
  const [filteredJobListings, setFilteredJobListings] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isCreateJobOpen, setIsCreateJobOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isJobDialogOpen, setIsJobDialogOpen] = useState(false);
  const [isMessageOpen, setMessageOpen] = useState(false);

  const openCreateJobDialog = () => {
    setIsCreateJobOpen(true);
  };

  const closeCreateJobDialog = () => {
    setIsCreateJobOpen(false);
  };

  const closeMessageDialog = () => {
    setMessageOpen(false);
  };

  const openMessageDialog = () => {
    setMessageOpen(true);
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
  // Fetch job listings from the server
  useEffect(() => {
    // Fetch job listings from the server
    const fetchJobListings = async () => {
      try {
        const response = await fetch('/api/jobs/all');
        if (response.ok) {
          const data = await response.json();

          // Sort the data by createdAt before setting it
          const sortedData = data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
          );

          setJobListings(sortedData);
          setFilteredJobListings(sortedData); // Initialize filtered job listings with sorted data
        } else {
          console.error('Failed to fetch job listings.');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchJobListings();
  }, []);

  useEffect(() => {
    // Handle filter when selectedCategories  change
    handleCategoryFilter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategories, selectedLocation]);

  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  //handle tab value
  const [value, setValue] = useState('1');
  //handle tab change
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  //sort data to chronological order
  const sortedJobs = jobListings.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  );

  return (
    <Box sx={{ mt: 5 }}>
      <Grid container justifyContent="center">
        {/* filter box */}
        <Grid item sm={10} md={8} lg={6} xl={4}>
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
        <Button onClick={openMessageDialog}>Message</Button>
        {/* Listing Masonry */}
        <Grid item xs={12}>
          <Box>
            <TabContext value={value}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <TabList onChange={handleChange} aria-label="tabs">
                  <Tab
                    label="All Jobs"
                    value="1"
                    style={{
                      color: '#000',
                    }}
                    sx={{ fontSize: { xs: '0.5rem', sm: '1rem' } }}
                  />
                  <Tab
                    label="Most Recent Jobs"
                    value="2"
                    style={{ color: '#000' }}
                    sx={{ fontSize: { xs: '0.5rem', sm: '1rem' } }}
                  />
                  <Tab
                    label="Saved Jobs"
                    value="3"
                    style={{ color: '#000' }}
                    sx={{ fontSize: { xs: '0.5rem', sm: '1rem' } }}
                  />
                  <Tab
                    label="Applied Jobs"
                    value="4"
                    style={{ color: '#000' }}
                    sx={{ fontSize: { xs: '0.5rem', sm: '1rem' } }}
                  />
                </TabList>
              </Box>
              <TabPanel value="1">
                {' '}
                <CardGrid
                  jobListings={filteredJobListings}
                  onCardClick={handleCardClick}
                />
              </TabPanel>
              <TabPanel value="2">
                <CardGrid
                  jobListings={sortedJobs}
                  onCardClick={handleCardClick}
                />
              </TabPanel>
              <TabPanel value="3">
                <SaveJobs onCardClick={handleCardClick} />
              </TabPanel>
              <TabPanel value="4">
                <AppliedJobs onCardClick={handleCardClick} />
              </TabPanel>
            </TabContext>
          </Box>
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
          open={isMessageOpen}
          onClose={closeMessageDialog}
          TransitionComponent={Grow}
          transitionDuration={500}
          sx={{ height: '100vh' }}>
          <Email onClose={closeMessageDialog} />
        </Dialog>
        <Dialog
          open={isCreateJobOpen}
          onClose={closeCreateJobDialog}
          TransitionComponent={Grow}
          transitionDuration={500}
          maxWidth="sm"
          fullWidth>
          <CreateJob onClose={closeCreateJobDialog} />
        </Dialog>
      </Grid>
    </Box>
  );
}
