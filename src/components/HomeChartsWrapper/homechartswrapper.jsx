import React, { Component } from "react";
import OverduePendingChart from "../../charts/overduePendingChart";
import HabitHitMissBarChart from "../../charts/habitHitMissBarChart";
import OnTimeBeforeTimeRadarChart from "../../charts/onTimeBeforeTimeRadarChart";
import {
  getOverdueAndPendingGoalsForChart,
  getOverdueAndPendingTasksForChart,
  getHabitHitMissDataForHomeRadarChart
} from "../../services/chartService.js";
import { connect } from "react-redux";
const HomeChartsWrapper = ({ goalsData, tasksData, habitsData }) => {
  return (
    <div className="row">
      <div className="col-md-4 homeChartDiv">
        <OverduePendingChart data={goalsData} />
      </div>
      <div className="col-md-4 homeChartDiv">
        <OnTimeBeforeTimeRadarChart
          data={habitsData}
          total={
            habitsData.Missed +
            habitsData.Followed +
            habitsData.PartiallyFollowed
          }
        />
      </div>
      <div className="col-md-4 homeChartDiv">
        <OverduePendingChart data={tasksData} />
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    goalsData: getOverdueAndPendingGoalsForChart(state.goalReducer.Goals),
    tasksData: getOverdueAndPendingTasksForChart(state.taskReducer.Tasks),
    habitsData: getHabitHitMissDataForHomeRadarChart(state.habitReducer.Habits)
  };
};

export default connect(
  mapStateToProps,
  null
)(HomeChartsWrapper);
