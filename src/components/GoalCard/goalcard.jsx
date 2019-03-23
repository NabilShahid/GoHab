import React from "react";
import { Avatar, Badge, Button, Icon, Tooltip } from "antd";
import moment from "moment";

import "./goalcard.css";
const GoalCard = ({
  name,
  description,
  dueDate,
  progress,
  id,
  asscTasks,
  asscHabits,
  markGoal
}) => {
  if (!dueDate) dueDate = "No due date";
  else dueDate = moment(dueDate).format("DD-MMM-YYYY");
  return (
    <div className="goalCard" style={progress==100?{background:"#dedede", color:"#adadad"}:{}}>
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
          {/* <Icon type="check-circle" style={{color:"green"}}/> */}
          <Tooltip placement="right" title={progress == 100 ? "Mark as pending" : "Mark as achieved"}>
              
          <i onClick={(e)=>{e.stopPropagation();markGoal(id)}}
            className={
              "fa fa-check markIcon " +
              (progress == 100 ? "markChecked" : "markUnchecked")
            }
          />
            </Tooltip>
          
        </div>
        <div className="col-md-10 goalTitle">
          {name}
          <span className="goalDate">{dueDate}</span>
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
