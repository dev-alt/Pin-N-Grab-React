import React, { useState, useEffect } from 'react';
import { Button, Container, Paper, TextField, Typography } from '@mui/material';
import axios from 'axios'; // Import axios for making API requests
import Cookies from 'js-cookie';
import Autocomplete from '@mui/material/Autocomplete';

const ComposeEmail = () => {
  const [selectedRecipient, setSelectedRecipient] = useState(null);
  const [recipientOptions, setRecipientOptions] = useState([]);
  const [emailData, setEmailData] = useState({
    to: '',
    cc: '',
    bcc: '',
    subject: '',
    message: '',
    recipientUserId: null, // Add this line to store the selected recipient's ID
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmailData({ ...emailData, [name]: value });
  };

  const handleSend = async () => {
    try {
      const authToken = Cookies.get('token');
      const requestData = {
        ...emailData,
        recipientUserId: selectedRecipient ? selectedRecipient.id : null,
      };

      console.log('Sending email with data:', requestData); // Log the data being sent

      const response = await axios.post('/api/email/send', requestData, {
        headers: {
          Authorization: authToken,
        },
      });

      console.log('Email sent:', response.data);

      // Clear the form fields after sending the email
      setEmailData({
        to: '',
        cc: '',
        bcc: '',
        subject: '',
        message: '',
        recipientUserId: null,
      });
      setSelectedRecipient(null); // Clear the selected recipient
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  useEffect(() => {
    // Fetch the list of valid users and populate recipientOptions
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/users/all'); // Replace with your user retrieval endpoint
        const users = response.data; // Assuming the response is an array of user objects
        setRecipientOptions(users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <Container maxWidth="lg">
      <Paper elevation={3} sx={{ padding: '16px' }}>
        <Typography variant="h5" gutterBottom>
          Compose new message
        </Typography>

        <Autocomplete
          fullWidth
          label="To"
          options={recipientOptions}
          getOptionLabel={(option) => option.username} // Replace with the field you want to display for each user
          value={selectedRecipient}
          onChange={(event, newValue) => setSelectedRecipient(newValue)}
          renderInput={(params) => <TextField {...params} variant="outlined" />}
        />

        <TextField
          fullWidth
          label="CC"
          variant="outlined"
          margin="normal"
          name="cc"
          value={emailData.cc}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          label="BCC"
          variant="outlined"
          margin="normal"
          name="bcc"
          value={emailData.bcc}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          label="Subject"
          variant="outlined"
          margin="normal"
          name="subject"
          value={emailData.subject}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          label="Message"
          variant="outlined"
          multiline
          rows={6}
          margin="normal"
          name="message"
          value={emailData.message}
          onChange={handleChange}
        />

        <Button
          variant="contained"
          color="secondary"
          sx={{ marginRight: '8px' }}
        >
          Cancel
        </Button>

        <Button variant="contained" color="primary" onClick={handleSend}>
          Send message
        </Button>
      </Paper>
    </Container>
  );
};

export default ComposeEmail;
