import React from 'react';
import { Grid } from '@mui/material';
import CardComponent from './CardComponent';

const CardGrid = ({ jobListings }) => {
  const cardGridStyle = {
    margin: 1,
  };

  const cardItemStyle = {
    padding: 2,
  };

  return (
    <Grid container sx={cardGridStyle}>
      {jobListings.map((job, index) => (
        <Grid item xs={3} key={index} sx={cardItemStyle}>
          <CardComponent job={job} />
        </Grid>
      ))}
    </Grid>
  );
};

export default CardGrid;
