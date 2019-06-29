import React, { Component } from "react";
import { connect } from "react-redux";
import CalendarView from "../CalendarView/calendarview";
import CreateTaskForm from "../CreateTaskForm/createtaskform";
import { MATERIAL_COLORS } from "../../constants/commonConsts";
import { Select, Modal } from "antd";
import { getFilteredTasks } from "../../services/methods/taskMethods";
import {
  getTrackIndexForDate,
  getTrackDateFromIndex,
  getWeekStartAndEndDate
} from "../../services/methods/habitMethods";
import { updateTask } from "../../actions/taskActions";
import "./habitcalendar.css";
const Option = Select.Option;
class HabitCalendar extends Component {
  state = {
    tasksStatus: "all",
    tasksGoal: "all",
    selectedTaskId: "",
    taskDialogInDom: false,
    taskDialogVisible: false
  };
  calendarEventClick = ({ event }) => {
    this.setState({
      selectedTaskId: event.id,
      taskDialogInDom: true,
      taskDialogVisible: true
    });
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
          start: new Date(task.startDate),
          end: new Date(task.dueDate),
          backgroundColor: MATERIAL_COLORS[index % 16],
          color: MATERIAL_COLORS[index % 16],
          id: task.id
        };
        return event;
      });
  }

  render() {
    this.genereteHabitEvents(this.props.habits);
    const { goals } = this.props;
    const { taskDialogInDom, taskDialogVisible, selectedTaskId } = this.state;
    const selectedTask = this.props.tasks.find(t => t.id == selectedTaskId);
    return (
      <div id="habitCalendarView">
        <div
          className="row"
          id="habitCalendarFilterDiv"
          style={{ marginBottom: "22px" }}
        >
          <div className="col-md-4">
            <span className="habitCalendarFilterLabel">Goal: </span>
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
            <span className="habitCalendarFilterLabel">Status: </span>
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
        <div id="mainHabitsCalendarDiv">
          <CalendarView
            calendarEvents={this.genereteHabitEvents(
              this.props.habits,
              "Daily"
            )}
            calendarEventClick={this.calendarEventClick}
          />
        </div>
        {taskDialogInDom && (
          <Modal
            visible={taskDialogVisible}
            width="53%"
            title={selectedTask.name}
            centered
            bodyStyle={{ overflowY: "auto" }}
            style={{ top: "10px" }}
            onCancel={() => {
              this.closeTaskDialog();
            }}
            footer=""
          >
            <CreateTaskForm
              mode="view"
              taskOptions={selectedTask}
              closeAndUpdate={this.updateLocalTask}
              close={this.closeTaskDialog}
            />
          </Modal>
        )}
      </div>
    );
  }

  genereteHabitEvents(habits, period) {
    let allHabitEvents = [];
    habits.forEach(h => {
      if (h.period == period) {
        let initialTrackIndex = getTrackIndexForDate(h.period, h.startDateTime);
        if (h.tracking.length > 0) {
          for (
            let i = initialTrackIndex;
            i <= h.tracking[h.tracking.length - 1].Index;
            i++
          ) {
            let event = {
              title: h.name,
              id: h.id
            };
            let currTrackIndex = h.tracking.findIndex(t => t.Index == i);
            if (period == "Daily")
              event.start = event.end = getTrackDateFromIndex(h.period, i);
            else if (period == "Weekly") {
                console.log(getTrackDateFromIndex(h.period, i))
              let weekStartEnd = getWeekStartAndEndDate(
                getTrackDateFromIndex(h.period, i)
              );
              event.start = weekStartEnd.start;
              event.end = weekStartEnd.end;
            }
            if (currTrackIndex > -1) {
              if (h.tracking[currTrackIndex].Count == 0) {
                event.color = "red";
              } else if (
                h.tracking[currTrackIndex].Count <
                h.tracking[currTrackIndex].Frequency
              ) {
                event.color = "yellow";
              } else {
                event.color = "green";
              }
            } else event.color = "red";
            allHabitEvents.push(event);
          }
        }
      }
      console.log(
        "Initial Track Index for ",
        h.name,
        ": ",
        getTrackIndexForDate(h.period, h.startDateTime)
      );
    });
    return allHabitEvents;
  }

  closeTaskDialog = () => {
    this.setState({ taskDialogVisible: false });
    setTimeout(() => {
      this.setState({ taskDialogInDom: false });
    }, 250);
  };

  updateLocalTask = task => {
    this.props.updateTask(task);
    this.closeTaskDialog();
  };
}

/**
 * state to props mapping
 */
const mapStateToProps = state => {
  return {
    tasks: state.taskReducer.Tasks,
    goals: state.goalReducer.Goals,
    habits: state.habitReducer.Habits
  };
};

/**
 * dispatch to props mapping form updating user
 */
const mapDispatchToProps = dispatch => {
  return {
    updateTask: taskPayload => {
      dispatch(updateTask(taskPayload));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HabitCalendar);
