import React from 'react';

function Notifications({ message, status }) {
  if (message === null) {
    return null;
  }
  return <div className={status}>{message}</div>;
}

export default Notifications;
