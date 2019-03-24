import React, { Component } from 'react';
import { Modal, Tabs } from "antd";
import { connect } from "react-redux";
import { withFirebase } from "../../services/firebase/context";
import TaskCard from "../TaskCard/taskcard";
import CreateGoalForm from "../CreateGoalForm/creategoalform";
const TabPane = Tabs.TabPane;

class Tasks extends Component {
    state = {
        taskDialogInDom: false,
        taskDialogVisible: false,
        currentTaskOptions: {}
      };
      render() {
        const {
          taskDialogInDom,
          taskDialogVisible,
          currentTaskOptions
        } = this.state;
        return (
          <div id="taskCardsDiv">
            {this.getTasksRows(this.props.tasks, 3)}
            {taskDialogInDom && (
              <Modal
                visible={taskDialogVisible}
                width="58%"
                title={currentTaskOptions.name}
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
                    <div className="hTabContent">{this.currentTaskDialog()}</div>
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
    
      viewTaskDialog = task => {
        let { taskDialogVisible, taskDialogInDom } = this.state;
        const currentTaskOptions = { ...task };
        taskDialogInDom = true;
        taskDialogVisible = true;
        this.setState({ taskDialogVisible, taskDialogInDom, currentTaskOptions });
      };
    
      currentTaskDialog() {
        const { currentTaskOptions } = this.state;
        return (
          <CreateGoalForm
            dueDate={currentTaskOptions.dueDate}
            name={currentTaskOptions.name}
            description={currentTaskOptions.description}
            importance={currentTaskOptions.importance}
            progress={currentTaskOptions.progress}
            mode="view"
            setFormVisibility={this.setFormVisibility}
            id={currentTaskOptions.id}
            closeAndUpdate={this.updateLocalTask}
          />
        );
      }
    
      closeTaskDialog = () => {
        this.setState({ goalDialogVisible: false });
        setTimeout(() => {
          this.setState({ goalDialogInDom: false });
        }, 250);
      };
    
      updateLocalTask = goal => {
        this.props.updateGoal(goal);
        this.closeTaskDialog();
      };
    
      /**
       *returns rows of goals, each row containing 1 to 3 cols if available
       */
      getTasksRows(goals, colSize) {
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
                this.viewTaskDialog(r);
              }}
            >
              <TaskCard
                name={r.name}
                description={r.description}
                dueDate={r.dueDate}
                progress={r.progress}
                importance={r.importance}
              />
            </div>
          );
        });
      }
}
const mapStateToProps = state => {
    return {
      tasks: state.taskReducer.FilteredTasks
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
  )(withFirebase(Tasks));
 