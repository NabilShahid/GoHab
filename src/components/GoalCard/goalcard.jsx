import React from "react";
import { Avatar, Badge, Button, Icon, Tooltip, Rate } from "antd";
import moment from "moment";
import markedIcon from "../../assets/images/checkIconMarked.png";
import unmarkedIcon from "../../assets/images/checkIconUnmarked.png";

import "./goalcard.css";
const GoalCard = ({
  name,
  description,
  dueDate,
  progress,
  id,
  importance,
  asscTasks,
  asscHabits,
  markGoal
}) => {
  if (!dueDate) dueDate = "No due date";
  else dueDate = moment(dueDate).format("DD-MMM-YYYY");
  return (
    <div
      className="goalCard"
      style={progress == 100 ? { background: "#dedede", color: "#adadad" } : {}}
    >
      <div className="row">
        <div className="col-md-2">
          <div
            className="cardAvatar"
            style={{
              background: "var(--goal-color)",
              boxShadow: "var(--goal-shadow)"
            }}
          >
            {name[0].toUpperCase() || ""}
          </div>
          <Tooltip
            placement="right"
            title={progress == 100 ? "Mark as pending" : "Mark as achieved"}          >
           
            <img
              src={progress == 100 ? markedIcon : unmarkedIcon}
              onClick={e => {
                e.stopPropagation();
                markGoal(id);
              }}
              alt="Mark/Unmark as Complete"
              className="markIcon"
            />
          </Tooltip>
        </div>
        <div className="col-md-10 goalCardContent">
          <div style={{ display: "flex" }}>
            <div style={{ flex: "1 1 70%" }}>{name}</div>
            <div style={{ flex: "1 1 30%" }}>
              <span className="goalDate">{dueDate}</span>
            </div>
          </div>
          <div className="goalSubtitle">{description}</div>
          <div className="goalProgress">
            Progress<span className="progressNumber">{progress}%</span>
            <div className="progress">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: progress + "%" }}
                aria-valuenow={progress}
                aria-valuemin="0"
                aria-valuemax="100"
              />
            </div>
          </div>
          <div className="goalImportance">
            Importance
            <div>
              <Rate
                disabled="true"
                character={<i className="fa fa-exclamation-triangle" />}
                allowHalf
                value={importance}
                style={{
                  fontSize: 19,
                  color: "#ffa726",
                  marginTop: "5px"
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="goalAssociations">
        <div className="row">
          <div
            className="col-md-6 goalBadge"
            style={{ borderRight: "1px solid #cec8c8" }}
          >
            <div className="asscCount">2</div>
            Associated Habits
          </div>
          <div className="col-md-6 goalBadge">
            <div className="asscCount">3</div>
            Associated Tasks
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalCard;
