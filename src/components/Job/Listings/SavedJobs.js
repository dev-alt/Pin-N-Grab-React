import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../AuthContext';
import CardComponent from '../../HomePage/CardComponent';
import { Box, Container } from '@mui/material';
import Masonry from '@mui/lab/Masonry';
import Cookies from 'js-cookie';

export function SaveJobs({ onCardClick }) {
  const { profile } = useAuth();
  const userId = profile.profile.UserId;
  const [savedJobs, setSavedJobs] = useState([]);
  const token = Cookies.get('token');

  useEffect(() => {
    // Fetch saved jobs from the server
    const fetchSavedJobs = async () => {
      try {
        const response = await fetch(`/api/jobs/saved/${userId}`, {
          headers: {
            Authorization: token,
          },
        });
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
