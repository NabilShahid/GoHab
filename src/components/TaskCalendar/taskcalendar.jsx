import React, { Component } from "react";
import { connect } from "react-redux";
import CalendarView from "../CalendarView/calendarview";
import { Select } from "antd";
import "./taskcalendar.css";
const Option = Select.Option;
class TaskCalendar extends Component {
  state = {};
  handleClick = info => {
    alert("Event: " + info.event.title);
    alert("Coordinates: " + info.jsEvent.pageX + "," + info.jsEvent.pageY);
    alert("View: " + info.view.type);

    // change the border color just for fun
    info.el.style.borderColor = "red";
  };
  getTaskAsEvents() {
    return this.props.tasks
      .filter(task => typeof task.dueDate == "string")
      .map(task => {
        let event = {
          title: task.name,
          start: task.startDate.split("T")[0],
          end: task.dueDate.split("T")[0],
          backgroundColor: "#66bb6a",
          color: "white"
        };
        return event;
      });
  }
  render() {
    return (
      <div id="taskCalendarView">
        <div className="row" id="taskCalendarFilterDiv" style={{ marginBottom: "22px" }}>
          <div className="col-md-4">
            <span className="taskCalendarFilterLabel">Goal: </span>
            <Select
              onChange={e => this.changeOrderBy(e)}
              style={{ width: "80%" }}
              size="small"
              value={"dueDate"}
            >
              <Option value="dueDate">Due Date</Option>
              <Option value="importance">Importance</Option>
              <Option value="alphabetical">Alphabetical</Option>
            </Select>
          </div>
          <div className="col-md-3">
            <span className="taskCalendarFilterLabel">Status: </span>
            <Select
              onChange={e => this.changeOrderBy(e)}
              style={{ width: "70%" }}
              size="small"
              value={"dueDate"}
            >
              <Option value="dueDate">Due Date</Option>
              <Option value="importance">Importance</Option>
              <Option value="alphabetical">Alphabetical</Option>
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
    tasks: state.taskReducer.Tasks
  };
};

export default connect(
  mapStateToProps,
  null
)(TaskCalendar);
