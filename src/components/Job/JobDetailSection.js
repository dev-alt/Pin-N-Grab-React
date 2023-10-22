// JobDetailsSection.js
import React from 'react';
import { Typography, Grid, Stack } from '@mui/material';
import { LocationOn, Favorite } from '@mui/icons-material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { getLocationName } from './Utils';

const JobDetailsSection = ({
  daysSincePosted,
  isSmallScreen,
  job,
  toggleSaved,
  labelStyle,
}) => {
  return (
    <Grid container spacing={2} justifyContent="flex-start">
      <Grid item xs={12} sm={3}>
        <Typography
          variant="caption"
          color="textSecondary"
          sx={{ marginLeft: '30px' }}
        >
          {daysSincePosted > 0
            ? `Posted ${daysSincePosted} days ago`
            : 'Posted today'}
        </Typography>
      </Grid>

      <Grid item xs={12} sm={9}>
        <Stack
          spacing={2}
          direction={isSmallScreen ? 'column' : 'row'}
          justifyContent="flex-end"
          sx={{ marginRight: '30px' }}
        >
          {/* Location */}
          <Typography
            variant={isSmallScreen ? 'body2' : 'subtitle1'}
            color="textSecondary"
          >
            <LocationOn /> {getLocationName(job.location_id)}
          </Typography>

          {/* Deadline */}
          <Typography variant="body2">
            <CalendarMonthIcon style={{ marginRight: '0.5rem' }} />
            <span sx={labelStyle}>Deadline:</span> {job.deadline}
          </Typography>
          <Grid item>
            <Favorite
              fontSize="medium"
              sx={{
                cursor: 'pointer',
                color: toggleSaved ? 'red' : 'gray',
              }}
              onClick={toggleSaved}
            />
          </Grid>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default JobDetailsSection;
