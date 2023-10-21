import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { SignIn } from './components/Member/SignIn';
import { HomePage } from './pages/HomePage';
import { CreateUser } from './pages/CreateUser';
import { PrimarySearchAppBar } from './components/NavBar/NavMenu';
import Profile from './pages/UserProfile';
import Email from './pages/Email';
import { useAuth } from './AuthContext';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Container, CircularProgress, Typography } from '@mui/material';
import { themeOptions } from './Theme';
import Footer from './components/Footer';
import jwt_decode from 'jwt-decode';

function LoadingScreen() {
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
        }}>
        <CircularProgress color="primary" size={100} thickness={2} />
        <Typography variant="h6" style={{ marginTop: 20 }}>
          Loading...
        </Typography>
      </Container>
    </ThemeProvider>
  );
}

function App() {
  const { isLoggedIn, handleLogin, handleLogout } = useAuth();
  const theme = createTheme(themeOptions);
  const isUserAuthenticated = isLoggedIn;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if the user is authenticated (with a valid token)
    if (isUserAuthenticated) {
      const token = localStorage.getItem('token'); // Retrieve the token from local storage
      if (!isTokenValid(token)) {
        // Token is not valid, so log the user out
        handleLogout();
      }
    }

    setTimeout(() => {
      setLoading(false);
    }, 400);

    return () => clearTimeout();
  }, [isUserAuthenticated, handleLogout]);

  if (loading) {
    return <LoadingScreen />;
  }

  function isTokenValid(token) {
    if (!token) {
      return false;
    }

    try {
      const decodedToken = jwt_decode(token); // Decode the JWT
      const currentTime = Date.now() / 1000; // Convert current time to seconds

      // Check if the token has expired
      if (decodedToken.exp && decodedToken.exp < currentTime) {
        return false;
      }

      // Additional checks can be performed here (e.g., token revocation)

      return true; // Token is valid
    } catch (error) {
      console.error('Error while verifying token:', error);
      return false; // An error occurred; token is invalid
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Router>
        {isUserAuthenticated && <PrimarySearchAppBar />}
        <Routes>
          <Route
            path="/"
            element={
              isUserAuthenticated ? <HomePage /> : <Navigate to="/signin" />
            }
          />
          {!isUserAuthenticated && (
            <Route
              path="/signin"
              element={<SignIn handleLogin={handleLogin} />}
            />
          )}
          {!isUserAuthenticated && (
            <Route path="/create" element={<CreateUser />} />
          )}
          {isUserAuthenticated && <Route path="/email" element={<Email />} />}
          {isUserAuthenticated && (
            <Route
              path="/profile/:id"
              element={isUserAuthenticated ? <Profile /> : null}
            />
          )}
        </Routes>
      </Router>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
