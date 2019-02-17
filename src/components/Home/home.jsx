import React, { Component } from "react";
import CreateCard from "../CreateCard/createcard";
import CreateGoalForm from "../CreateGoalForm/creategoalform";

class Home extends Component {
  state = {
    formOpen: {
      goal: false,
      habbit: false,
      task: false
    }
  };

  setFormVisibility=(form,visibility)=>{
    const formOpen={...this.state.formOpen};
    formOpen[form]=visibility;  
    this.setState({formOpen});
  }

  render() {
    const {formOpen}=this.state;
    return (
      <div id="homeContent">
        <div className="row">
          <div className="col-md-4" onClick={()=>{this.setFormVisibility("goal",true)}}>
            <CreateCard
              ccTitle="Create Goal"
              ccSubTitle="Create a new goal and assing value to it"
              background="linear-gradient(60deg, #ffa726, #fb8c00)"
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
        {formOpen.goal&&<CreateGoalForm close={()=>{this.setFormVisibility("goal",false)}}/>}
      </div>
    );
  }
}

export default Home;
