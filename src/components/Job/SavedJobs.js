import React, { useEffect, useState } from 'react';
import { /* other imports */ } from '@mui/material';
import { useAuth } from '../../AuthContext';
import CardComponent from '../CardComponent'; 
import { Container } from '@mui/system';

export function SaveJobs( {onCardClick} ) {
  const { profile } = useAuth();
  const userId = profile.profile.UserId;
  const [savedJobs, setSavedJobs] = useState([]);

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
    <Container>
      {savedJobs.map((data) => (
        <CardComponent key={data.id} job={data.Job} onCardClick={onCardClick} />
      ))}
    </Container>
  );
}

export default SaveJobs;