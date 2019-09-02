import React, { Component } from "react";
import CreateCard from "../CreateCard/createcard";
import CreateGoalForm from "../CreateGoalForm/creategoalform";
import CreateHabitForm from "../CreateHabitForm/createhabitform";
import CreateTaskForm from "../CreateTaskForm/createtaskform";
import CountCard from "../CountCard/countcard";
import { connect } from "react-redux";
import { Modal } from "antd";
import HabitHitMissChart from "../../charts/habitHitMissChart";
import { getFilteredGoals } from "../../services/methods/goalMethods";
import { getFilteredHabits } from "../../services/methods/habitMethods";
import { getFilteredTasks } from "../../services/methods/taskMethods";
import { alphaSort } from "../../services/methods/ghtCommonMethods";
import Tasks from "../Tasks/tasks";
import Habits from "../Habits/habits";
import Goals from "../Goals/goals";
import HomeChartsWrapper from "../HomeChartsWrapper/homechartswrapper";
import "./home.css";
class Home extends Component {
  state = {
    anyPopupOpen: false,
    popups: {
      Goal: {
        Title: "Create Goal",
        InDom: false
      },
      Habit: {
        Title: "Create Habit",
        InDom: false
      },
      Task: {
        Title: "Create Task",
        InDom: false
      },
      PendingGoals: {
        Title: "Pending Goals",
        InDom: false
      },
      PendingTasks: {
        Title: "Pending Tasks",
        InDom: false
      },
      ActiveHabits: {
        Title: "Active Habits",
        InDom: false
      }
    },
    selectedPopup: "Goal"
  };

  /**
   * show or hide a form
   */
  setPopupVisibility = (popup, visibility) => {
    const popups = JSON.parse(JSON.stringify(this.state.popups));
    const anyPopupOpen = (popups[popup].InDom = visibility);
    const selectedPopup = popup;
    if (anyPopupOpen) {
      this.setState({ anyPopupOpen, popups, selectedPopup });
      console.log("DFS");
    } else {
      //remove form from dom when not needed timeout to show animation correctly
      this.setState({ anyPopupOpen });
      setTimeout(() => {
        this.setState({ popups });
      }, 250);
    }
  };

  render() {
    const { anyPopupOpen, popups, selectedPopup } = this.state;
    const {
      goalsCount,
      tasksCount,
      habitsCount,
      goals,
      tasks,
      habits
    } = this.props;
    return (
      <div id="homeContent" className="fullHeightScroll">
        <div className="row">
          <div
            className="col-md-4"
            onClick={() => {
              this.setPopupVisibility("Goal", true);
            }}
          >
            <CreateCard
              ccTitle="Create Goal"
              ccSubTitle="Create a new goal and assing value to it"
              background="var(--goal-color)"
              icon="fa fa-check"
            />
          </div>
          <div
            className="col-md-4"
            onClick={() => {
              this.setPopupVisibility("Habit", true);
            }}
          >
            <CreateCard
              ccTitle="Create Habit"
              ccSubTitle="Create a new habit and assing value to it"
              background="var(--habit-color)"
              icon="fa fa-check"
            />
          </div>
          <div
            className="col-md-4"
            onClick={() => {
              this.setPopupVisibility("Task", true);
            }}
          >
            <CreateCard
              ccTitle="Create Task"
              ccSubTitle="Create a new task and assing value to it"
              background="var(--task-color)"             
              icon="fa fa-check"
            />
          </div>
        </div>
        <div className="row" style={{ marginTop: "30px" }}>
          <div
            className="col-md-4"
            onClick={() =>
              goalsCount && this.setPopupVisibility("PendingGoals", true)
            }
          >
            <CountCard
              background="linear-gradient(160deg, rgb(249, 248, 248) 80%, rgb(249, 219, 156))"
              color="var(--goal-color)"
              subtitle={"Pending Goal" + (goalsCount > 1 ? "s" : "")}
              count={goalsCount}
            />
          </div>
          <div
            className="col-md-4"
            onClick={() =>
              habitsCount && this.setPopupVisibility("ActiveHabits", true)
            }
          >
            <CountCard
              background="linear-gradient(160deg, rgb(249, 248, 248) 80%, rgb(170, 216, 255))"
              color="var(--habit-color)"
              subtitle={"Pending Habit" + (habitsCount > 1 ? "s" : "")}
              count={habitsCount}
            />
          </div>
          <div
            className="col-md-4"
            onClick={() =>
              tasksCount && this.setPopupVisibility("PendingTasks", true)
            }
          >
            <CountCard
              background="linear-gradient(160deg, rgb(249, 248, 248) 80%, rgb(173, 234, 223))"
              color="var(--task-color)"
              subtitle={"Pending Task" + (tasksCount > 1 ? "s" : "")}
              count={tasksCount}
            />
          </div>
        </div>
        <HomeChartsWrapper />

        <Modal
          visible={anyPopupOpen}
          width="53%"
          title={popups[selectedPopup].Title}
          centered
          bodyStyle={{ overflowY: "auto" }}
          style={{ top: "10px" }}
          onCancel={() => {
            this.setPopupVisibility(selectedPopup, false);
          }}
          footer=""
        >
          {popups.Goal.InDom && (
            <CreateGoalForm
              mode="add"
              setPopupVisibility={this.setPopupVisibility}
            />
          )}
          {popups.Habit.InDom && (
            <CreateHabitForm
              mode="add"
              setPopupVisibility={this.setPopupVisibility}
            />
          )}
          {popups.Task.InDom && (
            <CreateTaskForm
              mode="add"
              setPopupVisibility={this.setPopupVisibility}
            />
          )}
          {popups.PendingGoals.InDom && (
            <Goals
              subMode={{
                ColSize: 2,
                Goals: alphaSort(
                  getFilteredGoals(goals, "", "pending"),
                  "asc",
                  "name"
                )
              }}
            />
          )}
          {popups.PendingTasks.InDom && (
            <Tasks
              subMode={{
                ColSize: 2,
                Tasks: alphaSort(
                  getFilteredTasks(tasks, "", "pending"),
                  "asc",
                  "name"
                )
              }}
            />
          )}
          {popups.ActiveHabits.InDom && (
            <Habits
              subMode={{
                ColSize: 2,
                Habits: alphaSort(
                  getFilteredHabits(habits, "", "pending"),
                  "asc",
                  "name"
                )
              }}
            />
          )}
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    goalsCount: getFilteredGoals(state.goalReducer.Goals, "", "pending").length,
    habitsCount: getFilteredHabits(state.habitReducer.Habits, "", "pending")
      .length,
    tasksCount: getFilteredTasks(state.taskReducer.Tasks, "", "pending").length,
    goals: state.goalReducer.Goals,
    habits: state.habitReducer.Habits,
    tasks: state.taskReducer.Tasks
  };
};

export default connect(
  mapStateToProps,
  null
)(Home);
