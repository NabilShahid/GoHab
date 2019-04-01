import React, { Component } from "react";
import { Modal, Radio, Row, Col, Select, Op } from "antd";
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
    currentTaskOptions: {}
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
  render() {
    const {
      taskDialogInDom,
      taskDialogVisible,
      currentTaskOptions
    } = this.state;
    const { statusFilter, orderBy, order } = this.props;
    return (
      <div id="taskCardsDiv">
        <div className="cardsViewSelector">
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
                <Radio.Button value="completed">Completed Goals</Radio.Button>
                <Radio.Button value="pending">Pending Tasks</Radio.Button>
              </Radio.Group>
            </Col>

            <Col
              span={12}
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
        </div>
        {/* <div className="actualCardsDiv">
        {this.getTasksRows(this.props.tasks, 3)}
        </div> */}
        <BucketList
          items={this.props.tasks}
          lists={this.props.goalNamesAndIDs}
          openDialog={this.viewTaskDialog}
        />
        {taskDialogInDom && (
          <Modal
            visible={taskDialogVisible}
            width="53%"
            title={currentTaskOptions.name}
            centered
            bodyStyle={{ overflowY: "auto" }}
            style={{ top: "10px" }}
            onCancel={() => {
              this.closeTaskDialog();
            }}
            footer=""
          >
            <CreateTaskForm
              mode="add"
              setFormVisibility={this.setFormVisibility}
            />
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
      <CreateTaskForm
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
    this.setState({ taskDialogVisible: false });
    setTimeout(() => {
      this.setState({ taskDialogInDom: false });
    }, 250);
  };

  updateLocalTask = task => {
    this.props.updateTask(task);
    this.closeTaskDialog();
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
    updateTask: goalPayload => {
      dispatch(updateTask(goalPayload));
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
