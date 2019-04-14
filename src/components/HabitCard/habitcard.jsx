import React from "react";
import { Tooltip } from "antd";
import markedIcon from "../../assets/images/checkIconMarked1.png";
import unmarkedIcon from "../../assets/images/checkIcon1.png";
import HabitHitMissChart from "../../charts/habitHitMissChart";
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
            title={completed ? "Start following" : "Stop following"}
          >
            <img
              src={completed ? markedIcon : unmarkedIcon}
              onClick={e => {
                e.stopPropagation();
                markHabit(id);
              }}
              alt="Mark/Unmark as Complete"
              className="markIcon"
            />
          </Tooltip>
        </div>
        <div className="col-md-10 habitCardContent">
          <div style={{ width: "100%" }}>{name}</div>

          <div className="habitSubtitle">{description}</div>
          <div className="habitCardInfo">
            Category
            <div>dfdfasfas adf sdfdf</div>
          </div>
          <div className="habitCardInfo">
            Following
            <div>5 times a day</div>
          </div>
          {/* <div className="habitCardInfo">
            <div className="row">
              <div className="col-md-6 habitCardMissed">Missed:</div>
              <div className="col-md-6 habitCardFollowed">Followed:</div>
            </div>
            <div className="row">
              <div className="col-md-6 habitCardMissed">5324 times</div>
              <div className="col-md-6 habitCardFollowed">4324 times</div>
            </div>
          </div> */}
          <div className="row habitCardInfo">
          
            <div className="col-md-6">
              <div style={{color:(completed?"#97e097":"#60d660")}}>
                <i className="fa fa-check" style={{marginRight:"5px"}}/>Followed
                <div>
                  <span className="habitCardNumber">123</span> times
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div style={{color:(completed?"#ffa7a7":"#ff6464")}}>
                <i className="fa fa-times" style={{marginRight:"5px"}} />Missed
                <div>
                  <span className="habitCardNumber">10</span> times
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HabitCard;
