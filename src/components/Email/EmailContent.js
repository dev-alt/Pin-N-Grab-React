import React from 'react';
import { Paper, Typography, IconButton, Divider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import Cookies from 'js-cookie';

const EmailContent = ({ email, onDelete }) => {
  const userToken = Cookies.get('token');

  const handleDelete = () => {
    axios
      .delete(`/api/message/${email.id}`, {
        headers: {
          Authorization: userToken,
        },
      })
      .then((response) => {
        console.log(response.data);
        onDelete('inbox');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Paper
      elevation={1}
      sx={{ padding: '16px', display: 'flex', flexDirection: 'column' }}
    >
      <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
        Subject: {email.subject}
      </Typography>
      <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
        From: {email.sender.username}
      </Typography>
      <Typography
        variant="subtitle2"
        sx={{ color: 'text.secondary', marginBottom: 2 }}
      >
        Date: {new Date(email.date).toLocaleString()}
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Typography variant="body1" sx={{ wordWrap: 'break-word' }}>
        {email.content}
      </Typography>
      <IconButton
        sx={{ alignSelf: 'flex-end' }}
        color="error"
        onClick={handleDelete}
      >
        <DeleteIcon />
      </IconButton>
    </Paper>
  );
};

export default EmailContent;
