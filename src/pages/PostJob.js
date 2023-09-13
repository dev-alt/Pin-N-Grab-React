import React, { useState } from 'react';
import axios from 'axios';
import { MenuItem, FormControl, Select, InputLabel, Button, TextField, Container, Typography } from '@mui/material';

/**
 * Renders a user registration form and handles user registration by sending a POST request to the server with the user's credentials.
 * @function
 * @returns {JSX.Element} A JSX element representing the user registration form.
 */
export function CreateJob() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [deadline, setDeadline] = useState('');
    const [paymentType, setPaymentType] = useState('');
    const [skillLevel, setSkillLevel] = useState('');
    const [experienceRequired, setExperienceRequired] = useState('');
    const [jobStatus, setJobStatus] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(''); // State for the selected category

  /**
   * Handles user registration by sending a POST request to the server with the user's credentials.
   * @async
   * @function
   * @returns {Promise<void>}
   */
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
      <Typography variant='h2' >Post Job</Typography>
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        label="Description"
        multiline
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <TextField
        label="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <TextField
        label="Deadline"
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        label="Payment Type"
        value={paymentType}
        onChange={(e) => setPaymentType(e.target.value)}
      />
      <TextField
        label="Skill Level"
        value={skillLevel}
        onChange={(e) => setSkillLevel(e.target.value)}
      />
      <TextField
        label="Experience Required"
        value={experienceRequired}
        onChange={(e) => setExperienceRequired(e.target.value)}
      />
      <TextField
        label="Job Status"
        value={jobStatus}
        onChange={(e) => setJobStatus(e.target.value)}
      />
     <FormControl>
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
      <Button variant="contained" onClick={handleCreateJob}>
        Create Job
      </Button>
      
    </Container>
  );
}
