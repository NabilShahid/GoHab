import React, { Component } from "react";
import OverduePendingChart from "../../charts/overduePendingChart";
import {
  getOverdueAndPendingGoalsForChart,
  getOverdueAndPendingTasksForChart
} from "../../services/chartService.js";
import { connect } from "react-redux";
class HomeChartsWrapper extends Component {
  state = {};
  getOverduePendingCount() {}
  render() {
    return (
      <div className="row">
        <div className="col-md-4 homeChartDiv">
          <OverduePendingChart data={this.props.goalsData} />
        </div>
        <div className="col-md-4 homeChartDiv">
          {/* <OverduePendingChart/> */}
        </div>
        <div className="col-md-4 homeChartDiv">
          <OverduePendingChart data={this.props.tasksData}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    goalsData: getOverdueAndPendingGoalsForChart(state.goalReducer.Goals),
    tasksData: getOverdueAndPendingTasksForChart(state.taskReducer.Tasks),
  };
};

export default connect(mapStateToProps,null)(HomeChartsWrapper);
