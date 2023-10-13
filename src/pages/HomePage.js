import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  IconButton,
  Paper, // Import Paper component
  TextField,
} from '@mui/material';
import {
  Build,
  Clear,
  ElectricalServices,
  LocalFlorist,
  LocalShipping,
  Palette,
} from '@mui/icons-material';
import CardGrid from './CardGrid';
import Dropdown from '../components/DropDown';
import Dialog from '@mui/material/Dialog';
import { CreateJob } from './PostJob';
import Fab from '@mui/material/Fab'; // Import Fab component
import AddIcon from '@mui/icons-material/Add'; // Import the add icon

export function HomePage({ isLoggedIn }) {
  const [username, setUsername] = useState('');
  const [jobListings, setJobListings] = useState([]);
  const [filteredJobListings, setFilteredJobListings] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [availableLocations, setAvailableLocations] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isCreateJobOpen, setIsCreateJobOpen] = useState(false);

  const openCreateJobDialog = () => {
    setIsCreateJobOpen(true);
  };

  const closeCreateJobDialog = () => {
    setIsCreateJobOpen(false);
  };

  const toggleCategory = (categoryId) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter((id) => id !== categoryId));
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
    handleCategoryFilter();
  };

  const handleCategoryFilter = () => {
    const filteredJobs = jobListings.filter((job) => {
      const matchesCategory =
        selectedCategories.length === 0 || selectedCategories.includes(job.category_id);

      return matchesCategory;
    });

    setFilteredJobListings(filteredJobs);
  };

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setSelectedLocation('');
    setFilteredJobListings(jobListings);
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');

    if (storedUsername) {
      setUsername(storedUsername);
    }

    const fetchJobListings = async () => {
      try {
        const response = await fetch('/api/jobs/all');
        if (response.ok) {
          const data = await response.json();
          setJobListings(data);
        } else {
          console.error('Failed to fetch job listings.');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchJobListings();
  }, []);

  return (
    <Box sx={{ mt: 5 }}>
      {isLoggedIn ? (
        <p>Welcome, {username}!</p>
      ) : (
        <Grid container justifyContent="center">
  
          <Grid item xs={6}>
            <Paper style={{ padding: '1rem' }}>
            <Grid container justifyContent="center" alignItems="center">
              <Grid item>
                <IconButton
                  color={selectedCategories.includes(1) ? 'secondary' : 'primary'}
                  onClick={() => toggleCategory(1)}
                >
                  <ElectricalServices />
                </IconButton>
                <IconButton
                  color={selectedCategories.includes(2) ? 'secondary' : 'primary'}
                  onClick={() => toggleCategory(2)}
                >
                  <LocalFlorist />
                </IconButton>
                <IconButton
                  color={selectedCategories.includes(3) ? 'secondary' : 'primary'}
                  onClick={() => toggleCategory(3)}
                >
                  <LocalShipping />
                </IconButton>
                <IconButton
                  color={selectedCategories.includes(4) ? 'secondary' : 'primary'}
                  onClick={() => toggleCategory(4)}
                >
                  <Palette />
                </IconButton>
                <IconButton
                  color={selectedCategories.includes(5) ? 'secondary' : 'primary'}
                  onClick={() => toggleCategory(5)}
                >
                  <Build />
                </IconButton>
                <IconButton color="primary" onClick={handleClearFilters}>
                  <Clear />
                </IconButton>
              </Grid>
            </Grid>
              <Grid container justifyContent="center">
                <Grid item xs={12} sm={4} md={3} style={{ marginRight: '1rem' }}>
                  <TextField fullWidth variant="outlined" placeholder="Search..." />
                </Grid>
                <Grid item xs={12} sm={4} md={3}>
                  <Dropdown
                    label="Location"
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
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
            <CardGrid jobListings={filteredJobListings} />
          </Grid>
          <Dialog open={isCreateJobOpen} onClose={closeCreateJobDialog}>
            <CreateJob />
            <Button variant="contained" color="primary" onClick={closeCreateJobDialog}>
              Close
            </Button>
          </Dialog>
        </Grid>
      )}
    </Box>
  );
}