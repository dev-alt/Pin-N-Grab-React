import React, { createContext, useContext, useState } from 'react';

const UnreadMessagesContext = createContext();

export function UnreadMessagesProvider({ children }) {
  const [unreadMessageCount, setUnreadMessageCount] = useState(0);

  const incrementUnreadCount = () => {
    setUnreadMessageCount(unreadMessageCount + 1);
    console.log('Incremented Unread Count:', unreadMessageCount);
  };

  const decrementUnreadCount = () => {
    if (unreadMessageCount > 0) {
      setUnreadMessageCount(unreadMessageCount - 1);
      console.log('Decremented Unread Count:', unreadMessageCount);
    }
  };

  return (
    <UnreadMessagesContext.Provider
      value={{ unreadMessageCount, incrementUnreadCount, decrementUnreadCount }}
    >
      {children}
    </UnreadMessagesContext.Provider>
  );
}

export function UseUnreadMessages() {
  return useContext(UnreadMessagesContext);
}
