import React from 'react';
import { toast, ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css';
import { Button, Box } from '@mui/material';
import { Message } from '@mui/icons-material';

function Notification() {
  const handleNewMessage = () => {
    // Show a success notification
    toast.success('New message received!', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
    });
  };

  return (
    <Box>
      <Button onClick={handleNewMessage}>Receive Message</Button>
      <ToastContainer /> 
    </Box>
  );
}

export default Notification;
