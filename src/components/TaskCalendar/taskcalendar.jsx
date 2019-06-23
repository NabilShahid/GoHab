import React, { Component } from "react";
import { connect } from "react-redux";
import CalendarView from "../CalendarView/calendarview";
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
      .filter(task => task.dueDate)
      .map(task => {
        let event = {
          title: task.name,
          start: task.startDate.split("T")[0],
          end: task.dueDate.split("T")[0]
        };
        return event;
      });
  }
  render() {
    return (
      <div>
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
