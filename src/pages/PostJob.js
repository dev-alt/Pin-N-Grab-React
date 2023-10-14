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

export function CreateJob({ onClose }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [deadline, setDeadline] = useState('');
  const [paymentType, setPaymentType] = useState('');
  const [skillLevel, setSkillLevel] = useState('');
  const [experienceRequired, setExperienceRequired] = useState('');
  const [jobStatus, setJobStatus] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleReset = () => {
    setTitle('');
    setDescription('');
    setLocation('');
    setDeadline('');
    setPaymentType('');
    setSkillLevel('');
    setExperienceRequired('');
    setJobStatus('');
    setSelectedCategory('');
  };

  const handleCreateJob = async () => {
    try {
      const response = await axios.post('/api/jobs/create', {
        title,
        description,
        location_id: location,
        deadline,
        paymentType,
        skillLevel,
        experienceRequired,
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
      <Box style={{ position: 'relative', borderRadius: '8px'}}>
        <IconButton
          edge="end"
          color="primary"
          onClick={onClose} 
          style={{ position: 'absolute', top: '10px', right: '10px' }}
        >
          <CloseIcon />
        </IconButton>
        <Grid container spacing={3}>
          <Container sx={{ borderRadius: 5, ml: 2, backgroundColor: "#f5f5f5", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }}>
            <Typography variant="h3" textAlign="center" sx={{ mt: 2.5 }}>Create Job</Typography>
            <TextField
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              margin="normal"
              InputLabelProps={{ style: { color: "#7a7974" } }}

            />
            <TextField
              label="Description"
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              margin="normal"
              InputLabelProps={{ style: { color: "#7a7974" } }}
            />
            <Grid item xs={12} >
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel style={{ color: "#7a7974" }}>Location</InputLabel>
                    <Select
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    >
                      <MenuItem value="">Select a location</MenuItem>
                      {locationsData.map((location) => (
                        <MenuItem key={location.id} value={location.id}>
                          {`${location.cityName}, ${location.regionName}`}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Deadline"
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    InputLabelProps={{
                      shrink: true, style: { color: "#7a7974" }
                    }}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} >
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <TextField
                    label="Payment Type"
                    value={paymentType}
                    onChange={(e) => setPaymentType(e.target.value)}
                    fullWidth
                    margin="normal" InputLabelProps={{ style: { color: "#7a7974" } }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Skill Level"
                    value={skillLevel}
                    onChange={(e) => setSkillLevel(e.target.value)}
                    fullWidth
                    margin="normal" InputLabelProps={{ style: { color: "#7a7974" } }}
                  />
                </Grid>
              </Grid>
            </Grid>

            <TextField
              label="Experience Required"
              value={experienceRequired}
              onChange={(e) => setExperienceRequired(e.target.value)}
              fullWidth
              margin="normal" InputLabelProps={{ style: { color: "#7a7974" } }}
            />
            <Grid item xs={12} >
              <Grid container spacing={3}>
                <Grid item xs={6}>

                  <TextField
                    label="Job Status"
                    value={jobStatus}
                    onChange={(e) => setJobStatus(e.target.value)}
                    fullWidth
                    margin="normal" InputLabelProps={{ style: { color: "#7a7974" } }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel style={{ color: "#7a7974" }} >Category</InputLabel>
                    <Select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      <MenuItem value="" sx={{ color: "#7a7974" }}>Select a category</MenuItem>
                      <MenuItem value="1">Electrical Services</MenuItem>
                      <MenuItem value="2">Moving Services</MenuItem>
                      <MenuItem value="3">Gardening Services</MenuItem>
                      <MenuItem value="4">Painting Services</MenuItem>
                      <MenuItem value="5">Home Repair Services</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Tooltip title="Reset">
                <IconButton variant="contained" onClick={handleReset} color="secondary">
                  <RefreshIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Post">
                <IconButton variant="contained" onClick={handleCreateJob} color="primary">
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