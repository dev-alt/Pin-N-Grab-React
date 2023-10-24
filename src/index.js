// Import necessary modules and components
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { AuthProvider } from './AuthContext';
import { UnreadMessagesProvider } from './UnreadMessagesContext';

const root = createRoot(document.getElementById('root'));

root.render(
  <AuthProvider>
    <UnreadMessagesProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </UnreadMessagesProvider>
  </AuthProvider>,
);
