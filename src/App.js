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
  const { isLoggedIn, handleLogin } = useAuth();
  const theme = createTheme(themeOptions);
  const isUserAuthenticated = isLoggedIn;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('isUserAuthenticated:', isUserAuthenticated);
    console.log('isLoggedIn:', isLoggedIn);
  }, [isUserAuthenticated, isLoggedIn]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 400);

    // Clean up the timeout to prevent memory leaks
    return () => clearTimeout();
  }, []);

  if (loading) {
    return <LoadingScreen />;
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
