import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../AuthContext';
import CardComponent from '../../HomePage/CardComponent';
import { Box, Container } from '@mui/material';
import Masonry from '@mui/lab/Masonry';
import Cookies from 'js-cookie';

export function AppliedJobs({ onCardClick }) {
  const { profile } = useAuth();
  const userId = profile.profile.UserId;
  const [acceptedJobs, setAcceptedJobs] = useState([]);
  const token = Cookies.get('token');

  useEffect(() => {
    // Fetch Accepted jobs from the server
    const fetchAcceptedJobs = async () => {
      try {
        const response = await fetch(`/api/jobs/accepted/${userId}`, {
          headers: {
            Authorization: token,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setAcceptedJobs(data);
        } else {
          console.error('Failed to fetch accepted jobs.');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchAcceptedJobs();
}, [userId, token]);


  return (
    <Container
      sx={{
        justifyContent: 'center',
        minHeight: 393,
      }}
    >
      <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} spacing={0}>
        {acceptedJobs.map((job) => (
          <Box key={job.id}>
            <CardComponent job={job} onCardClick={onCardClick} />
          </Box>
        ))}
      </Masonry>
    </Container>
  );
}

export default AppliedJobs;
