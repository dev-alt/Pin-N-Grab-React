import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SignIn } from './components/Member/SignIn';
import { HomePage } from './pages/HomePage';
import { CreateUser } from './pages/CreateUser';
import { CreateJob } from './pages/PostJob';
import React, { useState } from 'react';
import { PrimarySearchAppBar } from './components/NavBar/NavMenu';
import { Post } from './components/Post';
import Profile from './pages/UserProfile';
import { Navigate } from 'react-router-dom';
import Email from './pages/Email';
import { useAuth } from './AuthContext'; // Import useAuth
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { themeOptions } from './Theme';




function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const { isLoggedIn, handleLogin, handleLogout } = useAuth();
  const [profile, setProfile] = useState(JSON.parse(localStorage.getItem('profile')));
  const theme=createTheme(themeOptions)


  return (
    <ThemeProvider theme={theme}>

    <CssBaseline />
    <Router>
      {profile && <PrimarySearchAppBar profile={profile} isLoggedIn={isLoggedIn} />}
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <HomePage /> : <Navigate to="/signin" />}
        />
        {(!isLoggedIn && (
          <>
            <Route path="/signin" element={<SignIn handleLogin={handleLogin} />} />
            <Route path="/create" element={<CreateUser />} />
          </>
        )) || null}
        {isLoggedIn && (
          <>
            <Route path="/postjob" element={<CreateJob />} />
            <Route path="/post" element={<Post />} />
            <Route path="/email" element={<Email />} />
            <Route path="/profile/:id" element={<Profile profile={profile} />} />
          </>
        )}
      </Routes>

    </Router>
    </ThemeProvider>
  );
}

export default App;
