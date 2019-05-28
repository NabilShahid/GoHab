import React from "react";
import "./habittrackcard.css";
import markedIcon from "../../assets/images/checkIconMarked1.png";
import unmarkedIcon from "../../assets/images/checkIcon1.png";
const HabitTrackCart = ({habit,currentCount,trackHabit}) => {
  return (
    <div className="hTrackCard">
      <div className="row">
        <div className="col-md-6">
          <div className="hTrackName">{habit.name}</div>
        </div>
        <div className="col-md-6" style={{ textAlign: "right" }}>
          <div className="hTrackParentGoal">Under Goal: A very shit goal</div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="hTrackInfo" style={{ fontSize: "12px" }}>
            Tracking 5 times a week
          </div>
        </div>
      </div>
      <div className="row" style={{ marginTop: "20px" }}>
        <div className="col-md-6">
          <div className="hTrackInfo">
            Tracked
            <span className="hTrackCount">{currentCount}/{habit.frequency}</span>
            <span>times this week</span>
            <div className="hTrackAddSubstract">
              <i onClick={()=>{trackHabit(habit,++currentCount)}} className="fa fa-plus-square" style={{color:"#68c76c"}} />
              <i onClick={()=>{trackHabit(habit,--currentCount)}} className="fa fa-minus-square" style={{marginLeft:"7px", color:"#f95e53"}} />
            </div>
          </div>
        </div>

        <div className="col-md-6" style={{ textAlign: "right" }}>
          <div><img src={markedIcon}  className="hTrackMark" alt="Mark"/></div>
        </div>
      </div>
    </div>
  );
};

export default HabitTrackCart;
