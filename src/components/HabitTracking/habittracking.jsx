import React, { Component } from "react";
import HabitTrackCard from "../HabitTrackCard/habittrackcard";
import "./habittracking.css";
class HabitTracking extends Component {
  state = {};
  render() {
    return (
      <div>
        <div className="hTrackingCardContainer">
          <HabitTrackCard />
        </div>
        <div className="hTrackingCardContainer">
          <HabitTrackCard />
        </div>
        <div className="hTrackingCardContainer">
          <HabitTrackCard />
        </div>
        <div className="hTrackingCardContainer">
          <HabitTrackCard />
        </div>
        <div className="hTrackingCardContainer">
          <HabitTrackCard />
        </div>
        <div className="hTrackingCardContainer">
          <HabitTrackCard />
        </div>
        <div className="hTrackingCardContainer">
          <HabitTrackCard />
        </div>
        <div className="hTrackingCardContainer">
          <HabitTrackCard />
        </div>
        <div className="hTrackingCardContainer">
          <HabitTrackCard />
        </div>
        <div className="hTrackingCardContainer">
          <HabitTrackCard />
        </div>
        <div className="hTrackingCardContainer">
          <HabitTrackCard />
        </div>
        <div className="hTrackingCardContainer">
          <HabitTrackCard />
        </div>
         
      </div>
    );
  }
}

export default HabitTracking;
