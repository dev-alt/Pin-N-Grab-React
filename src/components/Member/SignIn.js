import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useAuth } from '../../AuthContext';
import { themeOptions } from '../Common/Theme';
import LoadingScreen from '../Common/LoadingScreen'; // Import the LoadingScreen component

const defaultTheme = createTheme(themeOptions);

export function SignIn() {
  const { handleLogin } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    try {
      setLoading(true); // Set loading to true when the sign-in process starts

      const response = await axios.post('/api/auth/login', {
        username: data.get('username'),
        password: data.get('password'),
      });

      const { token, id } = response.data;

      const profileResponse = await axios.get(`/api/users/${id}/profile`, {
        headers: {
          Authorization: token,
        },
      });

      const userData = profileResponse.data;
      const { username } = userData;

      Cookies.set('token', token, { secure: true, sameSite: 'strict' });

      handleLogin(token, userData);

      localStorage.setItem('profile', JSON.stringify(userData));
      localStorage.setItem('username', username);

      setTimeout(() => {
        setLoading(false); // Set loading to false when the sign-in process completes
        navigate(`/`);
      }, 1000);
    } catch (error) {
      console.error('Login error:', error);
      setError('Login failed. Please check your credentials.');
      setLoading(false); // Set loading to false in case of an error
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}></Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={
                <Checkbox
                  value="remember"
                  color="primary"
                  sx={{ fontWeight: 'bold' }}
                />
              }
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
            {loading ? (
              <LoadingScreen /> // Show the loading screen while loading is true
            ) : error ? (
              <div className="error-message">{error}</div>
            ) : null}
            <Grid container>
              <Grid item>
                <Link
                  href="create"
                  variant="body1"
                  color="secondary"
                  sx={{ fontWeight: 'bold' }}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
