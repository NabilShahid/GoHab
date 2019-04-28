import React, { Component } from "react";
import CreateCard from "../CreateCard/createcard";
import CreateGoalForm from "../CreateGoalForm/creategoalform";
import CreateHabitForm from "../CreateHabitForm/createhabitform";
import CreateTaskForm from "../CreateTaskForm/createtaskform";
import CountCard from "../CountCard/countcard";
import { connect } from "react-redux";
import { Modal } from "antd";
import {getFilteredGoals} from "../../services/methods/goalMethods";
import {getFilteredHabits} from "../../services/methods/habitMethods";
import {getSortedTasks, getFilteredTasks} from "../../services/methods/taskMethods";
import "./home.css";
class Home extends Component {
  state = {
    anyFormOpen: false,
    formInDom: {
      Goal: false,
      Habit: false,
      Task: false
    },
    createDialogTitle: ""
  };

  /**
   * show or hide a form
   */
  setFormVisibility = (form, visibility) => {
    const formInDom = { ...this.state.formInDom };
    const anyFormOpen = (formInDom[form] = visibility);
    const createDialogTitle = form;
    if (anyFormOpen)
      this.setState({ anyFormOpen, formInDom, createDialogTitle });
    else {
      //remove form from dom when not needed timeout to show animation correctly
      this.setState({ anyFormOpen });
      setTimeout(() => {
        this.setState({ formInDom });
      }, 250);
    }
  };

  render() {
    const { anyFormOpen, formInDom, createDialogTitle } = this.state;
    const {goalsCount,tasksCount,habitsCount}=this.props;
    return (
      <div id="homeContent">
        <div className="row">
          <div
            className="col-md-4"
            onClick={() => {
              this.setFormVisibility("Goal", true);
            }}
          >
            <CreateCard
              ccTitle="Create Goal"
              ccSubTitle="Create a new goal and assing value to it"
              background="var(--goal-color)"
              boxShadow="var(--goal-shadow)"
              icon="fa fa-check"
            />
          </div>
          <div
            className="col-md-4"
            onClick={() => {
              this.setFormVisibility("Habit", true);
            }}
          >
            <CreateCard
              ccTitle="Create Habit"
              ccSubTitle="Create a new goal and assing value to it"
              background="linear-gradient(60deg, #26c6da, #00acc1)"
              boxShadow="var(--habit-shadow)"
              icon="fa fa-check"
            />
          </div>
          <div
            className="col-md-4"
            onClick={() => {
              this.setFormVisibility("Task", true);
            }}
          >
            <CreateCard
              ccTitle="Create Task"
              ccSubTitle="Create a new goal and assing value to it"
              background="linear-gradient(60deg, #66bb6a, #43a047)"
              boxShadow="var(--task-shadow)"
              icon="fa fa-check"
            />
          </div>
        </div>
        <div className="row" style={{ marginTop: "30px" }}>
          <div className="col-md-4">
            <CountCard
              background="linear-gradient(160deg,#f9f8f8 80%,#f7d7ac)"
              color="#fd9a14"              
              subtitle="Pending Goals"
              count={goalsCount}
            />
          </div>
          <div className="col-md-4">
            <CountCard
              background="linear-gradient(160deg,#f9f8f8 80%,#c3dfe2)"
              color="#04afc4"              
              subtitle="Active Habits"
              count={habitsCount}
            />
          </div>
          <div className="col-md-4">
            <CountCard
              background="linear-gradient(160deg,#f9f8f8 80%,#c6ffc8)"
              color="#49a54d"              
              subtitle="Pending Tasks"
              count={tasksCount}
            />
          </div>
        </div>

        <Modal
          visible={anyFormOpen}
          width="53%"
          title={"Create " + createDialogTitle}
          centered
          bodyStyle={{ overflowY: "auto" }}
          style={{ top: "10px" }}
          onCancel={() => {
            this.setFormVisibility(createDialogTitle, false);
          }}
          footer=""
        >
          {formInDom.Goal && (
            <CreateGoalForm
              mode="add"
              setFormVisibility={this.setFormVisibility}
            />
          )}
          {formInDom.Habit && (
            <CreateHabitForm
              mode="add"
              setFormVisibility={this.setFormVisibility}
            />
          )}
          {formInDom.Task && (
            <CreateTaskForm
              mode="add"
              setFormVisibility={this.setFormVisibility}
            />
          )}
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    goalsCount: getFilteredGoals(state.goalReducer.Goals,"","pending").length,
    habitsCount: getFilteredHabits(state.habitReducer.Habits,"","pending").length,
    tasksCount: getFilteredTasks(state.taskReducer.Tasks,"","pending").length
  };
};

export default connect(
  mapStateToProps,
  null
)(Home);
