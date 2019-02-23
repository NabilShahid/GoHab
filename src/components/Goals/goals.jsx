import React, { Component } from "react";
import GoalCard from "../GoalCard/goalcard";
import "./goals.css";
class Goals extends Component {
  state = {};
  render() {
    return (
      <div id="goalCardsDiv">
        <div className="row">
          <div className="col-md-4">
            <GoalCard />
          </div>
          <div className="col-md-4">
            <GoalCard />
          </div>
          <div className="col-md-4">
            <GoalCard />
          </div>
        </div>
        <div className="row goalsRow">
          <div className="col-md-4">
            <GoalCard />
          </div>
          <div className="col-md-4">
            <GoalCard />
          </div>
          <div className="col-md-4">
            <GoalCard />
          </div>
        </div>
      </div>
    );
  }
}

export default Goals;
