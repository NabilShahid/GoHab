import React, { Component } from "react";
import CreateCard from "../CreateCard/createcard";
import CreateGoalForm from "../CreateGoalForm/creategoalform";
import CreateHabitForm from "../CreateHabitForm/createhabitform";

import { Modal } from "antd";
class Home extends Component {
  state = {
    anyFormOpen: false,
    formInDom: {
      Goal: false,
      Habit: false,
      Task: false
    },
    createDialogTitle:""
  };

  /**
   * show or hide a form
   */
  setFormVisibility = (form, visibility) => {
    const formInDom = { ...this.state.formInDom };
    const anyFormOpen = (formInDom[form] = visibility);
    const createDialogTitle=form;
    if (anyFormOpen) this.setState({ anyFormOpen, formInDom ,createDialogTitle});
    else {
      //remove form from dom when not needed timeout to show animation correctly
      this.setState({ anyFormOpen });
      setTimeout(() => {
        this.setState({ formInDom });
      }, 250);
    }
  };

  /**
   * add or remove from dom
   */
  addRemoveFormdom = () => {
    const aFormInDom = false;
    this.setState({ aFormInDom });
  };

  render() {
    const { anyFormOpen, formInDom, createDialogTitle } = this.state;
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
          <div className="col-md-4" onClick={() => {
              this.setFormVisibility("Habit", true);
            }}>
            <CreateCard
              ccTitle="Create Habit"
              ccSubTitle="Create a new goal and assing value to it"
              background="linear-gradient(60deg, #26c6da, #00acc1)"
              boxShadow="var(--habit-shadow)"              
              icon="fa fa-check"
            />
          </div>
          <div className="col-md-4">
            <CreateCard
              ccTitle="Create Task"
              ccSubTitle="Create a new goal and assing value to it"
              background="linear-gradient(60deg, #66bb6a, #43a047)"
              boxShadow="var(--task-shadow)"              
              icon="fa fa-check"
            />
          </div>
        </div>

        <Modal
          visible={anyFormOpen}
          width="53%"
          title={"Create "+createDialogTitle}
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
        </Modal>
      </div>
    );
  }
}

export default Home;
