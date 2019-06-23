import React, { Component } from "react";
import { connect } from "react-redux";
import CalendarView from "../CalendarView/calendarview";
import "./taskcalendar.css";
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
      .filter(task => typeof task.dueDate=="string")
      .map(task => {
        let event = {
          title: task.name,
          start: task.startDate.split("T")[0],
          end: task.dueDate.split("T")[0],
          backgroundColor:"#66bb6a",
          color:"white"
        };
        return event;
      });
  }
  render() {
    return (
      <div id="taskCalendarView">
        <CalendarView
          calendarEvents={this.getTaskAsEvents()}
          calendarEventClick={this.handleClick}
        />
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

export default connect(mapStateToProps,null)(TaskCalendar);
