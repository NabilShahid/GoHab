import React, { Component } from "react";
import { connect } from "react-redux";
import CalendarView from "../CalendarView/calendarview";
import CreateHabitForm from "../CreateHabitForm/createhabitform";
import { Select, Modal } from "antd";
import { getFilteredHabits } from "../../services/methods/habitMethods";
import {
  getTrackIndexForDate,
  getTrackDateFromIndex,
  getWeekStartAndEndDate
} from "../../services/methods/habitMethods";
import { updateHabit } from "../../actions/habitActions";
import moment from "moment";
import "./habitcalendar.css";
const Option = Select.Option;
class HabitCalendar extends Component {
  state = {
    habitsStatus: "all",
    habitsGoal: "all",
    selectedHabitId: "",
    habitDialogInDom: false,
    habitDialogVisible: false
  };
  calendarEventClick = ({ event }) => {
    this.setState({
      selectedHabitId: event.id,
      habitDialogInDom: true,
      habitDialogVisible: true
    });
  };

  render() {
    const { goals } = this.props;
    const { habitDialogInDom, habitDialogVisible, selectedHabitId } = this.state;
    const selectedHabit = this.props.habits.find(t => t.id == selectedHabitId);
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
              onChange={habitsGoal => this.setState({ habitsGoal })}
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
              onChange={habitsStatus => this.setState({ habitsStatus })}
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
              "Monthly"
            )}
            calendarEventClick={this.calendarEventClick}
          />
        </div>
        {habitDialogInDom && (
          <Modal
            visible={habitDialogVisible}
            width="53%"
            title={selectedHabit.name}
            centered
            bodyStyle={{ overflowY: "auto" }}
            style={{ top: "10px" }}
            onCancel={() => {
              this.closeHabitDialog();
            }}
            footer=""
          >
            <CreateHabitForm
              mode="view"
              habitOptions={selectedHabit}
              closeAndUpdate={this.updateLocalHabit}
              close={this.closeHabitDialog}
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
            else if(period=="Monthly"){
                event.start=moment(getTrackDateFromIndex(h.period, i)).startOf("month").toDate();
                event.end=moment(getTrackDateFromIndex(h.period, i)).endOf("month").toDate();

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
     
    });
    return allHabitEvents;
  }

  closeHabitDialog = () => {
    this.setState({ habitDialogVisible: false });
    setTimeout(() => {
      this.setState({ habitDialogInDom: false });
    }, 250);
  };

  updateLocalHabit = habit => {
    this.props.updateHabit(habit);
    this.closeHabitDialog();
  };
}

/**
 * state to props mapping
 */
const mapStateToProps = state => {
  return {
    goals: state.goalReducer.Goals,
    habits: state.habitReducer.Habits
  };
};

/**
 * dispatch to props mapping form updating user
 */
const mapDispatchToProps = dispatch => {
  return {
    updateHabit: habitPayload => {
      dispatch(updateHabit(habitPayload));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HabitCalendar);
