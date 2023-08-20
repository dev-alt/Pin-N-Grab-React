import React from 'react';

export const UseAuth0 = () => {
  const isAuthenticated = false; // Replace with your logic
  const loginWithRedirect = () => {}; // Replace with your logic
  const logout = () => {}; // Replace with your logic
  const user = { nickname: 'MockUser' }; // Replace with your logic

  return {
    isAuthenticated,
    loginWithRedirect,
    logout,
    user,
  };
};
