import React from "react";
import { Avatar, Badge } from "antd";

import "./goalcard.css";
const GoalCard = () => {
  return (
    <div className="goalCard">
      <div className="row">
        <div className="col-md-2">
          <Avatar shape="circle" style={{ background: "var(--goal-color)" }}>
            G
          </Avatar>
        </div>
        <div className="col-md-10 goalTitle">
          Goal name here<span className="goalDate">13-Feb-2018</span>
          <div className="goalSubtitle">            
            Subtitle of the sofasd flasjkf alhs flkajsk ajsd flkajs dj faskd
            lajsdflaksdj
          </div>
          <div className="goalProgress">
            Progress<span className="progressNumber">100%</span>
            <div className="progress">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: "25%" }}
                aria-valuenow="40"
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
