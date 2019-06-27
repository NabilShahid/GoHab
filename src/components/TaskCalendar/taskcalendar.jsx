import React, { Component } from "react";
import { connect } from "react-redux";
import CalendarView from "../CalendarView/calendarview";
import {MATERIAL_COLORS} from "../../constants/commonConsts";
import { Select } from "antd";
import { getFilteredTasks } from "../../services/methods/taskMethods";
import "./taskcalendar.css";
const Option = Select.Option;
class TaskCalendar extends Component {
  state = {
    tasksStatus:"all",
    tasksGoal:"all"
  };
  handleClick = info => {
    alert("Event: " + info.event.title);
    alert("Coordinates: " + info.jsEvent.pageX + "," + info.jsEvent.pageY);
    alert("View: " + info.view.type);

    // change the border color just for fun
    info.el.style.borderColor = "red";
  };
  getTaskAsEvents() {
    const {tasksStatus,tasksGoal}=this.state;    
    return getFilteredTasks(this.props.tasks,"",tasksStatus)
      .filter(task => typeof task.dueDate == "string")
      .map((task,index) => {
        let event = {
          title: task.name,
          start: task.startDate.split("T")[0],
          end: task.dueDate.split("T")[0],
          backgroundColor:  MATERIAL_COLORS[index%16],
          color:MATERIAL_COLORS[index%16]
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
              onChange={e => this.changeTasksStatus(e)}
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
              onChange={tasksStatus => this.setState({tasksStatus})}
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
    tasks: state.taskReducer.Tasks
  };
};

export default connect(
  mapStateToProps,
  null
)(TaskCalendar);
