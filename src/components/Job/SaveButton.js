import React from 'react';
import Favorite from '@mui/icons-material/Favorite';

function SaveButton({ jobId, isSaved, toggleSaved }) {

  return (
    <Favorite
      fontSize="medium"
      sx={{
        cursor: 'pointer',
        color: isSaved ? 'red' : 'gray',
        fontSize: {
          xs: '0.8rem',

          md: '1rem',
          lg: '1.2rem',
        },
      }}
      onClick={toggleSaved}
    />
  );
}

export default SaveButton;
