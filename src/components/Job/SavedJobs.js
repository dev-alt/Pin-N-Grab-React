import React, { useEffect, useState } from 'react';
import { useAuth } from '../../AuthContext';
import { PickJobCard } from '../CardComponent';
import { Box, IconButton, useMediaQuery } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export function SaveJobs({ onCardClick }) {
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

  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      {/* title */}

      {/* Content */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {/* Left arrow */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous Page"
            aria-disabled={currentPage === 1}
            sx={{ height: '20px' }}
          >
            <ChevronLeftIcon />
          </IconButton>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/* Recent jobs */}
          {currentItems.slice(0, 6).map((job) => (
            <Box key={job.id}>
              <PickJobCard job={job.Job} onCardClick={onCardClick} />
            </Box>
          ))}
        </Box>
        {/* Right arrow */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={indexOfLastItem >= savedJobs.length}
            aria-label="Next Page"
            aria-disabled={indexOfLastItem >= savedJobs.length}
            sx={{ height: '20px' }}
          >
            <ChevronRightIcon />
          </IconButton>
        </Box>
      </Box>
    </div>
  );
}

export default SaveJobs;
