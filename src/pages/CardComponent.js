import React from 'react';
import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import { LocationOn } from '@mui/icons-material';

const cardStyle = {
  mt: 2,
  mx: 2, // Add mx (margin-x) for horizontal margin
  mb: 2,
  border: '1px solid #e0e0e0', // Add a border for a card-like appearance
  borderRadius: '8px', // Add some border radius for rounded corners
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Add a subtle shadow
};

const titleStyle = {
  fontSize: '1.25rem',
  fontWeight: 600,
};

const subheaderStyle = {
  color: 'gray',
};

const CardComponent = ({ job }) => {
  return (
    <Card sx={cardStyle}>
      <CardHeader
        title={job.title}
        subheader={job.location}
        avatar={<LocationOn />}
        sx={{
          ...titleStyle,
          ...subheaderStyle,
        }}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary">
          {job.description}
        </Typography>
        <ul>
          <li>Deadline: {job.deadline}</li>
          <li>Payment Type: {job.paymentType}</li>
          <li>Skill Level: {job.skillLevel}</li>
          <li>Experience Required: {job.experienceRequired}</li>
          <li>Job Status: {job.jobStatus}</li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default CardComponent;
