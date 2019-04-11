import React, { Component } from "react";
import { Modal, Radio, Row, Col, Select, message, Button } from "antd";
import { connect } from "react-redux";
import { withFirebase } from "../../services/firebase/context";
import BucketList from "../BucketList/bucketlist";
import {
  updateTask,
  sortTasks,
  filterTasksByStatus
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
    taskDialogTitle: "",
    viewTypeFilter: "bucket"
  };
  changeOrder() {
    let { order, orderBy } = this.props;
    if (order == "asc") order = "desc";
    else order = "asc";
    this.props.sortTasks({ order, orderBy });
  }
  changeOrderBy(v) {
    const orderBy = v;
    this.props.sortTasks({ order: this.props.order, orderBy });
  }
  changeTasksStatus(v) {
    this.props.filterTasksByStatus(v);
  }
  changeViewType(v) {
    const viewTypeFilter =
      this.state.viewTypeFilter === "bucket" ? "grid" : "bucket";
    this.setState({ viewTypeFilter });
  }
  render() {
    const {
      taskDialogInDom,
      taskDialogVisible,
      currentTaskOptions,
      taskViewMode,
      taskDialogTitle,
      viewTypeFilter
    } = this.state;
    const { statusFilter, orderBy, order } = this.props;
    return (
      <div id="taskCardsDiv">
        <div className="row cardsViewSelector">
          <div className="col-md-8" style={{ padding: 0 }}>
            <Button
              type="primary"
              className="noColorButton"
              style={{ background: "var(--task-color)"}}
            >
              <i className="fa fa-plus" style={{ marginRight: "10px" }} />Add
              Task
            </Button>
          </div>
          <div className="col-md-4">
            
          </div>
        </div>
        {/* <div className="cardsViewSelector">
          <Row />
          <Row>
            <Col span={11}>
              <Radio.Group
                value={statusFilter}
                buttonStyle="solid"
                onChange={e => {
                  this.changeTasksStatus(e.target.value);
                }}
              >
                <Radio.Button value="all">All Tasks</Radio.Button>
                <Radio.Button value="completed">Completed Tasks</Radio.Button>
                <Radio.Button value="pending">Pending Tasks</Radio.Button>
              </Radio.Group>
            </Col>
            <Col span={6}>
              <Radio.Group
                value={viewTypeFilter}
                buttonStyle="solid"
                onChange={e => {
                  this.changeViewType(e.target.value);
                }}
              >
                <Radio.Button value="bucket">
                  <i
                    style={{ transform: "rotate(90deg)" }}
                    className="tViewSwitcherIcon fa fa-align-left"
                  />
                  Bucket View
                </Radio.Button>
                <Radio.Button value="grid">
                  <i className="tViewSwitcherIcon  fa fa-th-large" />Grid View
                </Radio.Button>
              </Radio.Group>
            </Col>

            <Col
              span={6}
              className="controlTopPadding"
              style={{ textAlign: "right" }}
            >
              <span className="miniLabel">Order By:</span>
              <Select
                onChange={e => this.changeOrderBy(e)}
                style={{ width: "120px" }}
                size="small"
                value={orderBy}
              >
                <Option value="dueDate">Due Date</Option>
                {statusFilter == "all" && (
                  <Option value="progress">Progress</Option>
                )}
                <Option value="importance">Importance</Option>
                <Option value="alphabetical">Alphabetical</Option>
              </Select>
            </Col>
            <Col
              span={1}
              className="controlTopPadding"
              style={{ textAlign: "center" }}
            >
              <div
                onClick={() => {
                  this.changeOrder();
                }}
                className="orderIcon"
              >
                {order == "asc" && <i className="fa fa-sort-up" />}
                {order == "desc" && <i className="fa fa-sort-down" />}
              </div>
            </Col>
          </Row>
        </div> */}
        {viewTypeFilter === "bucket" ? (
          <BucketList
            items={this.props.tasks}
            lists={this.props.goalNamesAndIDs}
            openDialog={this.viewTaskDialog}
            markItem={this.markTask}
          />
        ) : (
          <div className="actualCardsDiv">
            {this.getTasksRows(this.props.tasks, 3)}
          </div>
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
      } else {
        this.changeOrderBy(this.props.orderBy);
      }
    }, 1500);
  };

  /**
   *returns rows of tasks, each row containing 1 to 3 cols if available
   */
  getTasksRows(tasks, colSize) {
    let taskRows = [];
    for (let i = 0; i < tasks.length; i += 3) {
      if (tasks[i]) {
        const taskRowArray = [];
        for (let j = 0; j < colSize; j++) {
          if (tasks[i + j]) taskRowArray.push(tasks[i + j]);
        }

        taskRows.push(
          <div className="row" style={{ marginTop: "15px" }} key={i}>
            {this.getTaskCols(taskRowArray, i)}
          </div>
        );
      }
    }
    return taskRows;
  }

  getTaskCols(rowArray, rowindex) {
    let cellClass = "col-md-4";
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
    order: state.taskReducer.CurrentOrder,
    orderBy: state.taskReducer.CurrentOrderBy,
    goalNamesAndIDs: state.goalReducer.SortedGoalNamesAndIDs
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
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withFirebase(Tasks));
