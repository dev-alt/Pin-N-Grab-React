import React from 'react';
import { Paper, Typography } from '@mui/material';

const EmailContent = ({ email }) => {
  return (
    <Paper elevation={3} sx={{ padding: '16px' }}>
      <Typography variant="h6">{email.subject}</Typography>
      <Typography variant="subtitle2">{`${email.sender} - ${email.date}`}</Typography>
      <Typography paragraph>{email.content}</Typography>
    </Paper>
  );
};

export default EmailContent;
