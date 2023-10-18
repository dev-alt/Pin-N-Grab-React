import React, { useState } from 'react';
import {
  Box,
  Container,
  IconButton,
  Card,
  CardHeader,
  CardContent,
  Tooltip,
  Typography,
  Stack,
  Grow,
  useMediaQuery,
} from '@mui/material';
import {
  CalendarMonth as CalendarMonthIcon,
  Paid as PaidIcon,
} from '@mui/icons-material';
import { PickJobCard } from '../CardComponent';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const RecentJob = ({ jobs, onCardClick }) => {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('lg'));
  const isXtraSmallScreen = useMediaQuery((theme) =>
    theme.breakpoints.down('md'),
  );

  const [currentPage, setCurrentPage] = useState(1);
  var itemsPerPage = null;
  if (isSmallScreen) {
    itemsPerPage = 4;
  } else if (isXtraSmallScreen) itemsPerPage = 3;
  else {
    itemsPerPage = 5;
  }

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
      }}>
      {/* Content */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {/* Left arrow */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous Page"
            aria-disabled={currentPage === 1}
            sx={{ height: '20px' }}>
            <ChevronLeftIcon />
          </IconButton>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/* Recent jobs */}
          {currentItems.map((job, index) => (
            <Box key={index}>
              <PickJobCard job={job} onCardClick={onCardClick} />
            </Box>
          ))}
        </Box>
        {/* Right arrow */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={indexOfLastItem >= jobs.length}
            aria-label="Next Page"
            aria-disabled={indexOfLastItem >= jobs.length}
            sx={{ height: '20px' }}>
            <ChevronRightIcon />
          </IconButton>
        </Box>
      </Box>
    </div>
  );
};

export default RecentJob;
