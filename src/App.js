import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SignIn } from './components/Member/SignIn'; // Update the import as mentioned earlier
import { HomePage } from './pages/HomePage'; // Import the HomePage component
import { CreateUser } from './pages/CreateUser'; // Import the HomePage component
import { CreateJob } from './pages/PostJob';
import React, {  useState } from 'react';
import axios from 'axios';
import { PrimarySearchAppBar } from './components/Common/NavMenu';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [profile, setProfile] = useState(JSON.parse(localStorage.getItem('profile')));

  // Define the handleLogin function to update the login state and store the token
  const handleLogin = (token) => {
    setIsLoggedIn(true);
    localStorage.setItem('token', token);
    
    // Fetch and store the user's profile data
    axios.get('/api/auth/profile', {
      headers: {
        Authorization: token,
      },
    })
    .then((response) => {
      setProfile(response.data);
      localStorage.setItem('profile', JSON.stringify(response.data));
    })
    .catch((error) => {
      console.error('Error fetching user profile:', error);
    });
  };

  return (

    <Router>
      <PrimarySearchAppBar profile={profile}/>
  
      <Routes>
      <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} />} />
        <Route path="/signin" element={<SignIn handleLogin={handleLogin} />} />
        <Route path='/create' element={<CreateUser />} />
        <Route path='/postjob' element={<CreateJob  />} />
      </Routes>
    </Router>

  );
}


export default App;
