import React from 'react';
import { useAuth } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

function SignOutButton() {
  const navigate = useNavigate();
  const { handleLogout } = useAuth();

  const signOut = () => {
    handleLogout();
    console.log('signout');
    navigate('/signin');
  };

  return <Button onClick={signOut}>Sign Out</Button>;
}

export default SignOutButton;
