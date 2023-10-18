import React, { useState } from 'react';
import { Box, IconButton, Typography, Stack } from '@mui/material';
import { RecentJobCard } from '../CardComponent';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const RecentJob = ({ jobs, onCardClick }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = jobs.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div
      style={{
        width: '80vw',
        display: 'flex',
        padding: '10px',
        margin: '10px',
        borderColor: 'rgba(20, 8, 14, 1)',
        borderWidth: '10px',
        borderStyle: 'solide',
      }}
    >
      <Stack>
        {/* title */}
        <Typography variant="h6">
          <strong>Most Recent Pinned:</strong>
        </Typography>
        {/* Content */}
        <Box sx={{ display: 'flex', alignItems: 'center', width: '80vw' }}>
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
          {/* Recent jobs */}
          {currentItems.map((job, index) => (
            <RecentJobCard key={index} job={job} onCardClick={onCardClick} />
          ))}
          {/* Right arrow */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={indexOfLastItem >= jobs.length}
              aria-label="Next Page"
              aria-disabled={indexOfLastItem >= jobs.length}
              sx={{ height: '20px' }}
            >
              <ChevronRightIcon />
            </IconButton>
          </Box>
        </Box>
      </Stack>
    </div>
  );
};

export default RecentJob;
