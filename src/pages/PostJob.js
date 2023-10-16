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
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import RefreshIcon from '@mui/icons-material/Refresh';
import locationsData from '../components/Locations';
import LocationSelect from '../components/LocationSelect';

export function CreateJob({ onClose }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [details, setDetails] = useState('');
  const [location, setLocation] = useState('');
  const [deadline, setDeadline] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const jobStatus = 'Open';

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
      });
      console.log(response.data);
      console.log('Selected Category ID:', selectedCategory);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box style={{ position: 'relative', borderRadius: '8px' }}>
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
            boxShadow:
              '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
          }}
        >
          <Typography variant="h4" textAlign="center" sx={{ mt: 5 }}>
            Create a job posting
          </Typography>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{ style: { color: '#7a7974' } }}
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
                label="Payment Type"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
                fullWidth
                margin="normal"
                InputLabelProps={{ style: { color: '#7a7974' } }}
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
                <RefreshIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Post">
              <IconButton
                variant="contained"
                onClick={handleCreateJob}
                color="primary"
              >
                <SendIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Container>
      </Grid>
    </Box>
  );
}

export default CreateJob;
