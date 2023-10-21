import React from 'react';
import { Paper, Typography } from '@mui/material';

const EmailContent = ({ email }) => {
  return (
    <Paper elevation={0} sx={{ padding: '16px' }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
        {email.subject}
      </Typography>
      <Typography variant="body1">{`${email.sender} - ${email.date}`}</Typography>
      <Typography variant="h6">{email.content}</Typography>
    </Paper>
  );
};

export default EmailContent;
