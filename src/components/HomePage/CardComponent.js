import React from 'react'; // Import useState
import {
  Card,
  CardContent,
  CardHeader,
  Tooltip,
  Typography,
  Grid,
  Divider,
  Box,
} from '@mui/material';
import { CalendarMonth, Paid, LocationOn } from '@mui/icons-material';
import useJobSave from '../useJobSave';
import { getLocationName } from '../Job/JobDetails';
import SaveButton from '../Job/SaveButton';
import {
  cardStyle,
  itemStyle,
  getIconByCategoryId,
  getColourByAmount,
} from '../CardComponentStyles';

const CardComponent = ({ job, onCardClick }) => {
  const iconComponent = getIconByCategoryId(job.category_id);
  const borderColour = getColourByAmount(job.paymentAmount);
  const { isSaved, toggleSaved } = useJobSave(job.id);

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
                    }}
                  >
                    {job.title}
                  </Typography>
                </div>
                <Divider
                  variant="fullwidth"
                  light
                  sx={{ marginTop: '10px', bgcolor: borderColour }}
                />
              </Grid>
            </Grid>
          </Grid>
        }
        sx={{
          color: 'textSecondary',
          cursor: 'pointer',
        }}
      />
      <CardContent sx={{ marginLeft: '5px', marginRight: '5px' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'centre',
            marginBottom: '5px',
            marginTop: '-20px',
          }}
        >
          <Tooltip title="Deadline">
            <LocationOn style={{ marginRight: '0.5rem' }} />
          </Tooltip>
          <Typography variant="body2">
            {' '}
            {getLocationName(job.location_id)}
          </Typography>
        </Box>
        <Box sx={{ ...itemStyle, marginBottom: '20px' }}>
          <Tooltip title="Deadline">
            <CalendarMonth style={{ marginRight: '0.5rem' }} />
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
          }}
        >
          {/* <Grid item xs={8}> */}
          <Box sx={itemStyle}>
            <Tooltip title="Will get paid">
              <Paid
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

          <SaveButton
            isSaved={isSaved}
            jobId={job.id}
            toggleSaved={toggleSaved}
          />

          {/* </Grid> */}
        </Box>
      </CardContent>
    </Card>
  );
};

export default CardComponent;
