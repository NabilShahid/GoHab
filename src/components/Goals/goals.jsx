import React, { Component } from "react";
import GoalCard from "../GoalCard/goalcard";
import CreateGoalForm from "../CreateGoalForm/creategoalform";
import { withFirebase } from "../../services/firebase/context";
import { updateGoals, updateGoal } from "../../actions/goalActions";
import { connect } from "react-redux";
import { Modal, Tabs } from "antd";
import "./goals.css";

const TabPane = Tabs.TabPane;

class Goals extends Component {
  state = {
    goalDialogInDom: false,
    goalDialogVisible: false,
    currentGoalOptions: {}
  };
  render() {
    const {
      goalDialogInDom,
      goalDialogVisible,
      currentGoalOptions
    } = this.state;
    return (
      <div id="goalCardsDiv">
        {this.getGoalRows(this.props.goals, 3)}
        {goalDialogInDom && (
          <Modal
            visible={goalDialogVisible}
            width="58%"
            title="Create Goal"
            centered
            bodyStyle={{ overflowY: "auto" }}
            style={{ top: "10px" }}
            onCancel={() => {
              this.closeGoalDialog();
            }}
            footer=""
          >
            <Tabs defaultActiveKey="1" tabPosition="left">
              <TabPane tab="Goal Info" key="1">
                <div className="gTabContent">{this.currentGoalDialog()}</div>
              </TabPane>
              <TabPane tab="Sub Tasks" key="2">
                <div className="gTabContent" />
              </TabPane>
              <TabPane tab="Sub Habbit" key="3">
                <div className="gTabContent" />
              </TabPane>
            </Tabs>
          </Modal>
        )}
      </div>
    );
  }

  viewGoalDialog = goal => {
    let { goalDialogVisible, goalDialogInDom } = this.state;
    const currentGoalOptions = { ...goal };
    goalDialogInDom = true;
    goalDialogVisible = true;
    this.setState({ goalDialogVisible, goalDialogInDom, currentGoalOptions });
  };

  currentGoalDialog() {
    const { currentGoalOptions } = this.state;
    return (
      <CreateGoalForm
        dueDate={currentGoalOptions.dueDate}
        name={currentGoalOptions.name}
        description={currentGoalOptions.description}
        importance={currentGoalOptions.importance}
        progress={currentGoalOptions.progress}
        mode="view"
        setFormVisibility={this.setFormVisibility}
        id={currentGoalOptions.id}
        closeAndUpdate={this.updateLocalGoal}
      />
    );
  }

  closeGoalDialog = () => {
    this.setState({ goalDialogVisible: false });
    setTimeout(() => {
      this.setState({ goalDialogInDom: false });
    }, 250);
  };

  updateLocalGoal = goal => {
    this.props.updateGoal(goal);
    this.closeGoalDialog();
  };

  /**
   *returns rows of goals, each row containing 1 to 3 cols if available
   */
  getGoalRows(goals, colSize) {
    let goalRows = [];
    for (let i = 0; i < goals.length; i += 3) {
      if (goals[i]) {
        const goalRowArray = [];
        for (let j = 0; j < colSize; j++) {
          if (goals[i + j]) goalRowArray.push(goals[i + j]);
        }

        goalRows.push(
          <div className="row" key={i}>
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
            this.viewGoalDialog(r);
          }}
        >
          <GoalCard
            name={r.name}
            description={r.description}
            dueDate={r.dueDate}
            progress={r.progress}
            asscTasks="3"
            asscHabbits="5"
          />
        </div>
      );
    });
  }

  componentDidMount() {
    this.props.firebase.goalOps
      .retrieveAllGoals("nabil110176@gmail.com")
      .then(querySnapshot => {
        const allGoals = querySnapshot.docs.map(function(doc) {
          return { ...doc.data(), id: doc.id };
        });
        var s = this.props;
        this.props.updateGoals(allGoals);
      })
      .catch(error => {
        console.log("firebase error: ", error);
      });
  }
}

const mapStateToProps = state => {
  return {
    goals: state.goalReducer.Goals
  };
};

/**
 * dispatch to props mapping form updating user
 */
const mapDispatchToProps = dispatch => {
  return {
    updateGoals: goalsPayload => {
      dispatch(updateGoals(goalsPayload));
    },
    updateGoal: goalPayload => {
      dispatch(updateGoal(goalPayload));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withFirebase(Goals));
