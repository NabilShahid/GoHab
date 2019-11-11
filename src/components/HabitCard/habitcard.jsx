import React from "react";
import { Tooltip } from "antd";
import markedIcon from "../../assets/images/checkIconMarked1.png";
import unmarkedIcon from "../../assets/images/checkIcon1.png";
import { getTrackPeriodString } from "../../services/methods/habitMethods";
import { HABIT_CATEGORIES } from "../../constants/commonConsts";
import { CATEGORY_ICONS } from "../../constants/iconSvgs";
import "./habitcard.css";
const HabitCard = ({
  name,
  description,
  completed,
  markHabit,
  id,
  category,
  period,
  frequency,
  bgColor
}) => {
  const Icon =
    CATEGORY_ICONS[HABIT_CATEGORIES.find(h=>h.Name==category).Icon] ||
    (() => {
      return <div></div>;
    });
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
              backgroundColor: bgColor
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
          <div className="habitCardTitle" style={{ width: "100%" }}>
            {name}
          </div>

          <div className="habitSubtitle">{description}</div>
          <div className="habitCardInfo">
            Category
            <div>
            <Icon style={{height:"15px",width:"15px",fill:"var(--habit-color)",marginRight:"8px"}}/>

              {category}
            </div>
          </div>
          <div className="habitCardInfo">
            {getTrackPeriodString(period, frequency)}
          </div>
          {/* Habit Hit Miss Markup. Deferred */}
          {/* <div className="row habitCardInfo">
          
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
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default HabitCard;
