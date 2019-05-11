import React, { Component } from "react";
import {
  Modal,
  Radio,
  Row,
  Col,
  Select,
  message,
  Button,
  Popover,
  Tooltip
} from "antd";
import { connect } from "react-redux";
import { withFirebase } from "../../services/firebase/context";
import BucketList from "../BucketList/bucketlist";
import {
  updateTask,
  sortTasks,
  filterTasksByStatus,
  changeTasksViewType
} from "../../actions/taskActions";
import TaskCard from "../TaskCard/taskcard";
import CreateTaskForm from "../CreateTaskForm/createtaskform";
import "./tasks.css";
const Option = Select.Option;
class Tasks extends Component {
  state = {
    taskDialogInDom: false,
    taskDialogVisible: false,
    currentTaskOptions: {},
    taskViewMode: "view",
    taskDialogTitle: ""
  };

  changeOrderBy(v) {
    const orderBy = v;
    this.props.sortTasks({ orderBy });
  }
  changeTasksStatus(v) {
    this.props.filterTasksByStatus(v);
  }
  changeViewType(v) {
    this.props.changeTasksViewType();
  }
  render() {
    const {
      taskDialogInDom,
      taskDialogVisible,
      currentTaskOptions,
      taskViewMode,
      taskDialogTitle
    } = this.state;
    const { statusFilter, orderBy, viewTypeFilter, subMode } = this.props;
    return (
      <div id="taskCardsDiv">
        {subMode && (
          <div className="actualCardsDiv">
            {this.getTasksRows(subMode.Tasks, subMode.ColSize)}
          </div>
        )}
        {!subMode && (
          <React.Fragment>
            <div className="row cardsViewSelector">
              <div className="col-md-6" style={{ padding: 0 }}>
                <Button
                  type="primary"
                  className="noColorButton"
                  style={{ background: "var(--task-color)" }}
                  onClick={() => this.viewTaskDialog(false, false)}
                >
                  <i className="fa fa-plus" style={{ marginRight: "10px" }} />
                  Add New
                </Button>
                {/* <span style={{float:"right"}}>Tasks Under Goals</span> */}
              </div>

              <div className="col-md-6 cardsFilterIconContainer">
                <Popover
                  placement="bottomLeft"
                  title="Change View"
                  content={
                    <div>
                      <div className="cardFilterLabel">Tasks View:</div>
                      <div>
                        <Radio.Group
                          value={viewTypeFilter}
                          buttonStyle="solid"
                          size="small"
                          onChange={e => {
                            this.changeViewType(e.target.value);
                          }}
                        >
                          <Radio.Button value="bucket">Goals View</Radio.Button>
                          <Radio.Button value="grid">Grid View</Radio.Button>
                        </Radio.Group>
                      </div>
                      <div className="cardFilterLabel">Show Tasks:</div>
                      <div>
                        <Radio.Group
                          value={statusFilter}
                          buttonStyle="solid"
                          size="small"
                          onChange={e => {
                            this.changeTasksStatus(e.target.value);
                          }}
                        >
                          <Radio.Button value="all">All</Radio.Button>
                          <Radio.Button value="completed">
                            Completed
                          </Radio.Button>
                          <Radio.Button value="pending">Pending</Radio.Button>
                        </Radio.Group>
                      </div>
                      <div className="cardFilterLabel">Sort:</div>
                      <div>
                        <Select
                          onChange={e => this.changeOrderBy(e)}
                          style={{ width: "100%" }}
                          size="small"
                          value={orderBy}
                        >
                          <Option value="dueDate">Due Date</Option>
                          <Option value="importance">Importance</Option>
                          <Option value="alphabetical">Alphabetical</Option>
                        </Select>
                      </div>
                    </div>
                  }
                  trigger="click"
                >
                  <Tooltip title="Change View">
                    <i
                      className="fa fa-cogs cardsFilterIcon"
                      style={{ color: "#4ea952" }}
                    />
                  </Tooltip>
                </Popover>
              </div>
            </div>

            {viewTypeFilter === "bucket" ? (
              <BucketList
                items={this.props.tasks}
                lists={this.props.goalNamesAndIDs}
                openDialog={this.viewTaskDialog}
                markItem={this.markTask}
                card="task"
              />
            ) : (
              <div className="actualCardsDiv">
                {this.getTasksRows(this.props.tasks, 3)}
              </div>
            )}
          </React.Fragment>
        )}
        {taskDialogInDom && (
          <Modal
            visible={taskDialogVisible}
            width="53%"
            title={taskDialogTitle}
            centered
            bodyStyle={{ overflowY: "auto" }}
            style={{ top: "10px" }}
            onCancel={() => {
              this.closeTaskDialog();
            }}
            footer=""
          >
            <CreateTaskForm
              mode={taskViewMode}
              name={currentTaskOptions.name}
              description={currentTaskOptions.description}
              dueDate={currentTaskOptions.dueDate}
              id={currentTaskOptions.id}
              importance={currentTaskOptions.importance}
              parentGoal={currentTaskOptions.parentGoal}
              closeAndUpdate={this.updateLocalTask}
              close={this.closeTaskDialog}
            />
          </Modal>
        )}
      </div>
    );
  }

  viewTaskDialog = (task, parentGoal) => {
    const taskViewMode = task ? "view" : "add";
    const taskDialogTitle = task ? task.name : "Create Task";
    let { taskDialogVisible, taskDialogInDom } = this.state;
    const currentTaskOptions = { ...task };
    if (parentGoal) currentTaskOptions.parentGoal = parentGoal;
    taskDialogInDom = true;
    taskDialogVisible = true;
    this.setState({
      taskDialogVisible,
      taskDialogInDom,
      currentTaskOptions,
      taskViewMode,
      taskDialogTitle
    });
  };

  closeTaskDialog = () => {
    this.setState({ taskDialogVisible: false });
    setTimeout(() => {
      this.setState({ taskDialogInDom: false });
    }, 250);
  };

  updateLocalTask = task => {
    this.props.updateTask(task);
    this.closeTaskDialog();
    setTimeout(() => {
      if (this.props.statusFilter != "all") {
        this.changeTasksStatus(this.props.statusFilter);

        this.changeOrderBy(this.props.orderBy);
      }
    }, 1500);
  };

  /**
   *returns rows of tasks, each row containing 1 to 3 cols if available
   */
  getTasksRows(tasks, colSize) {
    let taskRows = [];
    for (let i = 0; i < tasks.length; i += colSize) {
      if (tasks[i]) {
        const taskRowArray = [];
        for (let j = 0; j < colSize; j++) {
          if (tasks[i + j]) taskRowArray.push(tasks[i + j]);
        }

        taskRows.push(
          <div className="row" style={{ marginTop: "15px" }} key={i}>
            {this.getTaskCols(taskRowArray, i, colSize)}
          </div>
        );
      }
    }
    return taskRows;
  }

  getTaskCols(rowArray, rowindex, colSize) {
    let cellClass = `col-md-${Math.floor(12 / colSize)}`;
    if (rowindex > 0) cellClass += " tasksRow";
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
            completed={r.completed}
            importance={r.importance}
            markTask={this.markTask}
            id={r.id}
          />
        </div>
      );
    });
  }

  markTask = id => {
    let currTask = this.props.tasks.find(v => v.id == id);
    if (currTask.completed) currTask.completed = false;
    else {
      currTask.completed = true;
      message.success(`Marked ${currTask.name} as completed!`);
    }
    this.updateLocalTask(currTask);

    this.props.firebase.taskOps
      .updateTask("nabil110176@gmail.com", currTask, id)
      .then(() => {})
      .catch(error => {
        console.error("Error writing document: ", error);
      });
  };
}
const mapStateToProps = state => {
  return {
    tasks: state.taskReducer.FilteredTasks,
    statusFilter: state.taskReducer.CurrentStatusFilter,
    orderBy: state.taskReducer.CurrentOrderBy,
    goalNamesAndIDs: state.goalReducer.SortedGoalNamesAndIDs,
    viewTypeFilter: state.taskReducer.CurrentViewType
  };
};

/**
 * dispatch to props mapping form updating user
 */
const mapDispatchToProps = dispatch => {
  return {
    updateTask: taskPayload => {
      dispatch(updateTask(taskPayload));
    },
    sortTasks: taskPayload => {
      dispatch(sortTasks(taskPayload));
    },
    filterTasksByStatus: statusPayload => {
      dispatch(filterTasksByStatus(statusPayload));
    },
    changeTasksViewType: statusPayload => {
      dispatch(changeTasksViewType(statusPayload));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withFirebase(Tasks));
