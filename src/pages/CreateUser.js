import React, { useState } from 'react';
import axios from 'axios';
import {
  Button,
  TextField,
  Container,
  Box,
  Grid,
  Avatar,
  Typography,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';
import LoadingScreen from '../components/Common/LoadingScreen';
import { themeOptions } from '../components/Common/Theme';

const defaultTheme = createTheme(themeOptions);

export function CreateUser() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Add a loading state
  const [registrationMessage, setRegistrationMessage] = useState('');

  const handleRegister = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  
    try {
      setLoading(true);   
      const response = await axios.post('/api/auth/register', {
        username: data.get('username'),
        email: data.get('email'),
        password: data.get('password'),
        firstName: data.get('firstName'),
        lastName: data.get('lastName'),
      });
  
      const message = response.data.message;
      setRegistrationMessage(message);
  
      // Navigate immediately after the response is received
      navigate('/signin');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Set loading to false after either success or failure
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
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleRegister}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="username"
                  name="username"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  autoFocus
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Button
                  onClick={() => navigate('/signin')}
                  variant="text"
                  color="primary"
                >
                  Already have an account? Sign in
                </Button>
              </Grid>
            </Grid>
            {loading ? (
              <LoadingScreen /> // Show the loading screen while loading is true
            ) : registrationMessage ? (
              <div className="success-message">{registrationMessage}</div>
            ) : null}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
