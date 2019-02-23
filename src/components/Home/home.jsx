import React, { Component } from "react";
import CreateCard from "../CreateCard/createcard";
import CreateGoalForm from "../CreateGoalForm/creategoalform";
import { Modal } from "antd";
class Home extends Component {
  state = {
    formOpen: {
      goal: false,
      habbit: false,
      task: false
    },
    aFormInDom: false
  };

  /**
   * show or hide a form 
   */
  setFormVisibility = (form, visibility) => {      
    const formOpen = { ...this.state.formOpen };
    const aFormInDom=formOpen[form] = visibility;
    if(aFormInDom) this.setState({ formOpen,aFormInDom });
    else{
      //remove form from dom when not needed timeout to show animation correctly
      this.setState({ formOpen });
      setTimeout(()=>{
        this.setState({aFormInDom});
      },500);
    }  
   
  };

  /**
   * add or remove from dom
   */
  addRemoveFormdom=()=>{
    const aFormInDom=false;
    this.setState({aFormInDom});
  }

  render() {
    const { formOpen,aFormInDom } = this.state;
    return (
      <div id="homeContent">
        <div className="row">
          <div
            className="col-md-4"
            onClick={() => {
              this.setFormVisibility("goal", true);
            }}
          >
            <CreateCard
              ccTitle="Create Goal"
              ccSubTitle="Create a new goal and assing value to it"
              background="var(--goal-color)"
              icon="fa fa-check"
            />
          </div>
          <div className="col-md-4">
            <CreateCard
              ccTitle="Create Habbit"
              ccSubTitle="Create a new goal and assing value to it"
              background="linear-gradient(60deg, #26c6da, #00acc1)"
              icon="fa fa-check"
            />
          </div>
          <div className="col-md-4">
            <CreateCard
              ccTitle="Create Task"
              ccSubTitle="Create a new goal and assing value to it"
              background="linear-gradient(60deg, #66bb6a, #43a047)"
              icon="fa fa-check"
            />
          </div>
        </div>
        {aFormInDom && (
          <Modal
            visible={formOpen.goal}
            width="53%"
            title="Create Goal"
            centered
            bodyStyle={{ overflowY: "auto" }}
            style={{ top: "10px" }}
            onCancel={() => {
              this.setFormVisibility("goal", false);
            }}
            footer=""
          >
            {/* <CreateGoalForm /> */}
            <CreateGoalForm
            dueDate="2019-02-23T09:48:13.652Z"
            name="Test Goal"
            description="TestDescription"
            importance="3.5"
            progress="94"
            mode="view"
            setFormVisibility={this.setFormVisibility}
            />
          </Modal>
        )}
      </div>
    );
  }
}

export default Home;
