import React from 'react';
import { Grid } from '@mui/material';
import CardComponent from '../components/CardComponent';

const CardGrid = ({ jobListings, onCardClick }) => {
  const cardGridStyle = {
    margin: 1,
  };

  const cardItemStyle = {
    padding: 2,
  };

  const columnSettings = {
    xs: 12, // For extra small screens (phones)
    sm: 6,  // For small screens (tablets)
    md: 4,  // For medium screens (laptops)
    lg: 3   // For large screens (desktops)
  };

  // Filter out job listings with "Closed" or "Deleted" jobStatus
  const filteredJobListings = jobListings.filter((job) => job.jobStatus !== 'Closed' && job.jobStatus !== 'Deleted');

  return (
    <Grid container sx={cardGridStyle}>
      {filteredJobListings.map((job, index) => (
        <Grid item {...columnSettings} key={index} sx={{ ...cardItemStyle, height: 'auto' }}>
          <CardComponent job={job} onCardClick={onCardClick} />
        </Grid>
      ))}
    </Grid>
  );
};

export default CardGrid;
