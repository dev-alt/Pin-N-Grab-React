import { useState } from 'react';

function useJobSave(userId, jobId) {
  const [isSaved, setIsSaved] = useState(false);

  const toggleSaved = async () => {
    // Prepare the request data
    const requestData = {
      method: isSaved ? 'DELETE' : 'POST', // Use DELETE to unsave and POST to save
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      if (isSaved) {
        // Send the DELETE request to unsave
        const response = await fetch(
          `/api/users/${userId}/unsaveJob/${jobId}`,
          requestData,
        );
        if (response.ok) {
          console.log(`Job ${jobId} unsaved`);
          setIsSaved(false); // Update the isSaved state to false after successful unsave
        } else {
          console.error(`Failed to unsave job ${jobId}`);
        }
      } else {
        // Send the POST request to save
        const response = await fetch(
          `/api/users/${userId}/saveJob/${jobId}`,
          requestData,
        );
        if (response.ok) {
          console.log(`Job ${jobId} saved`);
          setIsSaved(true); // Update the isSaved state to true after successful save
        } else {
          console.error(`Failed to save job ${jobId}`);
        }
      }
    } catch (error) {
      console.error(
        `An error occurred while ${isSaved ? 'unsaving' : 'saving'} the job:`,
        error,
      );
    }
  };

  return {
    isSaved,
    toggleSaved,
  };
}

export default useJobSave;
