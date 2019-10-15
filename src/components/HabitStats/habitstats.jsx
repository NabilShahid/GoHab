import React, { Component } from "react";
import { InputNumber, Select, Popover } from "antd";
import HabitWiseProgressLineChart from "../../charts/habitWiseProgressLineChart";
import HabitWiseHitMissBarChart from "../../charts/habitWiseHitMissBarChart";
import { connect } from "react-redux";
import {
  getHabitWiseProgressDataForLineChart,
  getHabitHitMissDataForSingleHabit
} from "../../services/chartService.js";
import "./habitstats.css";
const { Option } = Select;
class HabitStats extends Component {
  state = {
    habitPeriod: "Daily",
    habitGoal: "all",
    selectedHabitId: "",
    showLastCountProgressLineChart: 10
  };
  setSelectedHabit(selectedHabitId) {
    this.setState({ selectedHabitId });
  }
  render() {
    const {
      habitPeriod,
      habitGoal,
      showLastCountProgressLineChart
    } = this.state;
    let { selectedHabitId } = this.state;
    const { goals, habits } = this.props;
    const goalPeriodHabits = habits
      .filter(h => h.period == habitPeriod)
      .filter(h => habitGoal == "all" || h.parentGoal == habitGoal);
    const selectedHabitObj = goalPeriodHabits[0] ? goalPeriodHabits[0] : {};
    if (Object.keys(selectedHabitObj).length > 0)
      selectedHabitId = selectedHabitObj.id;
    else selectedHabitId = "";
    let currentHabitTracking = habits.find(h => h.id == selectedHabitId);
    currentHabitTracking = currentHabitTracking
      ? currentHabitTracking.tracking
      : [];

    return (
      <div
        className="fullHeight"
        style={{ overflowY: "auto", overflowX: "hidden" }}
      >
        Select a Habit{" "}
        <div
          className="row"
          id="habitStatsFilterDiv"
          style={{ marginBottom: "22px" }}
        >
          <div className="col-md-4">
            <span className="habitStatsFilterLabel">Goal: </span>
            <Select
              showSearch
              defaultValue={"all"}
              style={{ width: "70%" }}
              size="small"
              onChange={habitGoal => this.setState({ habitGoal })}
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="all">All</Option>
              {goals.map(g => {
                return <Option value={g.id}>{g.name}</Option>;
              })}
            </Select>
          </div>
          <div className="col-md-3">
            <span className="habitStatsFilterLabel">Period: </span>
            <Select
              onChange={habitPeriod => {
                this.setState({ habitPeriod });
              }}
              style={{ width: "70%" }}
              size="small"
              value={habitPeriod}
            >
              <Option value="Daily">Daily</Option>
              <Option value="Weekly">Weekly</Option>
              <Option value="Monthly">Monthly</Option>
            </Select>
          </div>
          <div className="col-md-4">
            <span className="habitStatsFilterLabel">Habit: </span>
            <Select
              style={{ width: "70%" }}
              size="small"
              placeholder="Select habit"
              onChange={selectedHabitId =>
                this.setSelectedHabit(selectedHabitId)
              }
              value={selectedHabitId}
            >
              {goalPeriodHabits.map(h => {
                return (
                  <Option value={h.id} key={h.id}>
                    {h.name}
                  </Option>
                );
              })}
            </Select>
          </div>
        </div>
        <div id="habitWiseProgressLineChartDiv">
          <div className="fullWidthLineChartLabel">
            Task Progress Line Chart{" "}
            <Popover
              placement="bottomLeft"
              // title="Change View"
              content={
                <div>
                  Chart showing how early or late task was completed in days.
                  <ul>
                    <li>
                      Vertical axis shows number of days. Positive for days
                      before due date, and negative for days after due date
                    </li>
                    <li>Horizontal axis shows tasks</li>
                  </ul>{" "}
                </div>
              }
              trigger="hover"
            >
              <i className="fa fa-info-circle graphInfoIcon"></i>
            </Popover>
            <div>
              <span className="habitWiseProgressLineChartFilterLabel">
                Show Last:{" "}
              </span>
              <InputNumber
                size="small"
                name="periodNumber"
                value={showLastCountProgressLineChart}
                min={1}
                max={50}
                onChange={showLastCountProgressLineChart =>
                  this.setState({ showLastCountProgressLineChart })
                }
              />
            </div>
          </div>
          <HabitWiseProgressLineChart
            data={getHabitWiseProgressDataForLineChart(
              currentHabitTracking,
              habitPeriod,
              showLastCountProgressLineChart
            )}
          />
        </div>
        <div className="chartsHorizontalSeperator"></div>
        <div className="row">
          <div className="col-md-6">
            <div className="halfPageChartLabel">Habit Wise Hit/Miss Counts</div>
            <HabitWiseHitMissBarChart
              data={getHabitHitMissDataForSingleHabit(selectedHabitObj)}
            />
          </div>
          <div className="col-md-6">
            {" "}
            <div className="halfPageChartLabel">Overdue Pending Chart</div>
            {/* <GoalTaskDueDateBarChart data={goalsDueDateData} /> */}
            <div id="overallHabitFollowingPercentageWrapper">
              <div id="overallHabitFollowingPercentage">78<span style={{fontSize:"20px"}}>%</span></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    goals: state.goalReducer.Goals,
    habits: state.habitReducer.Habits
  };
};

export default connect(
  mapStateToProps,
  null
)(HabitStats);
