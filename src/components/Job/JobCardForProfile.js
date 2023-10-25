import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Tooltip,
} from '@mui/material';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PaidIcon from '@mui/icons-material/Paid';
import axios from 'axios';
import Cookies from 'js-cookie';

import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { Container } from '@mui/system';

const JobCardForProfile = ({
  data,
  iconComponent,
  jobId,
  isOwner,
  onCardClick,
}) => {
  const token = Cookies.get('token');

  const handleDeleteJob = async () => {
    try {
      const config = {
        headers: { Authorization: token },
      };
      await axios.patch(
        `/api/jobs/${jobId}/close`,
        { status: 'closed' },
        config,
      );
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Card sx={{ margin: '10px' }}>
        <CardContent
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {iconComponent}
          <Container
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography
                variant="h6"
                sx={{ marginLeft: '20px', cursor: 'pointer' }}
                onClick={() => onCardClick(data)}
              >
                {data.title}
              </Typography>
              {jobId && (
                <Typography variant="body1" sx={{ marginLeft: '20px' }}>
                  Job ID:{jobId}
                </Typography>
              )}
            </Box>
            {isOwner && ( // Conditionally render the delete button if the user is the owner
              <IconButton onClick={handleDeleteJob}>
                <Tooltip title="Delete Job">
                  <DeleteForeverOutlinedIcon
                    sx={{
                      fontSize: { xs: '1rem', sm: '1.5rem' },
                      color: 'error.main',
                    }}
                  />
                </Tooltip>
              </IconButton>
            )}
          </Container>
        </CardContent>
        <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              marginRight: '30px',
            }}
          >
            <CalendarMonthIcon style={{ marginRight: '0.5rem' }} />
            <Typography>{data.deadline}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <PaidIcon style={{ marginRight: '0.5rem' }} />
            <Typography>{data.paymentAmount}</Typography>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default JobCardForProfile;
