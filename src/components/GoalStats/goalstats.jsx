import React from "react";
import GoalHabitProgressLineChart from "../../charts/goalHabitProgressLinechart";
import OverduePendingChart from "../../charts/overduePendingChart";
import {
  getGoalProgressArrayForChart,
  getOverdueAndPendingGoalsForChart
  
} from "../../services/chartService.js";
import { connect } from "react-redux";

const GoalStats = ({goalProgressData,goalsOverduePendingData}) => {
  return (
    <div>

    <div style={{width:"100%",height:"100%"}}>
      <GoalHabitProgressLineChart data={goalProgressData}/>
    </div>
    <div style={{width:"100%"}}>
    <div style={{width:"50%"}}><OverduePendingChart data={goalsOverduePendingData} /></div>
    <div style={{width:"50%"}}></div>
    </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    goalProgressData: getGoalProgressArrayForChart(state.goalReducer.Goals),
    goalsOverduePendingData: getOverdueAndPendingGoalsForChart(state.goalReducer.Goals)
  };
};

export default connect(
  mapStateToProps,
  null
)(GoalStats);

