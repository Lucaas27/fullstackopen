import React from "react";

const Notification = ({ message, status }) =>
  message ? <div className={status}>{message}</div> : null;

export default Notification;
