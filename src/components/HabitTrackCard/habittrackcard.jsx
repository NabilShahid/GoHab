import React from "react";
import "./habittrackcard.css";
import { Tooltip } from "antd";
import {getTrackPeriodString} from "../../services/methods/habitMethods";
import markedIcon from "../../assets/images/checkIconMarked1.png";
import unmarkedIcon from "../../assets/images/checkIcon1.png";
const HabitTrackCart = ({ habit, currentTrack, trackHabit,parentGoal }) => {
  return (
    <div className="hTrackCard">
      <div className="row">
        <div className="col-md-6">
          <div className="hTrackName">{habit.name}</div>
        </div>
        <div className="col-md-6" style={{ textAlign: "right" }}>
          <div className="hTrackParentGoal">{parentGoal}</div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="hTrackInfo" style={{ fontSize: "12px" }}>
            {getTrackPeriodString(habit.period,currentTrack.Frequency)}
          </div>
        </div>
      </div>
      <div className="row" style={{ marginTop: "20px" }}>
        <div className="col-md-6">
          <div className="hTrackInfo">
            Tracked
            <span className="hTrackCount">
              {currentTrack.Count}/{habit.frequency}
            </span>
            <span>times this week</span>
            <div className="hTrackAddSubstract">
              <i
                onClick={() => {
                  trackHabit(habit, currentTrack.Count+1);
                }}
                className={
                  "fa fa-plus-square " +
                  (currentTrack.Frequency == currentTrack.Count
                    ? "hTrackDisabledButton"
                    : "")
                }
                style={{ color: "#68c76c" }}
              />
              <i
                onClick={() => {
                  trackHabit(habit, currentTrack.Count-1);
                }}
                className={
                  "fa fa-minus-square " +
                  (0 == currentTrack.Count ? "hTrackDisabledButton" : "")
                }
                style={{ marginLeft: "7px", color: "#f95e53" }}
              />
            </div>
          </div>
        </div>

        <div className="col-md-6" style={{ textAlign: "right" }}>
          <div>
            {currentTrack.Frequency == currentTrack.Count ? (
              <Tooltip placement="right" title="Mark as untracked">
                <img
                  onClick={() => {
                    trackHabit(habit, 0);
                  }}
                  src={markedIcon}
                  className="hTrackMark"
                  alt="Mark"
                />
              </Tooltip>
            ) : (
              <Tooltip placement="right" title="Mark as trackes">
                <img
                  onClick={() => {
                    trackHabit(habit, currentTrack.Frequency);
                  }}
                  src={unmarkedIcon}
                  className="hTrackMark"
                  alt="Unmark"
                />
              </Tooltip>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HabitTrackCart;
