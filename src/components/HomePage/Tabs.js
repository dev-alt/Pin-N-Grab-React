import React from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import CardGrid from './CardGrid';
import { Box } from '@mui/material';
import SaveJobs from '../Job/Listings/SavedJobs';
import AppliedJobs from '../Job/Listings/AppliedJobs';

export function JobTabs({
  value,
  handleChange,
  filteredJobListings,
  sortedJobs,
  handleCardClick,
}) {
  return (
    <Box>
      <TabContext value={value}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <TabList
            onChange={handleChange}
            aria-label="tabs"
            sx={{ mb: '-20px' }}
          >
            <Tab
              label="All Jobs"
              value="1"
              style={{
                color: '#000',
              }}
              sx={{
                fontSize: { xs: '0.5rem', sm: '1rem' },
                fontWeight: 'bold',
              }}
            />
            <Tab
              label="Most Recent Jobs"
              value="2"
              style={{ color: '#000' }}
              sx={{
                fontSize: { xs: '0.5rem', sm: '1rem' },
                fontWeight: 'bold',
              }}
            />
            <Tab
              label="Saved Jobs"
              value="3"
              style={{ color: '#000' }}
              sx={{
                fontSize: { xs: '0.5rem', sm: '1rem' },
                fontWeight: 'bold',
              }}
            />
            <Tab
              label="Applied Jobs"
              value="4"
              style={{ color: '#000' }}
              sx={{
                fontSize: { xs: '0.5rem', sm: '1rem' },
                fontWeight: 'bold',
              }}
            />
          </TabList>
        </Box>

        <TabPanel value="1">
          {' '}
          <CardGrid
            jobListings={filteredJobListings}
            onCardClick={handleCardClick}
          />
        </TabPanel>
        <TabPanel value="2">
          <CardGrid jobListings={sortedJobs} onCardClick={handleCardClick} />
        </TabPanel>
        <TabPanel value="3">
          <SaveJobs onCardClick={handleCardClick} />
        </TabPanel>
        <TabPanel value="4">
          <AppliedJobs onCardClick={handleCardClick} />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
