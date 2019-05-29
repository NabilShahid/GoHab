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
    const { habitsToTrack } = this.props;
    return (
      <div id="habitTrackingDiv">
        {habitsToTrack.map((h,i)=> (
          <div className="hTrackingCardContainer" key={h.id}>
            <HabitTrackCard
              habit={h}
              currentCount={this.getCurrentTrackCount(h.tracking, h.period)}
              trackHabit={this.trackHabit}
            />
          </div>
        ))}
      </div>
    );
  }

  getCurrentTrackCount(tracking, period) {
    if (tracking.length > 0) {
      if (checkIfPendingTracking(tracking[tracking.length - 1].Index, period)) {
        return tracking[tracking.length - 1].Count;
      }
    } else return 0;
  }

  trackHabit = (habit, newCount) => {
    const { tracking } = habit;
    let trackObj = {};

    if (
      tracking.length == 0 ||
      !checkIfPendingTracking(tracking[tracking.length - 1])
    ) {
      trackObj.Frequency = habit.frequency;
      trackObj.Index = getCurrentTrackIndex(habit.period);
      trackObj.Count = newCount;
      habit.tracking.push(trackObj);
    } else {
      trackObj = { ...tracking[tracking.length - 1] };
      trackObj.Count += newCount;
      habit.tracking[tracking.length - 1]=trackObj;
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
    // goals: state.goalReducer.FilteredGoals,
    // habitsToTrack: state.habitReducer.Habits.filter(
    //   h => state.habitReducer.HabitIdsToTrack.indexOf(h.id) > -1
    // )
    habitsToTrack: Object.assign([],state.habitReducer.Habits) 
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
