import React from 'react';
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
import { CssBaseline } from '@mui/material';
import { themeOptions } from './Theme';

function App() {
  const { isLoggedIn, handleLogin } = useAuth();
  const theme = createTheme(themeOptions);
  const isUserAuthenticated = isLoggedIn;

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <PrimarySearchAppBar />
        <Routes>
          <Route
            path="/"
            element={isUserAuthenticated ? <HomePage /> : <Navigate to="/signin" />}
          />
          {!isUserAuthenticated && (
            <Route path="/signin" element={<SignIn handleLogin={handleLogin} />} />
          )}
          {!isUserAuthenticated && (
            <Route path="/create" element={<CreateUser />} />
          )}
          {isUserAuthenticated && (
            <Route path="/email" element={<Email />} />
          )}
          {isUserAuthenticated && (
            <Route
              path="/profile/:id"
              element={isUserAuthenticated ? <Profile /> : null}
            />
          )}
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;