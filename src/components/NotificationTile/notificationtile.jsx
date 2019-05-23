import React from "react";
import "./notificationtile.css";
const NotificationTile = ({ notificationInfo }) => {
  let notificationString = "";
  if (notificationInfo[2] == "today")
    notificationString +=
      notificationInfo[0] +
      " " +
      notificationInfo[1] +
      " due " +
      notificationInfo[2];
  else if (notificationInfo[2] == "week")
    notificationString +=
      notificationInfo[0] +
      " " +
      notificationInfo[1] +
      " due this " +
      notificationInfo[2];
  else if (notificationInfo[2] == "overdue")
    notificationString +=
      notificationInfo[0] +
      " " +
      notificationInfo[2] +
      " " +
      notificationInfo[1];
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
