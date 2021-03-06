import React, { Component } from "react";
import GoalCard from "../GoalCard/goalcard";
import CreateGoalForm from "../CreateGoalForm/creategoalform";
import Tasks from "../Tasks/tasks";
import Habits from "../Habits/habits";
import { withFirebase } from "../../services/firebase/context";
import {
  updateGoal,
  sortGoals,
  filterGoalsByStatus
} from "../../actions/goalActions";
import { connect } from "react-redux";
import { alphaSort } from "../../services/methods/ghtCommonMethods.js";
import { getFilteredGoals } from "../../services/methods/goalMethods";
import {
  Modal,
  Tabs,
  Radio,
  Row,
  Col,
  message,
  Popover,
  Button,
  Icon,
  Select,
  Tooltip,
  Input
} from "antd";
import "./goals.css";
import { FilterAndSort } from "../../constants/iconSvgs";

const Option = Select.Option;
const TabPane = Tabs.TabPane;
const Search = Input.Search;
class Goals extends Component {
  state = {
    goalDialogInDom: false,
    goalDialogVisible: false,
    currentGoalOptions: {},
    subModeSearchValue: "",
    goalAddMode: false
  };
  changeOrderBy(v) {
    const orderBy = v;
    this.props.sortGoals({ orderBy });
  }
  changeGoalsStatus(v) {
    this.props.filterGoalsByStatus(v);
  }
  render() {
    const {
      goalDialogInDom,
      goalDialogVisible,
      currentGoalOptions,
      subModeSearchValue,
      goalAddMode
    } = this.state;
    const { statusFilter, orderBy, tasks, habits, subMode } = this.props;
    return (
      <div id="goalCardsDiv">
        {subMode && (
          <div className="actualCardsDiv">
            <div style={{ textAlign: "right" }}>
              <Search
                className="submodeSearch"
                placeholder="Search"
                value={subModeSearchValue}
                size="small"
                onChange={e => {
                  this.setState({ subModeSearchValue: e.target.value });
                }}
                style={{ width: 210 }}
              />
            </div>
            {this.getGoalRows(
              getFilteredGoals(subMode.Goals, subModeSearchValue, "all"),
              subMode.ColSize
            )}
          </div>
        )}
        {!subMode && (
          <React.Fragment>
            <div className="row cardsViewSelector">
              <div className="col-md-6" style={{ padding: 0 }}>
                <Button
                  type="primary"
                  className="noColorButton"
                  style={{ background: "var(--goal-color)" }}
                  onClick={() =>
                    this.setState({goalDialogVisible:true, goalDialogInDom: true, goalAddMode: true })
                  }
                >
                  <i className="fa fa-plus" style={{ marginRight: "10px" }} />
                  Add New
                </Button>
              </div>
              <div className="col-md-6 cardsFilterIconContainer">
                <Popover
                  placement="bottomLeft"
                  title="Change View"
                  content={
                    <div>
                      <div className="cardFilterLabel">Show Goals:</div>
                      <div>
                        <Radio.Group
                          value={statusFilter}
                          buttonStyle="solid"
                          size="small"
                          onChange={e => {
                            this.changeGoalsStatus(e.target.value);
                          }}
                        >
                          <Radio.Button value="all">All</Radio.Button>
                          <Radio.Button value="completed">
                            Achieved
                          </Radio.Button>
                          <Radio.Button value="pending">Pending</Radio.Button>
                        </Radio.Group>
                      </div>
                      <div className="cardFilterLabel">Sort:</div>
                      <div>
                        <Select
                          onChange={e => this.changeOrderBy(e)}
                          value={orderBy}
                          size="small"
                          style={{ width: "100%" }}
                        >
                          <Option value="dueDate">Due Date</Option>
                          {statusFilter != "completed" && (
                            <Option value="progress">Progress</Option>
                          )}
                          <Option value="importance">Importance</Option>
                          <Option value="alphabetical">Alphabetical</Option>
                        </Select>
                      </div>
                    </div>
                  }
                  trigger="click"
                >
                  {" "}
                  <Tooltip title="Change View">
                    <FilterAndSort
                      style={{ fill: "var(--goal-color)" }}
                      className="filterAndSortIcon"
                    />
                  </Tooltip>
                </Popover>
              </div>
            </div>

            <div className="actualCardsDiv">
              {this.getGoalRows(this.props.goals, 3)}
            </div>
          </React.Fragment>
        )}

        {goalDialogInDom && (
          <Modal
            visible={goalDialogVisible}
            width="58%"
            title={currentGoalOptions.name}
            centered
            bodyStyle={{ overflowY: "auto" }}
            style={{ top: "10px" }}
            onCancel={() => {
              this.closeGoalDialog();
            }}
            footer=""
          >
            {goalAddMode && (
              <CreateGoalForm
                mode="add"
                setPopupVisibility={this.closeGoalDialog}
              />
            )}
            {!goalAddMode && (
              <Tabs defaultActiveKey="1" tabPosition="top">
                <TabPane tab="Goal Info" key="1">
                  <div className="gTabContent">{this.currentGoalDialog()}</div>
                </TabPane>
                <TabPane tab="Sub Habits" key="2">
                  <div className="gTabContent">
                    <Habits
                      subMode={{
                        ColSize: 2,
                        Habits: alphaSort(
                          habits.filter(
                            g => g.parentGoal == currentGoalOptions.id
                          ),
                          "asc",
                          "name"
                        )
                      }}
                    />
                  </div>
                </TabPane>
                <TabPane tab="Sub Tasks" key="3">
                  <div className="gTabContent">
                    <Tasks
                      subMode={{
                        ColSize: 2,
                        Tasks: alphaSort(
                          tasks.filter(
                            t => t.parentGoal == currentGoalOptions.id
                          ),
                          "asc",
                          "name"
                        )
                      }}
                    />
                  </div>
                </TabPane>
              </Tabs>
            )}
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
        goalOptions={currentGoalOptions}
        mode="view"
        setPopupVisibility={this.closeGoalDialog}
        closeAndUpdate={this.updateLocalGoal}
      />
    );
  }

  closeGoalDialog = () => {
    this.setState({ goalDialogVisible: false });
    setTimeout(() => {
      this.setState({ goalDialogInDom: false,goalAddMode: false });
    }, 250);
  };

  updateLocalGoal = goal => {
    this.props.updateGoal(goal);
    this.closeGoalDialog();
    setTimeout(() => {
      if (this.props.statusFilter != "all") {
        this.changeGoalsStatus(this.props.statusFilter);
      }
      this.changeOrderBy(this.props.orderBy);
    }, 1500);
  };

  /**
   *returns rows of goals, each row containing 1 to 3 cols if available
   */
  getGoalRows(goals, colSize) {
    let goalRows = [];
    for (let i = 0; i < goals.length; i += colSize) {
      if (goals[i]) {
        const goalRowArray = [];
        for (let j = 0; j < colSize; j++) {
          if (goals[i + j]) goalRowArray.push(goals[i + j]);
        }

        goalRows.push(
          <div className="row" style={{ marginTop: "15px" }} key={i}>
            {this.getRowCols(goalRowArray, i, colSize)}
          </div>
        );
      }
    }
    return goalRows;
  }

  getRowCols(rowArray, rowindex, colSize) {
    let cellClass = `col-md-${Math.floor(12 / colSize)}`;
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
            importance={r.importance}
            bgColor={r.bgColor}
            id={r.id}
            subTasks={r.subTasks}
            subHabits={r.subHabits}
            markGoal={this.markGoal}
          />
        </div>
      );
    });
  }

  markGoal = id => {
    let currGoal = this.props.goals.find(v => v.id == id);
    if (currGoal.progress == 100) {
      currGoal.dateCompleted = false;
      currGoal.progress = 0;
    } else {
      currGoal.progress = 100;
      currGoal.dateCompleted = new Date().toISOString();
      message.success(`Marked ${currGoal.name} as achieved!`);
    }
    this.updateLocalGoal(currGoal);
    this.props.firebase.goalOps
      .updateGoal(this.props.userEmail, currGoal, id)
      .then(() => {})
      .catch(error => {
        console.error("Error writing document: ", error);
      });
  };
}

const mapStateToProps = state => {
  return {
    goals: state.goalReducer.FilteredGoals,
    statusFilter: state.goalReducer.CurrentStatusFilter,
    orderBy: state.goalReducer.CurrentOrderBy,
    tasks: state.taskReducer.Tasks,
    habits: state.habitReducer.Habits,
    userEmail: state.userReducer.User.Email
  };
};

/**
 * dispatch to props mapping form updating user
 */
const mapDispatchToProps = dispatch => {
  return {
    updateGoal: goalPayload => {
      dispatch(updateGoal(goalPayload));
    },
    sortGoals: sortPayload => {
      dispatch(sortGoals(sortPayload));
    },
    filterGoalsByStatus: statusPayload => {
      dispatch(filterGoalsByStatus(statusPayload));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withFirebase(Goals));
