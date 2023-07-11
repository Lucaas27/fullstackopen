import React from 'react';

function Notification({ message, status }) {
  return message ? <div className={status}>{message}</div> : null;
}

export default Notification;
