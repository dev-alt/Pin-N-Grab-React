import React from 'react';
import Favorite from '@mui/icons-material/Favorite';

function SaveButton({ jobId, isSaved, toggleSaved }) {
  return (
    <Favorite
      fontSize="medium"
      sx={{
        cursor: 'pointer',
        color: isSaved ? 'red' : 'gray',
        marginTop: '20px',
      }}
      onClick={toggleSaved}
    />
  );
}

export default SaveButton;
