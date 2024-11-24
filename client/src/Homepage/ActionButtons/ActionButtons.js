import React from "react";
import "./ActionButtons.css";

function ActionButtons() {
  return (
    <div className="action-buttons">
      <button onClick={() => alert("Navigating to Create Blog")}>
        Create Blog
      </button>
      <button onClick={() => alert("Navigating to Profile")}>Profile</button>
      <button onClick={() => alert("Logging Out")}>Logout</button>
    </div>
  );
}

export default ActionButtons;
