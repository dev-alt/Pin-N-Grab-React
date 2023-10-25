import React from 'react';
import { useAuth } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

function SignOutButton() {
  const navigate = useNavigate();
  const { handleLogout } = useAuth();

  const signOut = () => {
    handleLogout();
    console.log('Sign-out button clicked.');
    navigate('/signin');
  };

  return (
    <Button onClick={signOut} sx={{ color: '#9A8311' }}>
      Sign Out
    </Button>
  );
}

export default SignOutButton;
