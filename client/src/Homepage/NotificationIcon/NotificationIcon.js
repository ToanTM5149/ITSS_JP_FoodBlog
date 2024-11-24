import React from "react";
import "./NotificationIcon.css";

function NotificationIcon({ hasNotifications }) {
  return (
    <div className="notification-icon">
      <i className="bell-icon">🔔</i>
      {hasNotifications && <span className="notification-dot"></span>}
    </div>
  );
}

export default NotificationIcon;
