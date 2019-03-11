import React, { Component } from 'react';
import { Modal, Tabs } from "antd";
import { connect } from "react-redux";
import { withFirebase } from "../../services/firebase/context";
import HabitCard from "../HabitCard/habitcard";
import CreateGoalForm from "../CreateGoalForm/creategoalform";
const TabPane = Tabs.TabPane;

class Habits extends Component {
    state = {
        habitDialogInDom: false,
        habitDialogVisible: false,
        currentHabitOptions: {}
      };
      render() {
        const {
          habitDialogInDom,
          habitDialogVisible,
          currentHabitOptions
        } = this.state;
        return (
          <div id="habitCardsDiv">
            {this.getHabitsRows(this.props.goals, 3)}
            {habitDialogInDom && (
              <Modal
                visible={habitDialogVisible}
                width="58%"
                title={currentHabitOptions.name}
                centered
                bodyStyle={{ overflowY: "auto" }}
                style={{ top: "10px" }}
                onCancel={() => {
                  this.closeHabitDialog();
                }}
                footer=""
              >
                <Tabs defaultActiveKey="1" tabPosition="left">
                  <TabPane tab="Goal Info" key="1">
                    <div className="hTabContent">{this.currentHabitDialog()}</div>
                  </TabPane>
                  <TabPane tab="Sub Habits" key="2">
                    <div className="hTabContent" />
                  </TabPane>
                  <TabPane tab="Sub Tasks" key="3">
                    <div className="hTabContent" />
                  </TabPane>
                </Tabs>
              </Modal>
            )}
          </div>
        );
      }
    
      viewHabitDialog = goal => {
        let { habitDialogVisible, habitDialogInDom } = this.state;
        const currentGoalOptions = { ...goal };
        habitDialogInDom = true;
        habitDialogVisible = true;
        this.setState({ habitDialogVisible, habitDialogInDom, currentGoalOptions });
      };
    
      currentHabitDialog() {
        const { currentHabitOptions } = this.state;
        return (
          <CreateGoalForm
            dueDate={currentHabitOptions.dueDate}
            name={currentHabitOptions.name}
            description={currentHabitOptions.description}
            importance={currentHabitOptions.importance}
            progress={currentHabitOptions.progress}
            mode="view"
            setFormVisibility={this.setFormVisibility}
            id={currentHabitOptions.id}
            closeAndUpdate={this.updateLocalHabit}
          />
        );
      }
    
      closeHabitDialog = () => {
        this.setState({ goalDialogVisible: false });
        setTimeout(() => {
          this.setState({ goalDialogInDom: false });
        }, 250);
      };
    
      updateLocalHabit = goal => {
        this.props.updateGoal(goal);
        this.closeHabitDialog();
      };
    
      /**
       *returns rows of goals, each row containing 1 to 3 cols if available
       */
      getHabitsRows(goals, colSize) {
        let goalRows = [];
        for (let i = 0; i < goals.length; i += 3) {
          if (goals[i]) {
            const goalRowArray = [];
            for (let j = 0; j < colSize; j++) {
              if (goals[i + j]) goalRowArray.push(goals[i + j]);
            }
    
            goalRows.push(
              <div className="row" style={{marginTop:"15px"}} key={i}>
                {this.getRowCols(goalRowArray, i)}
              </div>
            );
          }
        }
        return goalRows;
      }
    
      getRowCols(rowArray, rowindex) {
        let cellClass = "col-md-4";
        if (rowindex > 0) cellClass += " goalsRow";
        return rowArray.map(r => {
          return (
            <div
              key={r.id}
              className={cellClass}
              onClick={() => {
                this.viewHabitDialog(r);
              }}
            >
              <HabitCard
                name={r.name}
                description={r.description}
                dueDate={r.dueDate}
                progress={r.progress}
                asscTasks="3"
                asscHabits="5"
              />
            </div>
          );
        });
      }
}
const mapStateToProps = state => {
    return {
      goals: state.goalReducer.FilteredGoals
    };
  };
  
  /**
   * dispatch to props mapping form updating user
   */
  const mapDispatchToProps = dispatch => {
    return {   
      updateGoal: goalPayload => {
        "dispatch(updateGoal(goalPayload));"
      }
    };
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(withFirebase(Habits));
 