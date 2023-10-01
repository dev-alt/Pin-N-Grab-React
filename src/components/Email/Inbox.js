import React from 'react';
import { ListItemButton, ListItemText } from '@mui/material';

const Inbox = ({ emails, onEmailClick }) => {
  return (
    <div>
      {emails.map((email) => (
        <ListItemButton
          key={email.id}
          onClick={() => onEmailClick(email)}
        >
          <ListItemText
            primary={email.subject}
            secondary={`${email.sender} - ${email.date}`}
          />
        </ListItemButton>
      ))}
    </div>
  );
};

export default Inbox;
