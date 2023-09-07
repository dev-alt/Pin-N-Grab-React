import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField, Container } from '@mui/material';

/**
 * Renders a user registration form and handles user registration by sending a POST request to the server with the user's credentials.
 * @function
 * @returns {JSX.Element} A JSX element representing the user registration form.
 */
export function CreateUser() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  // Log the value of REACT_APP_PROXY_URL
  useEffect(() => {
    console.log('REACT_APP_PROXY_URL:', process.env.REACT_APP_PROXY_URL);
  }, []);

  /**
   * Handles user registration by sending a POST request to the server with the user's credentials.
   * @async
   * @function
   * @returns {Promise<void>}
   */
  const handleRegister = async () => {
    try {
      const response = await axios.post('/api/auth/register', {
        username,
        email,
        password,
        firstName,
        lastName,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <h2>User Registration</h2>
      <TextField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
            <TextField
        label="First Name"
        type="firstName"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <br />
            <TextField
        label="Last Name"
        type="lastName"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />

      <Button variant="contained" onClick={handleRegister}>
        Register
      </Button>
    </Container>
  );
}
