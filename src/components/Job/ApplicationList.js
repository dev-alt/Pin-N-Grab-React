import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import axios from 'axios';
import Cookies from 'js-cookie';
import {
  List,
  ListItem,
  ListItemText,
  Dialog
} from '@mui/material';

export function RenderApplicantsList({ job }) {
  const token = Cookies.get('token');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [message, setMessage] = useState('');

  const openDialog = (message) => {
    setMessage(message);
    setIsDialogOpen(true);
  };

  const handleMarkCompleted = async (jobId, applicationId) => {
    try {
      // Make sure to set the 'Authorization' header properly
      console.log('jobId:', job.id);

      const response = await axios.post(`/api/jobs/${jobId}/markCompleted`, {
        selectedUserId: applicationId, // Send the application ID
      }, {
        headers: {
          Authorization: token,
        },
      });
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  console.log(job.Applications);

  if (job.Applications && job.Applications.length > 0) {
    console.log(job.id);
    return (
      <div>
        <List sx={{ overflow: 'auto' }}>
          {job.Applications.map((application) => (
            <ListItem
              key={application.id}
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}>
              <ListItemText>{application.User.username}</ListItemText>
              <IconButton
                color="#7C7287"
                sx={{ '& :hover': { color: '#E76E53' } }}
                onClick={() => handleMarkCompleted(job.id, application.user_id)}>
                <CheckCircleIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
        <Dialog
          open={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          message={message}
        />
      </div>
    );
  } else {
    return <p>No applicants yet.</p>;
  }
}
