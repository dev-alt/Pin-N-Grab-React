import React from 'react';
import { IconButton } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import axios from 'axios';
import Cookies from 'js-cookie';
import { List, ListItem, ListItemText } from '@mui/material';

export function RenderApplicantsList({ job }) {
  const token = Cookies.get('token');

  const handleMarkCompleted = async (jobId, applicationId) => {
    try {
      console.log('jobId:', job.id);

      await axios.post(
        `/api/jobs/${jobId}/markCompleted`,
        {
          selectedUserId: applicationId, // Send the application ID
        },
        {
          headers: {
            Authorization: token,
          },
        },
      );
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  if (job.Applications && job.Applications.length > 0) {
    console.log(job.id);
    return (
      <List sx={{ overflow: 'auto' }}>
        {job.Applications.map((application) => (
          <ListItem
            key={application.id}
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <ListItemText>{application.User.username}</ListItemText>
            <IconButton
              color="#7C7287"
              sx={{ '& :hover': { color: '#E76E53' } }}
              onClick={() => handleMarkCompleted(job.id, application.user_id)}
            >
              <CheckCircleIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    );
  } else {
    return <p>No applicants yet.</p>;
  }
}
