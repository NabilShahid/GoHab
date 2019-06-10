import React, { Component } from "react";
import HabitTrackCard from "../HabitTrackCard/habittrackcard";
import { withFirebase } from "../../services/firebase/context";
import {
  checkIfPendingTracking,
  getCurrentTrackIndex
} from "../../services/methods/habitMethods";
import { updateHabit } from "../../actions/habitActions";
import { connect } from "react-redux";
import "./habittracking.css";
class HabitTracking extends Component {
  state = {};

  render() {
    const { habitsToTrack, goals } = this.props;
    return (
      <div id="habitTrackingDiv">
        {habitsToTrack.map((h, i) => {
          const parentGoalIndex=goals.findIndex(g => g.id == h.parentGoal);
          let parentGoal="";
          if(parentGoalIndex!=-1){
            parentGoal=goals[parentGoalIndex].name;
          }        
          return (
            <div className="hTrackingCardContainer" key={h.id}>
              <HabitTrackCard
                habit={h}
                currentTrack={this.getCurrentTrackCount(
                  h.tracking,
                  h.period,
                  h.frequency
                )}
                trackHabit={this.trackHabit}
                parentGoal={parentGoal}
              />
            </div>
          );
        })}
      </div>
    );
  }

  getCurrentTrackCount(tracking, period, frequency) {
    if (tracking.length > 0) {
      if (checkIfPendingTracking(tracking[tracking.length - 1].Index, period)) {
        return tracking[tracking.length - 1];
      }
    } else
      return {
        Count: 0,
        Frequency: frequency
      };
  }

  trackHabit = (habit, newCount) => {
    if (newCount < 0) return;
    const { tracking } = habit;
    let trackObj = {};
    if (
      tracking.length == 0 ||
      !checkIfPendingTracking(tracking[tracking.length - 1].Index, habit.period)
    ) {
      if (newCount > habit.frequency) return;
      trackObj.Frequency = habit.frequency;
      trackObj.Index = getCurrentTrackIndex(habit.period);
      trackObj.Count = newCount;
      habit.tracking.push(trackObj);
    } else {
      if (newCount > tracking[tracking.length - 1].Frequency) return;
      trackObj = { ...tracking[tracking.length - 1] };
      trackObj.Count = newCount;
      habit.tracking[tracking.length - 1] = trackObj;
    }
    this.props.updateHabit(habit);
    this.props.firebase.habitOps
      .updateHabit("nabil110176@gmail.com", habit, habit.id)
      .then(() => {})
      .catch(error => {
        console.error("Error writing document: ", error);
      });
  };
}

const mapStateToProps = state => {
  return {
    goals: state.goalReducer.Goals,
    // habitsToTrack: state.habitReducer.Habits.filter(
    //   h => state.habitReducer.HabitIdsToTrack.indexOf(h.id) > -1
    // )
    habitsToTrack: Object.assign([], state.habitReducer.Habits)
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
)(withFirebase(HabitTracking));
