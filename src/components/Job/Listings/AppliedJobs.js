import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../AuthContext';
import CardComponent from '../../HomePage/CardComponent';
import { Box, Container } from '@mui/material';
import Masonry from '@mui/lab/Masonry';
import Cookies from 'js-cookie';

export function AppliedJobs({ onCardClick }) {
  const { profile } = useAuth();
  const userId = profile.profile.UserId;
  const [appliedJobs, setAppliedJobs] = useState([]);
  const token = Cookies.get('token');

  useEffect(() => {
    // Fetch applied jobs from the server
    const fetchAppliedJobs = async () => {
      try {
        const response = await fetch(`/api/jobs/applied/${userId}`, {
          headers: {
            Authorization: token,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setAppliedJobs(data);
          console.log('Applied jobs:', data);
        } else {
          console.error('Failed to fetch applied jobs.');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchAppliedJobs();
  }, [userId, token]);

  console.log('Applied jobs', appliedJobs);

  return (
    <Container
      sx={{
        justifyContent: 'center',
        minHeight: 393,
      }}
    >
      <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} spacing={0}>
        {appliedJobs.map((job) => (
          <Box key={job.id}>
            <CardComponent job={job.Job} onCardClick={onCardClick} />
          </Box>
        ))}
      </Masonry>
    </Container>
  );
}

export default AppliedJobs;
