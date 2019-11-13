import React, { Component } from "react";
import { connect } from "react-redux";
import CalendarView from "../CalendarView/calendarview";
import CreateHabitForm from "../CreateHabitForm/createhabitform";
import { Select, Modal } from "antd";
import { getCurrentTrackIndex } from "../../services/methods/habitMethods";
import { HABIT_EVENT_COLORS } from "../../constants/commonConsts";

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
    habitsPeriod: "Daily",
    habitsGoal: "all",
    habitsToFilter: [],
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
    const { goals, habits } = this.props;
    const {
      habitDialogInDom,
      habitDialogVisible,
      selectedHabitId,
      habitsPeriod,
      habitsGoal,
      habitsToFilter
    } = this.state;
    const selectedHabit = this.props.habits.find(t => t.id == selectedHabitId);
    const goalPeriodHabits = habits
      .filter(h => h.period == habitsPeriod)
      .filter(h => habitsGoal == "all" || h.parentGoal == habitsGoal);
      
    const habitCalendarEvents = this.generateHabitCalendarEvents(
      goalPeriodHabits.filter(
        h => habitsToFilter.length == 0 || habitsToFilter.includes(h.id)
      ),
      habitsPeriod
    );
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
            <span className="habitCalendarFilterLabel">Period: </span>
            <Select
              onChange={habitsPeriod => this.setState({ habitsPeriod })}
              style={{ width: "70%" }}
              size="small"
              value={habitsPeriod}
            >
              <Option value="Daily">Daily</Option>
              <Option value="Weekly">Weekly</Option>
              <Option value="Monthly">Monthly</Option>
            </Select>
          </div>
          <div className="col-md-5">
            <span className="habitCalendarFilterLabel">Habits: </span>
            <Select
              mode="multiple"
              style={{ width: "70%" }}
              size="small"
              placeholder="Filter habits"
              //   defaultValue={["a10", "c12"]}
              onChange={e => this.setState({ habitsToFilter: e })}
            >
              {goalPeriodHabits               
                .map(h => {
                  return <Option key={h.id}>{h.name}</Option>;
                })}
            </Select>
          </div>
        </div>
        <div id="mainHabitsCalendarDiv">
          {this.getCalendarRows(
            Object.keys(habitCalendarEvents),
            habitCalendarEvents,
            2
          )}
        </div>
        {habitDialogInDom && (
          <Modal
            visible={habitDialogVisible}
             title=""
            centered
            bodyStyle={{ overflowY: "auto" }}
            style={{ top: "10px",minWidth:"53vw" }}
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

  generateHabitCalendarEvents(habits, period) {
    let allHabitEvents = {};
    habits.forEach(h => {
      if (h.period == period) {
        if (Object.keys(allHabitEvents).indexOf(h.name) == -1) {
          allHabitEvents[h.name] = {};
          allHabitEvents[h.name].events = [];
          allHabitEvents[h.name].hits = 0;
          allHabitEvents[h.name].misses = 0;
        }
        let initialTrackIndex = getTrackIndexForDate(h.period, h.startDateTime);
        for (
          let i = initialTrackIndex;
          i <= getCurrentTrackIndex(h.period);
          i++
        ) {
          let event = {
            title:"",
            id: h.id
          };
          let currTrackIndex = h.tracking.findIndex(t => t.Index == i);
          if (period == "Daily")
            event.start = event.end = getTrackDateFromIndex(h.period, i);
          else if (period == "Weekly") {
            let weekStartEnd = getWeekStartAndEndDate(
              getTrackDateFromIndex(h.period, i)
            );
            event.start = weekStartEnd.start;
            event.end = weekStartEnd.end;
          } else if (period == "Monthly") {
            event.start = moment(getTrackDateFromIndex(h.period, i))
              .startOf("month")
              .toDate();
            event.end = moment(getTrackDateFromIndex(h.period, i))
              .endOf("month")
              .toDate();
          }
          if (currTrackIndex > -1) {
            if (h.tracking[currTrackIndex].Count == 0) {
              event.color = HABIT_EVENT_COLORS.MISS;
            } else if (
              h.tracking[currTrackIndex].Count <
              h.tracking[currTrackIndex].Frequency
            ) {
              event.color = HABIT_EVENT_COLORS.PARTIAL;
              allHabitEvents[h.name].misses++;
            } else {
              event.color = HABIT_EVENT_COLORS.HIT;
              allHabitEvents[h.name].hits++;
            }
          } else {
            event.color = HABIT_EVENT_COLORS.MISS;
            allHabitEvents[h.name].misses++;
          }
          allHabitEvents[h.name].events.push(event);
        }
      }
    });
    console.log("AHE: ", allHabitEvents);
    return allHabitEvents;
  }

  getCalendarRows(habitsEventNames, habitEvents, colSize) {
    let calendarRows = [];
    for (let i = 0; i < habitsEventNames.length; i += colSize) {
      if (habitsEventNames[i]) {
        const calendarRowArray = [];
        for (let j = 0; j < colSize; j++) {
          if (habitsEventNames[i + j])
            calendarRowArray.push(habitsEventNames[i + j]);
        }

        calendarRows.push(
          <div className="row" style={{ marginTop: "15px" }} key={i}>
            {this.getCalendarCols(calendarRowArray, habitEvents, i, colSize)}
          </div>
        );
      }
    }
    return calendarRows;
  }

  getCalendarCols(rowArrayNames, rowArray, rowindex, colSize) {
    let cellClass = `col-md-${Math.floor(12 / colSize)}`;
    // if (rowindex > 0) cellClass += " tasksRow";
    return rowArrayNames.map((r, i) => {
      return (
        <div key={i} className={cellClass}>
          <div className="habitCalendar">
            <div className="habitCelendarInfo">
              <div className="habitCelendarName">{r}</div>
              <div className="habitCalendarCounts">
                <div style={{color:"rgb(96, 214, 96)"}}>
                  <i className="fa fa-check" style={{ marginRight: "9px" }} />
                  {rowArray[r].hits} <span style={{fontSize:"12px",fontWeight:"normal"}}>followed</span>
                </div>
                <div style={{color:"rgb(255, 100, 100)"}}>
                  <i className="fa fa-times" style={{ marginRight: "9px" }} />
                  {rowArray[r].misses} <span style={{fontSize:"12px",fontWeight:"normal"}}>missed</span>
                </div>
              </div>
            </div>
            <CalendarView
              calendarEvents={rowArray[r].events}
              calendarEventClick={this.calendarEventClick}
              calendarHeight={350}
              contentHeight={410}
            />
          </div>
        </div>
      );
    });
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
