import React from "react";
import GoalTaskProgressLinechart from "../../charts/goalTaskProgressLinechart";
import OverduePendingChart from "../../charts/overduePendingChart";
import {
  getTaskProgressArrayForChart,
  getOverdueAndPendingGoalsForChart,
  getGoalTaskDueDateDataForBarChart
} from "../../services/chartService.js";
import { Popover } from "antd";
import GoalTaskDueDateBarChart from "../../charts/goalTaskDueDateBarChart";

import { connect } from "react-redux";

const TaskStats = ({ tasksProgressData, tasksOverduePendingData,tasksDueDateData }) => {
  return (
    <div className="fullHeight" style={{ overflowY: "auto" }}>
      <div style={{ width: "100%" }}>
        <div className="goalTaskProgressLineChartLabel">
          Task Progress Line Chart{" "}
          <Popover
            placement="bottomLeft"
            // title="Change View"
            content={
              <div>
                Chart showing how early or late task was completed in days.
                <ul>
                  <li>
                    Vertical axis shows number of days. Positive for days before
                    due date, and negative for days after due date
                  </li>
                  <li>Horizontal axis shows tasks</li>
                </ul>{" "}
              </div>
            }
            trigger="hover"
          >
            <i className="fa fa-info-circle graphInfoIcon"></i>
          </Popover>
        </div>
        <GoalTaskProgressLinechart data={tasksProgressData} />
      </div>
      <div className="chartsHorizontalSeperator"></div>
      <div className="row">
        <div className="col-md-6">
          <div className="halfPageChartLabel">Overdue Pending Chart</div>
          <OverduePendingChart data={tasksOverduePendingData} />
        </div>
        <div className="col-md-6">
          {" "}
          <div className="halfPageChartLabel">Overdue Pending Chart</div>
          <GoalTaskDueDateBarChart data={tasksDueDateData} />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    tasksProgressData: getTaskProgressArrayForChart(state.taskReducer.Tasks),
    tasksOverduePendingData: getOverdueAndPendingGoalsForChart(
      state.taskReducer.Tasks
    ),
    tasksDueDateData: getGoalTaskDueDateDataForBarChart(state.taskReducer.Tasks)
  };
};

export default connect(
  mapStateToProps,
  null
)(TaskStats);
