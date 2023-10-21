import React, { useEffect, useState } from 'react';
import { useAuth } from '../../AuthContext';
import CardComponent from '../CardComponent';
import { Box, IconButton, useMediaQuery, Container } from '@mui/material';

import useJobSave from '../useJobSave';

import Masonry from '@mui/lab/Masonry';
export function SaveJobs({ onCardClick }) {
  const { profile } = useAuth();
  const userId = profile.profile.UserId;
  const [savedJobs, setSavedJobs] = useState([]);

  const handleJobSave = useJobSave();

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
  console.log(savedJobs);
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('lg'));
  const isXtraSmallScreen = useMediaQuery((theme) =>
    theme.breakpoints.down('md')
  );

  const [currentPage, setCurrentPage] = useState(1);
  var itemsPerPage = null;
  if (isSmallScreen) {
    itemsPerPage = 3;
  } else if (isXtraSmallScreen) itemsPerPage = 2;
  else {
    itemsPerPage = 5;
  }
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = savedJobs.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleUnsaveJob = (jobId) => {
    // Update the state by filtering out the unsaved job
    setSavedJobs(savedJobs.filter((job) => job.id !== jobId));
    // Call the unsave function from the useJobSave hook
    handleJobSave.toggleSaved(jobId);
  };

  return (
    <Container
      sx={{
        justifyContent: 'center',
        minHeight: 393,
      }}
    >
      <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} spacing={0}>
        {/* Recent jobs */}
        {savedJobs.slice(0, 6).map((job) => (
          <Box key={job.id}>
            <CardComponent job={job.Job} onCardClick={onCardClick} />
          </Box>
        ))}
      </Masonry>
    </Container>
  );
}

export default SaveJobs;
