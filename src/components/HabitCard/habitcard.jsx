import React from "react";
import { Avatar, Badge, Rate, Tooltip } from "antd";
import moment from "moment";
import "./habitcard.css";
const HabitCard = ({ name, description, completed, markHabit, id }) => {
  return (
    <div
      className="habitCard"
      style={
        completed
          ? { color: "rgb(195, 195, 195)", background: "rgb(251, 251, 251)" }
          : {}
      }
    >
      <div className="row">
        <div className="col-md-2">
          <div
            className="cardAvatar"
            style={{
              background: "var(--habit-color)",
              boxShadow: "var(--habit-shadow)"
            }}
          >
            {name[0].toUpperCase() || ""}
          </div>
          <Tooltip
            placement="right"
            title={completed ? "Mark as pending" : "Mark as completed"}
          >
            <i
              className={"habitMarkIcon fa "+(completed ? "fa-play habitCardFollowed" : "fa-stop habitCardMissed")}
              onClick={e => {
                e.stopPropagation();
                markHabit(id);
              }}
             
            ></i>
          </Tooltip>
        </div>
        <div className="col-md-10 habitCardContent">
          <div style={{ width: "100%" }}>{name}</div>

          <div className="habitSubtitle">{description}</div>
          <div className="habitCardInfo">
            Category
            <div>
             dfdfasfas adf sdfdf
            </div>
          </div>
          <div className="habitCardInfo">
            Following
            <div>
             5 times a day
            </div>
          </div>
          <div className="habitCardInfo">
          <div className="row">
            <div className="col-md-6 habitCardMissed">Missed:</div>
            <div className="col-md-6 habitCardFollowed">Followed:</div>
          
          </div>
          <div className="row">
            <div className="col-md-6 habitCardMissed">5324 times</div>
            <div className="col-md-6 habitCardFollowed">4324 times</div>

          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HabitCard;
