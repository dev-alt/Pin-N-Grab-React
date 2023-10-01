import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SignIn } from './components/Member/SignIn'; // Update the import as mentioned earlier
import { HomePage } from './pages/HomePage'; // Import the HomePage component
import { CreateUser } from './pages/CreateUser'; // Import the HomePage component
import { CreateJob } from './pages/PostJob';
import React, { useState } from 'react';
import { PrimarySearchAppBar } from './components/NavBar/NavMenu';
import { Post } from './components/Post';
import { Profile } from './pages/UserProfile';
import { Navigate } from 'react-router-dom';
import EditProfile from './pages/EditProfile';
import Email from './pages/Email';
import Cookies from 'js-cookie';


export const AuthContext = React.createContext();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [profile, setProfile] = useState(JSON.parse(localStorage.getItem('profile')));

  // Define the handleLogin function to update the login state and store the token
  const handleLogin = (token, userData) => {
    setIsLoggedIn(true);
    Cookies.set('token', token, { secure: true, sameSite: 'strict' });

    // Set the user profile data in the state and local storage
    setProfile(userData);
    localStorage.setItem('profile', JSON.stringify(userData));
  };

  const handleLogout = () => {
    Cookies.remove('token');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <AuthContext.Provider value={{ isLoggedIn, handleLogin, handleLogout }}>
        {profile && <PrimarySearchAppBar profile={profile} userId={profile?.id} />}
        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? <HomePage /> : <Navigate to="/signin" />}
          />
          <Route path="/signin" element={<SignIn handleLogin={handleLogin} />} />
          <Route path="/create" element={<CreateUser />} />
          <Route path="/postjob" element={<CreateJob />} />
          <Route path="/post" element={<Post />} />
          <Route path="/editProfile" element={<EditProfile />} />
          <Route path="/email" element={<Email />} />
          {profile && (
            <Route
              path="/profile/:id"
              element={<Profile profile={profile} />}
            />
          )}
        </Routes>
      </AuthContext.Provider>
    </Router>
  );
}


export default App;
