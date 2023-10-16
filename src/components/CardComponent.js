import React, { useState, useContext } from 'react'; // Import useState
import {
  Card,
  CardContent,
  CardHeader,
  Tooltip,
  Typography,
  Grid,
} from '@mui/material';
import { LocationOn, Favorite } from '@mui/icons-material';
import {
  CalendarMonth as CalendarMonthIcon,
  Paid as PaidIcon,
  AutoStories as AutoStoriesIcon,
  Handyman as HandymanIcon,
} from '@mui/icons-material';
import {
  ElectricalServices,
  LocalFlorist,
  LocalShipping,
  Palette,
  Build,
} from '@mui/icons-material';
import locationsData from './Locations';
import { useAuth } from '../AuthContext';
import useJobSave from './useJobSave';

const getLocationName = (locationId) => {
  const location = locationsData.find((item) => item.id === locationId);
  if (location) {
    return `${location.cityName}, ${location.regionName}`;
  } else {
    return 'Unknown Location';
  }
};

const cardStyle = {
  mt: 2,
  mx: 2,
  mb: 2,
  border: '1px solid #e0e0e0',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};

const listItemStyle = {
  listStyle: 'none',
  display: 'flex',
  alignItems: 'center',
  marginTop: '0.4rem',
};

function getIconByCategoryId(categoryId) {
  const iconSize = 'large';
  switch (categoryId) {
    case 1:
      return <ElectricalServices fontSize={iconSize} />;
    case 2:
      return <LocalFlorist fontSize={iconSize} />;
    case 3:
      return <LocalShipping fontSize={iconSize} />;
    case 4:
      return <Palette fontSize={iconSize} />;
    case 5:
      return <Build fontSize={iconSize} />;
    default:
      return null;
  }
}

const CardComponent = ({ job, onCardClick }) => {
  const iconComponent = getIconByCategoryId(job.category_id);
  const { profile } = useAuth();
  const userId = profile.UserId;
  const { isSaved, toggleSaved } = useJobSave(userId, job.id);

  return (
    <Card sx={cardStyle}>
      <CardHeader
        onClick={() => onCardClick(job)}
        subheader={
          <Grid container direction="column">
            <Grid item container justifyContent="space-between">
              <Grid item xs={9}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {iconComponent}
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: { xs: '1rem', sm: '1.2rem', md: '1.5rem' },
                      fontWeight: 600,
                      color: 'rgba(20, 8, 14, 1)',
                    }}
                  >
                    {job.title}
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </Grid>
        }
        sx={{
          color: 'gray',
          backgroundColor: '#efca08',
        }}
      />
      <CardContent>
        <Grid item>
          <Favorite
            fontSize="small"
            sx={{
              cursor: 'pointer',
              color: isSaved ? 'red' : 'gray', // Toggle the color based on the save state
            }}
            onClick={toggleSaved} // Toggle the save state on click
          />
        </Grid>
        <ul>
          <li style={listItemStyle}>
            <Tooltip title="Deadline">
              <CalendarMonthIcon style={{ marginRight: '0.5rem' }} />
            </Tooltip>
            <Typography variant="body2">{job.deadline}</Typography>
          </li>
          <li style={listItemStyle}>
            <Tooltip title="Payment Type">
              <PaidIcon style={{ marginRight: '0.5rem' }} />
            </Tooltip>
            <Typography variant="body2">{job.paymentType}</Typography>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default CardComponent;
