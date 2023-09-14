import React, { useEffect, useState } from 'react';

// Update the HomePage component to accept the isLoggedIn prop
export function HomePage({ isLoggedIn }) {
  // Define a state variable to store the user's username
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Retrieve the user's username from local storage
    const storedUsername = localStorage.getItem('username');

    if (storedUsername) {
      // If a username is found in local storage, set it in the state
      setUsername(storedUsername);
    }
  }, []);

  return (
    <div>
      <h2>Welcome to My App</h2>
      {isLoggedIn ? (
        <p>Welcome, {username}!</p>
      ) : (
        <p>This is the home page of the app. Feel free to explore!</p>
      )}
    </div>
  );
}
