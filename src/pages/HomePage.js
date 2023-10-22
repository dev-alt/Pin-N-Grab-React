import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  TextField,
  useMediaQuery,
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import JobDetails from '../components/Job/JobDetails';
import CategoryFilter from '../components/HomePage/CategoryFilter';
import LocationSelect from '../components/LocationSelect';
import locationsData from '../components/Locations';
import { JobTabs } from '../components/HomePage/Tabs';
import { sortJobListingsByDate, filterJobListings, fetchJobListings } from '../components/HomePage/SearchAndFilters';

export function HomePage() {
  const [jobListings, setJobListings] = useState([]);
  const [filteredJobListings, setFilteredJobListings] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isJobDialogOpen, setIsJobDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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
        selectedCategories.filter((id) => id !== categoryId)
      );
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
    handleCategoryFilter();
  };

  const handleCategoryFilter = () => {
    const filteredJobs = filterJobListings({
      jobListings,
      selectedCategories,
      selectedLocation,
      searchQuery,
    });

    setFilteredJobListings(filteredJobs);
  };

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setSelectedLocation('');
    setFilteredJobListings(jobListings);
    setSearchQuery('');
  };

  // Fetch job listings from the server
  useEffect(() => {
    fetchJobListings()
      .then((data) => {
        const sortedData = sortJobListingsByDate(data);
        setJobListings(sortedData);
        setFilteredJobListings(sortedData);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);


  useEffect(() => {
    handleCategoryFilter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategories, selectedLocation, searchQuery]);

  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  
  const [value, setValue] = useState('1');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
            }}
          >
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
                  placeholder="Search by job title"
                  label="Search a job"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        {/* Listing Masonry */}
        <Grid item xs={12}>
          <Box>
            <JobTabs
              value={value}
              handleChange={handleChange}
              filteredJobListings={filteredJobListings}
              sortedJobs={sortJobListingsByDate(jobListings)} // Use the utility function
              handleCardClick={handleCardClick}
            />
            {/* Job detail dialog */}
          </Box>
          <Dialog
            open={isJobDialogOpen}
            onClose={handleJobDialogClose}
            maxWidth={isSmallScreen ? 'sm' : 'lg'}
            fullWidth
          >
            <JobDetails job={selectedJob} onClose={handleJobDialogClose} />
          </Dialog>
        </Grid>
      </Grid>
    </Box>
  );
}
