import React from "react";
import GoalTaskProgressLinechart from "../../charts/goalTaskProgressLinechart";
import OverduePendingChart from "../../charts/overduePendingChart";
import {
  getGoalProgressArrayForChart,
  getOverdueAndPendingGoalsForChart
} from "../../services/chartService.js";
import { Popover } from "antd";
import HabitHitMissBarChart from "../../charts/habitHitMissBarChart";

import { connect } from "react-redux";

const GoalStats = ({ goalProgressData, goalsOverduePendingData }) => {
  return (
    <div className="fullHeight" style={{ overflowY: "auto" }}>
      <div style={{ width: "100%" }}>
        <div className="goalTaskProgressLineChartLabel">
          Goal Progress Line Chart{" "}
          <Popover
            placement="bottomLeft"
            // title="Change View"
            content={
              <div>
                Chart showing how early or late goal was completed in days.
                <ul>
                  <li>
                    Vertical axis shows number of days. Positive for days before
                    due date, and negative for days after due date
                  </li>
                  <li>Horizontal axis shows goals</li>
                </ul>{" "}
              </div>
            }
            trigger="hover"
          >
            <i className="fa fa-info-circle graphInfoIcon"></i>
          </Popover>
        </div>
        <GoalTaskProgressLinechart data={goalProgressData} />
      </div>
      <div className="chartsHorizontalSeperator"></div>
      <div className="row">
        <div className="col-md-6">
          <div className="halfPageChartLabel">Overdue Pending Chart</div>
          <OverduePendingChart data={goalsOverduePendingData} />
        </div>
        <div className="col-md-6">
          {" "}
          <div className="halfPageChartLabel">Overdue Pending Chart</div>
          <HabitHitMissBarChart data={goalsOverduePendingData} />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    goalProgressData: getGoalProgressArrayForChart(state.goalReducer.Goals),
    goalsOverduePendingData: getOverdueAndPendingGoalsForChart(
      state.goalReducer.Goals
    )
  };
};

export default connect(
  mapStateToProps,
  null
)(GoalStats);
