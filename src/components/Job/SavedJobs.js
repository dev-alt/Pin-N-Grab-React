import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { useAuth } from '../../AuthContext';
import CardComponent from '../CardComponent'; 
import { Container } from '@mui/system';

export function SaveJobs( {onCardClick} ) {
  const { profile } = useAuth();
  const userId = profile ? profile.UserId : null;
  const [savedJobs, setSavedJobs] = useState([]);


  useEffect(() => {
    // Fetch saved jobs from the server
    const fetchSavedJobs = async () => {
      try {
        const response = await fetch(`/api/jobs/all`);
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

    <Container>
    <Grid container spacing={2}>
{savedJobs.slice(0, 6).map((data) => (
  <CardComponent key={data.id} job={data} onCardClick={onCardClick} />
))}
</Grid>
    </Container>
  );
}

export default SaveJobs;