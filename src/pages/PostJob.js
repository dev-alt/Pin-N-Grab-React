import React, { useState } from 'react';
import axios from 'axios';
import {
  Button,
  TextField,
  Container,
  Typography,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from '@mui/material';

export function CreateJob() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [deadline, setDeadline] = useState('');
  const [paymentType, setPaymentType] = useState('');
  const [skillLevel, setSkillLevel] = useState('');
  const [experienceRequired, setExperienceRequired] = useState('');
  const [jobStatus, setJobStatus] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCreateJob = async () => {
    try {
      const response = await axios.post('/api/jobs/create', {
        title,
        description,
        location,
        deadline,
        paymentType,
        skillLevel,
        experienceRequired,
        jobStatus,
        category: selectedCategory,
      });
      console.log(response.data);
      console.log('Selected Category ID:', selectedCategory);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Typography variant="h2">Post Job</Typography>
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Description"
        multiline
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Deadline"
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Payment Type"
        value={paymentType}
        onChange={(e) => setPaymentType(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Skill Level"
        value={skillLevel}
        onChange={(e) => setSkillLevel(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Experience Required"
        value={experienceRequired}
        onChange={(e) => setExperienceRequired(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Job Status"
        value={jobStatus}
        onChange={(e) => setJobStatus(e.target.value)}
        fullWidth
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Category</InputLabel>
        <Select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <MenuItem value="">Select a category</MenuItem>
          <MenuItem value="1">Information Technology</MenuItem>
          <MenuItem value="2">Healthcare</MenuItem>
          <MenuItem value="3">Finance</MenuItem>
        </Select>
      </FormControl>
      <Button
        variant="contained"
        onClick={handleCreateJob}
        fullWidth
        color="primary"
        margin="normal"
      >
        Create Job
      </Button>
    </Container>
  );
}
