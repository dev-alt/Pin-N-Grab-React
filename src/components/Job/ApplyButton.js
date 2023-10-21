import React, { useState } from 'react';
import { Button } from '@mui/material';
import { useAuth } from '../../AuthContext';
import Cookies from 'js-cookie';
import axios from 'axios';

  const ApplyButton = ({ job, onApplicationSubmitted }) => {
    const [isLoading, setIsLoading] = useState(false);
    const { profile } = useAuth();
    const authToken = Cookies.get('token');
    const user_id = profile.profile.UserId;
  
    const handleApply = () => {
      setIsLoading(true);
      console.log('Applying for job:', job.id);
  
      axios.post(`/api/jobs/applyForJob/${job.id}`, {
        applicationText: 'Your application text goes here',
        user_id: user_id,
      }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: authToken,
        }
      })
        .then((response) => {
          setIsLoading(false);
          const data = response.data;
          console.log('Response data:', data);
  
          if (data.error) {
            // Handle the error, e.g., display an error message
            console.error(data.error);
            onApplicationSubmitted({ success: false, message: data.error });
          } else {
            // Application submitted successfully, you can update the UI as needed
            console.log('Application submitted successfully:', data.application);
            onApplicationSubmitted({ success: true, message: "Application submitted successfully" });
            if (data.applied) {
              // You can use data.applied to show a message or update the UI
              console.log('You have already applied for this job.');
              onApplicationSubmitted({ success: false, message: "You have already applied for this job" });
            }
          }
        })
        .catch((error) => {
          setIsLoading(false);
          console.error('Error applying for the job:', error);
          onApplicationSubmitted({ success: false, message: "Error applying for the job" });
        });
    };
  
    return (
      <Button
        variant="contained"
        sx={{ width: '1rem', marginTop: '20px' }}
        disabled={isLoading}
        onClick={handleApply}
      >
        {isLoading ? 'Applying...' : 'Apply'}
      </Button>
    );
  };
  
  export default ApplyButton;