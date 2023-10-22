import React, { useEffect, useState } from 'react';
import { useAuth } from '../../AuthContext';
import CardComponent from '../CardComponent';
import { Box, Container } from '@mui/material';
import Masonry from '@mui/lab/Masonry';

export function SaveJobs({ onCardClick }) {
  const { profile } = useAuth();
  const userId = profile.profile.UserId;
  const [savedJobs, setSavedJobs] = useState([]);

  console.log('Profile:', profile);
  console.log('Profile ID:', userId);

  useEffect(() => {
    // Fetch saved jobs from the server
    const fetchSavedJobs = async () => {
      try {
        const response = await fetch(`/api/jobs/saved/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setSavedJobs(data);
          console.log('Saved jobs:', data);
        } else {
          console.error('Failed to fetch saved jobs.');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchSavedJobs();
  }, [userId]);

  return (
    <Container
      sx={{
        justifyContent: 'center',
        minHeight: 393,
      }}
    >
      <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} spacing={0}>
        {savedJobs.map((job) => (
          <Box key={job.id}>
            <CardComponent job={job.Job} onCardClick={onCardClick} />
          </Box>
        ))}
      </Masonry>
    </Container>
  );
}

export default SaveJobs;
