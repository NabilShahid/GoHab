import React from "react";
import { Avatar, Badge, Rate } from "antd";
import moment from "moment";

import "./taskcard.css";
const TaskCard = ({ name, description, dueDate, importance }) => {
  if (!dueDate) dueDate = "No due date";
  else dueDate = moment(dueDate).format("DD-MMM-YYYY");
  return (
    <div className="taskCard">
      <div className="row">
        <div className="col-md-2">
          <div
            className="cardAvatar"
            style={{
              background: "var(--task-color)",
              boxShadow: "var(--task-shadow)"
            }}
          >
            {name[0].toUpperCase() || ""}
          </div>
        </div>
        <div className="col-md-10 taskTitle">
          {name}
          <span className="taskDate">{dueDate}</span>
          <div className="taskSubtitle">{description}</div>
          <div className="taskImportance">
            Importance
            <div>
              <Rate
                disabled="true"
                character={<i className="fa fa-exclamation-triangle" />}
                allowHalf
                value={importance}
                style={{
                  fontSize: 19,
                  color: "#66bb6a",
                  marginTop: "5px"
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
