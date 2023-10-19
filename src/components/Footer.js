import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Tooltip,
  Typography,
  Grid,
  Divider,
  Box,
} from '@mui/material';
const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Divider
        variant="fullwidth"
        light
        sx={{ marginBottom: '20px', bottom: '0px' }}
      />
      <Typography gutterBottom variant="subtitle1">
        CopyRight © {year}
      </Typography>
    </Box>
  );
};

export default Footer;
