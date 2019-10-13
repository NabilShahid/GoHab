import React, { Component } from "react";
import { Popover, Select } from "antd";
import { connect } from "react-redux";
const { Option } = Select;
class HabitWiseProgressChartWrapper extends Component {
  state = {
    habitPeriod: "Daily",
    habitGoal: "all",
    selectedHabit: ""
  };
  componentDidMount() {}
  render() {
    const { habitPeriod, habitGoal, selectedHabit } = this.state;
    const { goals, habits } = this.props;
    const goalPeriodHabits = habits
      .filter(h => h.period == habitPeriod)
      .filter(h => habitGoal == "all" || h.parentGoal == habitGoal);
    const firtHabitOfCurrentFilter =
      goalPeriodHabits[0] && goalPeriodHabits[0].id;
    return (
      <div
        className="row"
        id="habitWiseProgressLineChartFilterDiv"
        style={{ marginBottom: "22px" }}
      >
        <div className="col-md-4">
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
        <div className="col-md-5">
          <span className="habitWiseProgressLineChartFilterLabel">Habit: </span>
          <Select
            style={{ width: "70%" }}
            size="small"
            defaultValue={firtHabitOfCurrentFilter}
            placeholder="Select habit"
            onChange={selectedHabit => this.setState({ selectedHabit })}
            value={selectedHabit || firtHabitOfCurrentFilter}
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
