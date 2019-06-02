import React from "react";
import { getNotificationText } from "../../services/methods/ghtCommonMethods";
import "./notificationtile.css";
const NotificationTile = ({ notificationInfo }) => {
  let notificationString = getNotificationText(notificationInfo);
  const background = `var(${(notificationInfo[1] == "Goals" &&
    "--goal-color") ||
    (notificationInfo[1] == "Habits" && "--habit-color") ||
    (notificationInfo[1] == "Tasks" && "--task-color")})`;
  return (
    <div className="notificationTile" style={{ background }}>
      {notificationString}
    </div>
  );
};

export default NotificationTile;
