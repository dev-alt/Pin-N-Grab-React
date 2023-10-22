import React, { useState } from 'react';
import axios from 'axios';
import {
  TextField,
  Container,
  Typography,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Grid,
  Tooltip,
  IconButton,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import RefreshIcon from '@mui/icons-material/Refresh';
import locationsData from '../components/Locations';
import LocationSelect from '../components/LocationSelect';
import { useAuth } from '../AuthContext';
import PushPinIcon from '@mui/icons-material/PushPin';
import Cookies from 'js-cookie';

export function CreateJob({ onClose }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [details, setDetails] = useState('');
  const [location, setLocation] = useState('');
  const [deadline, setDeadline] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const jobStatus = 'Open';
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [paymentAmountError, setPaymentAmountError] = useState('');
  const { profile } = useAuth();
  const token = Cookies.get('token');

  const openErrorDialog = () => {
    setErrorDialogOpen(true);
  };

  const validatePaymentAmount = (value) => {
    const regex = /^[0-9]*\.?[0-9]*$/;
    return regex.test(value);
  };

  const handleReset = () => {
    setTitle('');
    setDescription('');
    setDetails('');
    setLocation('');
    setDeadline('');
    setPaymentAmount('');
    setSelectedCategory('');
  };

  const handleCreateJob = async () => {
    try {
      const response = await axios.post('/api/jobs/create', {
        title,
        description,
        details,
        location_id: location,
        deadline,
        paymentAmount,
        jobStatus,
        category_id: selectedCategory,
        user_id: profile.profile.UserId,
      },{
        headers: {
          Authorization: token,
        },
      });
      console.log(response.data);
      console.log('Selected Category ID:', selectedCategory);

      if (response.data && response.data.message === 'Job listing created') {
        setErrorMessage('Job pinned.');
        openErrorDialog(); // Open the error dialog;
      } else {
        setErrorMessage('Job creation failed. Please try again.');
        openErrorDialog(); // Open the error dialog
        console.error('Job creation failed');
      }
    } catch (error) {
      setErrorMessage(
        'An error occurred while creating the job. Please try again later.'
      );
      openErrorDialog(); // Open the error dialog
      console.error(error);
    }
  };

  return (
    <Box
      sx={{
        borderRadius: '8px',
        mt: '20px',
      }}
    >
      <Dialog open={errorDialogOpen} onClose={() => setErrorDialogOpen(false)}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <Typography>{errorMessage}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setErrorDialogOpen(false)} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
      <IconButton
        edge="end"
        color="primary"
        onClick={onClose}
        style={{ position: 'absolute', top: '10px', right: '10px' }}
      >
        <CloseIcon />
      </IconButton>
      <Grid container spacing={3}>
        <Container
          sx={{
            borderRadius: 5,
            ml: 2,
            backgroundColor: '#f5f5f5',
            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
          }}
        >
          <Typography variant="h4" textAlign="center" sx={{ mt: 5 }}>
            Pin a Job
          </Typography>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{ style: { color: '#7a7974' } }}
            inputProps={{ maxLength: 100 }}
          />

          <TextField
            label="Description"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{ style: { color: '#7a7974' } }}
            inputProps={{ maxLength: 200 }}
          />
          <TextField
            label="Details"
            multiline
            rows={4}
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{ style: { color: '#7a7974' } }}
          />
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <LocationSelect
                  location={location}
                  onChange={(e) => setLocation(e.target.value)}
                  locationsData={locationsData}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Deadline"
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                    style: { color: '#7a7974' },
                  }}
                  fullWidth
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel style={{ color: '#7a7974' }}>Category</InputLabel>
                <Select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <MenuItem value="" sx={{ color: '#7a7974' }}>
                    Select a category
                  </MenuItem>
                  <MenuItem value="1">Electrical Services</MenuItem>
                  <MenuItem value="2">Moving Services</MenuItem>
                  <MenuItem value="3">Gardening Services</MenuItem>
                  <MenuItem value="4">Painting Services</MenuItem>
                  <MenuItem value="5">Home Repair Services</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Payment Amount"
                value={paymentAmount}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  // Check if the input matches the required format
                  if (validatePaymentAmount(inputValue)) {
                    setPaymentAmount(inputValue);
                    setPaymentAmountError('');
                  } else {
                    setPaymentAmountError(
                      'Invalid payment amount format. Use the format: 100.00'
                    );
                  }
                }}
                fullWidth
                margin="normal"
                InputLabelProps={{ style: { color: '#7a7974' } }}
                error={paymentAmountError !== ''}
                helperText={paymentAmountError}
              />
            </Grid>
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Tooltip title="Reset">
              <IconButton
                variant="contained"
                onClick={handleReset}
                color="secondary"
              >
                <RefreshIcon sx={{ fontSize: '2.5rem' }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Pin">
              <IconButton
                variant="contained"
                onClick={handleCreateJob}
                color="primary"
              >
                <PushPinIcon sx={{ fontSize: '2.5rem' }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Container>
      </Grid>
    </Box>
  );
}

export default CreateJob;
