import React from 'react';
import { Typography, Box } from '@mui/material';
const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <Box
      sx={{
        textAlign: 'center',
        position: 'fixed',
        left: '0',
        bottom: '0',
        width: '100%',
      }}>
      <Typography gutterBottom variant="h6">
        CopyRight © {year}
      </Typography>
    </Box>
  );
};

export default Footer;
