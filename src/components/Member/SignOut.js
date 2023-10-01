import React, { useContext } from 'react';
import { AuthContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';


function SignOutButton() {
  const navigate = useNavigate();
  const { handleLogout } = useContext(AuthContext);

  const signOut = () => {
    handleLogout();
    navigate('/signin');
  };

  return <Button onClick={signOut}>Sign Out</Button>;
}

export default SignOutButton;