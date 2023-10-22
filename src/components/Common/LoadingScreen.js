import React from 'react';
import { CircularProgress, Typography, Container } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { themeOptions } from './Theme';

const LoadingScreen = () => {
  const theme = createTheme(themeOptions);

  return (
    <ThemeProvider theme={theme}>
      <Container
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress color="primary" size={100} thickness={2} />
        <Typography variant="h6" style={{ marginTop: 20 }}>
          Loading...
        </Typography>
      </Container>
    </ThemeProvider>
  );
};

export default LoadingScreen;
