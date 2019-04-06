import React from "react";
import { Avatar, Badge, Rate, Tooltip } from "antd";
import moment from "moment";
import markedIcon from "../../assets/images/checkIconMarked.png";
import unmarkedIcon from "../../assets/images/checkIconUnmarked.png";
import "./taskcard.css";
const TaskCard = ({
  name,
  description,
  dueDate,
  importance,
  completed,
  markTask,
  id
}) => {
  if (!dueDate) dueDate = "No due date";
  else dueDate = moment(dueDate).format("DD-MMM-YYYY");
  return (
    <div
      className="taskCard"
      style={completed ? { color: "rgb(195, 195, 195)", background: "rrgb(249, 249, 249)"  } : {}}
    >
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
          <Tooltip
            placement="right"
            title={completed ? "Mark as pending" : "Mark as completed"}
          >
            <img
              src={completed ? markedIcon : unmarkedIcon}
              onClick={e => {
                e.stopPropagation();
                markTask(id);
              }}
              alt="Mark/Unmark as Complete"
              className="markIcon"
            />
          </Tooltip>
        </div>
        <div className="col-md-10 taskCardContent">
          <div style={{ display: "flex" }}>
            <div style={{ flex: "1 1 70%" }}>{name}</div>
            <div style={{ flex: "1 1 30%" }}>
              <span className="taskDate">{dueDate}</span>
            </div>
          </div>
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
