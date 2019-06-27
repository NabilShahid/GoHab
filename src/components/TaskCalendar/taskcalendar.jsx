import React, { Component } from "react";
import { connect } from "react-redux";
import CalendarView from "../CalendarView/calendarview";
import { MATERIAL_COLORS } from "../../constants/commonConsts";
import { Select } from "antd";
import { getFilteredTasks } from "../../services/methods/taskMethods";
import "./taskcalendar.css";
const Option = Select.Option;
class TaskCalendar extends Component {
  state = {
    tasksStatus: "all",
    tasksGoal: "all"
  };
  handleClick = info => {
    alert("Event: " + info.event.title);
    alert("Coordinates: " + info.jsEvent.pageX + "," + info.jsEvent.pageY);
    alert("View: " + info.view.type);

    // change the border color just for fun
    info.el.style.borderColor = "red";
  };
  getTaskAsEvents() {
    const { tasksStatus, tasksGoal } = this.state;
    return getFilteredTasks(this.props.tasks, "", tasksStatus)
      .filter(
        task =>
          typeof task.dueDate == "string" &&
          (tasksGoal == "all" || tasksGoal == task.parentGoal)
      )
      .map((task, index) => {
        let event = {
          title: task.name,
          start: task.startDate.split("T")[0],
          end: task.dueDate.split("T")[0],
          backgroundColor: MATERIAL_COLORS[index % 16],
          color: MATERIAL_COLORS[index % 16]
        };
        return event;
      });
  }

  render() {
    const { goals } = this.props;
    return (
      <div id="taskCalendarView">
        <div
          className="row"
          id="taskCalendarFilterDiv"
          style={{ marginBottom: "22px" }}
        >
          <div className="col-md-4">
            <span className="taskCalendarFilterLabel">Goal: </span>
            <Select
              showSearch
              defaultValue={"all"}
              style={{ width: "70%" }}
              size="small"
              onChange={tasksGoal => this.setState({ tasksGoal })}
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
            <span className="taskCalendarFilterLabel">Status: </span>
            <Select
              onChange={tasksStatus => this.setState({ tasksStatus })}
              style={{ width: "70%" }}
              size="small"
              defaultValue={"all"}
            >
              <Option value="all">All</Option>
              <Option value="pending">Pending</Option>
              <Option value="completed">Completed</Option>
            </Select>
          </div>
        </div>
        <div id="mainTasksCalendarDiv">
          <CalendarView
            calendarEvents={this.getTaskAsEvents()}
            calendarEventClick={this.handleClick}
          />
        </div>
      </div>
    );
  }
}

/**
 * state to props mapping
 */
const mapStateToProps = state => {
  return {
    tasks: state.taskReducer.Tasks,
    goals: state.goalReducer.Goals
  };
};

export default connect(
  mapStateToProps,
  null
)(TaskCalendar);
