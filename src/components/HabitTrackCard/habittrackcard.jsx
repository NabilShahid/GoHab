import React from "react";
import "./habittrackcard.css";
const HabitTrackCart = () => {
  return (
    <div className="hTrackCard">
      <div className="row">
        <div className="col-md-6">
          <div className="hTrackName">A Very nice habit</div>
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
            <span className="hTrackCount">1/5</span>
            <span>times this week</span>
            <div className="hTrackAddSubstract">
              <i className="fa fa-plus-square" style={{color:"#68c76c"}} />
              <i className="fa fa-minus-square" style={{marginLeft:"7px", color:"#f95e53"}} />
            </div>
          </div>
        </div>

        <div className="col-md-6" style={{ textAlign: "right" }}>
          <div className="hTrackInfo">Mark</div>
        </div>
      </div>
    </div>
  );
};

export default HabitTrackCart;
