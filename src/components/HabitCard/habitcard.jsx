import React from "react";
import { Avatar, Badge } from "antd";
import moment from "moment";

import "./habitcard.css";
const HabitCard = ({name,description,dueDate,progress,asscTasks,asscHabits}) => {
  if(!dueDate)dueDate="No due date"
  else dueDate=moment(dueDate).format("DD-MMM-YYYY")
  return (
    <div className="habitCard">
      <div className="row">
        <div className="col-md-2">
          <div className="cardAvatar" style={{ background: "var(--habit-color)", boxShadow:"var(--habit-shadow)" }}>
            {name[0].toUpperCase()||""}
          </div>
        </div>
        <div className="col-md-10 habitTitle">
          {name}<span className="habitDate">{dueDate}</span>
          <div className="habitSubtitle">            
            {description}
          </div>
          <div className="habitProgress">
            Progress<span className="progressNumber">{progress}%</span>
            <div className="progress">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: progress+"%" }}
                aria-valuenow={progress}
                aria-valuemin="0"
                aria-valuemax="100"
              />
            </div>
          </div>
        
        </div>
      </div>
      <div className="habitAssociations">
            <div className="row">
              <div className="col-md-6 habitBadge" style={{borderRight:"1px solid #cec8c8"}}>                
                <div className="asscCount" >
                  2
                </div>
               
               Associated Habits

                
              </div>
              <div className="col-md-6 habitBadge" >               
                <div className="asscCount" >
                  3
                </div>
                Associated Tasks
              </div>
             
            </div>
          </div>
    </div>
  );
};

export default HabitCard;
