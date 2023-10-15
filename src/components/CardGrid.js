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
    xs: 12,
  };
  const cardMaxWidth = '600px';

  // Filter out job listings with "Closed" or "Deleted" jobStatus
  const filteredJobListings = jobListings.filter(
    (job) => job.jobStatus !== 'Closed' && job.jobStatus !== 'Deleted'
  );

  return (
    <Grid
      container
      sx={{
        ...cardGridStyle,
        maxWidth: cardMaxWidth,
        justifyContent: 'center',
      }}
    >
      {filteredJobListings.map((job, index) => (
        <Grid
          item
          {...columnSettings}
          key={index}
          sx={{ ...cardItemStyle, height: 'auto' }}
        >
          <CardComponent job={job} onCardClick={onCardClick} />
        </Grid>
      ))}
    </Grid>
  );
};

export default CardGrid;
