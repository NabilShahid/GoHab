import React from "react";
const NotificationTile = ({ openNotificationsDialog }) => {
  return (
    <div
      className="notificationTile"
      onClick={() => {
        openNotificationsDialog();
      }}
    >
      You have 4 tasks due this week
    </div>
  );
};

export default NotificationTile;
