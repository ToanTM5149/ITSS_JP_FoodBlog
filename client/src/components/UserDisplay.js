import React from "react";
import "./UserDisplay.css";

function UserDisplay({ username }) {
  return <div className="user-display">Hello, {username}!</div>;
}

export default UserDisplay;
