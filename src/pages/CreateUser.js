import React, { useState } from 'react';
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
      <Button variant="contained" onClick={handleRegister}>
        Register
      </Button>
    </Container>
  );
}

