import React from 'react';
import CardComponent from './CardComponent';
import Masonry from '@mui/lab/Masonry';
import { Box, Container } from '@mui/system';

const CardGrid = ({ jobListings, onCardClick }) => {
  const cardItemStyle = {
    padding: 1,
  };

  // Filter out job listings with "Closed" or "Deleted" jobStatus
  const filteredJobListings = jobListings.filter(
    (job) => job.jobStatus !== 'Closed' && job.jobStatus !== 'Deleted'
  );

  return (
    <Container
      sx={{
        justifyContent: 'center',
        minHeight: 393,
      }}
    >
      <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} spacing={0}>
        {filteredJobListings.map((job, index) => (
          <Box key={index} sx={{ ...cardItemStyle, height: 'auto' }}>
            <CardComponent job={job} onCardClick={onCardClick} />
          </Box>
        ))}
      </Masonry>
    </Container>
  );
};

export default CardGrid;
