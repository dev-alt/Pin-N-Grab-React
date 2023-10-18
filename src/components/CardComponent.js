import React, { useState, useContext } from 'react'; // Import useState
import {
  Card,
  CardContent,
  CardHeader,
  Tooltip,
  Typography,
  Grid,
  Divider,
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
import { Box } from '@mui/system';

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

  mb: 2,
  border: '1px solid',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  width: { xs: '80vw', sm: '40vw', md: '28vw', lg: '18vw', xl: '280px' },
};

const itemStyle = {
  display: 'flex',
  alignItems: 'centre',
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

const CardComponent = ({ job, onCardClick, borderColour }) => {
  const iconComponent = getIconByCategoryId(job.category_id);
  const { profile } = useAuth();
  const userId = profile.UserId;
  const { isSaved, toggleSaved } = useJobSave(userId, job.id);

  return (
    <Card sx={{ ...cardStyle, borderColor: borderColour }}>
      <CardHeader
        onClick={() => onCardClick(job)}
        subheader={
          <Grid container direction="column">
            <Grid item container justifyContent="space-between">
              <Grid item xs={12}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {iconComponent}
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: { xs: '1rem', md: '1.2rem' },
                      fontWeight: 600,
                      color: 'rgba(20, 8, 14, 1)',
                      marginLeft: '5px',
                    }}>
                    {job.title}
                  </Typography>
                </div>
                <Divider
                  variant="fullwidth"
                  light
                  sx={{ marginTop: '20px', bgcolor: borderColour }}
                />
              </Grid>
            </Grid>
          </Grid>
        }
        sx={{
          color: 'textSecondary',
        }}
      />
      <CardContent sx={{ marginLeft: '5px', marginRight: '5px' }}>
        <Box sx={{ ...itemStyle, marginBottom: '20px' }}>
          <Tooltip title="Deadline">
            <CalendarMonthIcon style={{ marginRight: '0.5rem' }} />
          </Tooltip>
          <Typography variant="body2">{job.deadline}</Typography>
        </Box>
        <Typography variant="body1">{job.description}</Typography>
        <Box
          sx={{
            marginTop: '20px',
            display: 'flex',
            alignItems: 'centre',
            justifyContent: 'space-between',
          }}>
          {/* <Grid item xs={8}> */}
          <Box sx={itemStyle}>
            <Tooltip title="Will get paid">
              <PaidIcon
                style={{
                  marginRight: '0.5rem',
                  fontSize: '3rem',
                  color: borderColour,
                }}
              />
            </Tooltip>
            <Typography variant="body2" sx={{ fontSize: '2rem' }}>
              {Math.round(job.paymentAmount)}
            </Typography>
          </Box>
          {/* </Grid>

          <Grid item xs={4}> */}

          <Favorite
            fontSize="medium"
            sx={{
              cursor: 'pointer',
              color: isSaved ? 'red' : 'gray', // Toggle the color based on the save state
              marginTop: '20px',
            }}
            onClick={toggleSaved} // Toggle the save state on click
          />

          {/* </Grid> */}
        </Box>
      </CardContent>
    </Card>
  );
};

const PickJobCard = ({ job, onCardClick }) => {
  const cardStyle = {
    mt: 2,

    mb: 2,
    border: '1px solid',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    width: { xs: '100px', md: '180px', lg: '200px' },
  };

  const iconComponent = getIconByCategoryId(job.category_id);
  const { profile } = useAuth();
  const userId = profile.UserId;
  const { isSaved, toggleSaved } = useJobSave(userId, job.id);

  return (
    <Card
      sx={{
        ...cardStyle,
        margin: '2px',
        boxShadow: 'none',
        border: '2px,srgba(20, 8, 14, 1)',
        bgcolor: '#f0d646',
        height: { xs: '180px', md: 'auto' },
      }}>
      <CardHeader
        title={
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
            }}>
            {iconComponent}
            <Favorite
              fontSize="medium"
              sx={{
                cursor: 'pointer',
                color: isSaved ? 'red' : 'gray', // Toggle the color based on the save state
              }}
              onClick={toggleSaved} // Toggle the save state on click
            />
          </Box>
        }></CardHeader>
      <CardContent
        onClick={() => onCardClick(job)}
        sx={{ marginLeft: '5px', marginRight: '5px' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'centre',
            marginBottom: '20px',
          }}>
          <Tooltip title="Deadline">
            <CalendarMonthIcon style={{ marginRight: '0.5rem' }} />
          </Tooltip>
          <Typography variant="body2">{job.deadline}</Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'centre',
          }}>
          <Tooltip title="Will get paid">
            <PaidIcon
              sx={{
                marginRight: '0.5rem',
                fontSize: {
                  sm: '1.4rem',
                  md: '1.8rem',
                  lg: '3rem',
                },
              }}
            />
          </Tooltip>
          <Typography
            variant="body2"
            sx={{
              fontSize: {
                sm: '1rem',
                md: '1.2rem',
                lg: '2rem',
              },
            }}>
            {Math.round(job.paymentAmount)}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CardComponent;
export { PickJobCard };
