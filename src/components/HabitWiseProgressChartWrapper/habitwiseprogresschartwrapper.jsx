import React, { Component } from "react";
import { InputNumber, Select } from "antd";
import HabitWiseProgressLineChart from "../../charts/habitWiseProgressLineChart";
import { connect } from "react-redux";
import { getHabitWiseProgressDataForLineChart } from "../../services/chartService.js";
const { Option } = Select;
class HabitWiseProgressChartWrapper extends Component {
  state = {
    habitPeriod: "Daily",
    habitGoal: "all",
    selectedHabit: "",
    showLastCount: 10
  };
  setSelectedHabit(selectedHabit) {
    debugger;
    this.setState({ selectedHabit });
  }

  componentDidMount() {}
  render() {
    const { habitPeriod, habitGoal, showLastCount } = this.state;
    let { selectedHabit } = this.state;
    const { goals, habits } = this.props;
    const goalPeriodHabits = habits
      .filter(h => h.period == habitPeriod)
      .filter(h => habitGoal == "all" || h.parentGoal == habitGoal);

    if (!selectedHabit)
      selectedHabit = goalPeriodHabits[0] && goalPeriodHabits[0].id;
    else selectedHabit = "";
    let currentHabitTracking = habits.find(h => h.id == selectedHabit);
    currentHabitTracking = currentHabitTracking
      ? currentHabitTracking.tracking
      : [];

    return (
      <div
        className="row"
        id="habitWiseProgressLineChartFilterDiv"
        style={{ marginBottom: "22px" }}
      >
        <div className="col-md-3">
          <span className="habitWiseProgressLineChartFilterLabel">Goal: </span>
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
          <span className="habitWiseProgressLineChartFilterLabel">
            Period:{" "}
          </span>
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
        <div className="col-md-3">
          <span className="habitWiseProgressLineChartFilterLabel">Habit: </span>
          <Select
            style={{ width: "70%" }}
            size="small"
            placeholder="Select habit"
            onChange={selectedHabit => this.setSelectedHabit(selectedHabit)}
            value={selectedHabit}
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
        <div className="col-md-3">
          <span className="habitWiseProgressLineChartFilterLabel">
            Show Last:{" "}
          </span>
          <InputNumber
            size="small"
            name="periodNumber"
            value={showLastCount}
            min={1}
            max={50}
             onChange={showLastCount => this.setState({ showLastCount })}
          />
        </div>
        <HabitWiseProgressLineChart
          data={getHabitWiseProgressDataForLineChart(
            currentHabitTracking,
            habitPeriod,
            showLastCount
          )}
        />
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
)(HabitWiseProgressChartWrapper);
