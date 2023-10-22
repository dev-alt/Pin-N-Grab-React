import React from 'react';
import { Typography, Box } from '@mui/material';
const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <Box
      sx={{
        textAlign: 'center',
        position: { xs: 'static', sm: 'fixed' },
        left: '0',
        bottom: '0',
        width: '100%',
        bgcolor: 'primary.main',
        paddingTop: '10px',
      }}
    >
      <Typography gutterBottom variant="subtitle2">
        CopyRight © {year}
      </Typography>
    </Box>
  );
};

export default Footer;
