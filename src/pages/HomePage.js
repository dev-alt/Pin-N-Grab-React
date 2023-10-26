import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  TextField,
  useMediaQuery,
  Container,
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import JobDetails from '../components/Job/JobDetails';
import CategoryFilter from '../components/HomePage/CategoryFilter';
import LocationSelect from '../components/LocationSelect';
import locationsData from '../components/Locations';
import { JobTabs } from '../components/HomePage/Tabs';
import {
  sortJobListingsByDate,
  filterJobListings,
  fetchJobListings,
} from '../components/HomePage/SearchAndFilters';
import banner from '../components/Common/banner.png';

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
        selectedCategories.filter((id) => id !== categoryId),
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
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  useEffect(() => {
    fetchJobListings()
      .then((data) => {
        setFilteredJobListings(data);
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
    <Box sx={{ mt: 2 }}>
      {/* filter box */}
      <Box
        sx={{
          backgroundImage: `url(${banner})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          display: 'flex',
          justifyContent: 'center',
          marginBottom: 4,
        }}>
        <Box
          sx={{
            marginTop: 3,
            paddingBottom: '50px',
            width: { xs: '100vw', md: '80vw' },
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

          <Container
            sx={{
              display: 'flex',
              alignItems: 'centre',
              justifyContent: 'center',
              justifyItems: 'center',
              flexDirection: { xs: 'column', md: 'row' },
            }}>
            {/* search */}

            <LocationSelect
              location={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              locationsData={locationsData}
            />

            {/* location filter */}

            <Paper
              elevation={0}
              sx={{
                borderRadius: '10px',
                marginLeft: { xs: 0, md: '20px' },
                padding: '2px',
                marginTop: { xs: '20px', md: 0 },
                width: { xs: '80vw', md: '35vw' },
              }}>
              <TextField
                fullWidth
                variant="standard"
                placeholder="eg.baby sitter, maintainance, painting etc."
                label="What is your skill?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{
                  height: '60px',
                }}
                InputLabelProps={{
                  sx: {
                    fontFamily: 'Montserrat',
                    fontWeight: 'bold',
                    color: '#7a7974',
                    paddingLeft: '8px',
                  },
                }}
              />
            </Paper>
          </Container>
        </Box>
      </Box>
      {/* Listing Masonry */}
      <Grid item xs={12}>
        <Box>
          <JobTabs
            value={value}
            handleChange={handleChange}
            filteredJobListings={filteredJobListings}
            sortedJobs={sortJobListingsByDate(jobListings)}
            handleCardClick={handleCardClick}
          />
          {/* Job detail dialog */}
        </Box>
        <Dialog
          open={isJobDialogOpen}
          onClose={handleJobDialogClose}
          maxWidth={isSmallScreen ? 'sm' : 'lg'}
          fullWidth
          sx={{ mt: 5 }}>
          <JobDetails job={selectedJob} onClose={handleJobDialogClose} />
        </Dialog>
      </Grid>
    </Box>
  );
}
