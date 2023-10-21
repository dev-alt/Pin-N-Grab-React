import React from 'react';
import Favorite from '@mui/icons-material/Favorite';
import useJobSave from '../useJobSave';

function SaveButton({ jobId, isSaved }) {
  const { toggleSaved } = useJobSave(jobId);

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
