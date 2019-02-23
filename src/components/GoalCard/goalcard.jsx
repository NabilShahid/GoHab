import React from "react";
import { Avatar, Badge } from "antd";
import moment from "moment";

import "./goalcard.css";
const GoalCard = ({name,description,dueDate,progress,asscTasks,asscHabbits}) => {
  if(!dueDate)dueDate="No due date"
  else dueDate=moment(dueDate).format("DD-MMM-YYYY")
  return (
    <div className="goalCard">
      <div className="row">
        <div className="col-md-2">
          <Avatar shape="circle" style={{ background: "var(--goal-color)" }}>
            G
          </Avatar>
        </div>
        <div className="col-md-10 goalTitle">
          {name}<span className="goalDate">{dueDate}</span>
          <div className="goalSubtitle">            
            {description}
          </div>
          <div className="goalProgress">
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
      <div className="goalAssociations">
            <div className="row">
              <div className="col-md-6 goalBadge" style={{borderRight:"1px solid #cec8c8"}}>                
                <div className="asscCount" >
                  2
                </div>
               
               Associated Habbits

                
              </div>
              <div className="col-md-6 goalBadge" >               
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

export default GoalCard;
