import React from 'react';
import { Dialog, IconButton, Typography, Paper, Stack } from '@mui/material';
import { Close, LocationOn } from '@mui/icons-material'; // Import the LocationOn icon
import locationsData from './Locations';



const getLocationName = (locationId) => {
  const location = locationsData.find((item) => item.id === locationId);
  if (location) {
    return `${location.cityName}, ${location.regionName}`;
  } else {
    return 'Unknown Location';
  }
};

const paperStyle = {
  padding: '1rem',
  margin: '1rem',
  boxShadow: '0px 0px 15px 5px rgba(0, 0, 0, 0.2)',
};

const closeButtonStyle = {
  position: 'absolute',
  top: '10px',
  right: '10px',
};

const labelStyle = {
  fontWeight: 'bold',
};

const JobDetails = ({ job, open, onClose }) => {
  if (!job) {
    return null; // Render nothing if job is null
  }



  return (
    <Dialog open={open} onClose={onClose}>
      <Paper sx={paperStyle}>
        <IconButton sx={closeButtonStyle} onClick={onClose}>
          <Close />
        </IconButton>
        <Stack spacing={2}>
          <Typography variant="h4" color="primary">
            {job.title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            <LocationOn /> {getLocationName(job.location_id)}
          </Typography>
          <Typography variant="body1">{job.description}</Typography>
          <Typography variant="body2">
            <span sx={labelStyle}>Deadline:</span> {job.deadline}
          </Typography>
          <Typography variant="body2">
            <span sx={labelStyle}>Payment Type:</span> {job.paymentType}
          </Typography>
          <Typography variant="body2">
            <span sx={labelStyle}>Skill Level:</span> {job.skillLevel}
          </Typography>
          <Typography variant="body2">
            <span sx={labelStyle}>Experience Required:</span> {job.experienceRequired}
          </Typography>
          <Typography variant="body2">
            <span sx={labelStyle}>Job Status:</span> {job.jobStatus}
          </Typography>
          {/* Add more information here with bold labels */}
        </Stack>
      </Paper>
    </Dialog>
  );
};

export default JobDetails;
