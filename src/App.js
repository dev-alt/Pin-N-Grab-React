import React from 'react';
import AdminPage from './pages/AdminPage';
import { BrowserRouter as Router, Route, Outlet, Link, Routes } from 'react-router-dom';
import { SignIn } from './components/Member/SignIn'; // Update the import as mentioned earlier
import { Nav, Navbar } from './components/Common/NavBar';
import { HomePage } from './pages/HomePage'; // Import the HomePage component
import { CreateUser } from './pages/CreateUser'; // Import the HomePage component
import { CreateJob } from './pages/PostJob';


function App() {
  return (

    <Router>
      <Navbar />        
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path='/create' element={<CreateUser />} />
        <Route path='/postjob' element={<CreateJob  />} />
      </Routes>
    </Router>

  );
}


export default App;
