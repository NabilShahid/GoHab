import React, { Component } from "react";
import GoalCard from "../GoalCard/goalcard";
import CreateGoalForm from "../CreateGoalForm/creategoalform";
import { withFirebase } from "../../services/firebase/context";
import unmarkedIcon from "../../assets/images/4ad49ce59d.svg";
import {
  updateGoal,
  sortGoals,
  filterGoalsByStatus
} from "../../actions/goalActions";
import { connect } from "react-redux";
import { Modal, Tabs, Radio, Row, Col, message, Popover } from "antd";
import "./goals.css";
import { Select } from "antd";

const Option = Select.Option;
const TabPane = Tabs.TabPane;

class Goals extends Component {
  state = {
    goalDialogInDom: false,
    goalDialogVisible: false,
    currentGoalOptions: {}
  };
  changeOrder() {
    let { order, orderBy } = this.props;
    if (order == "asc") order = "desc";
    else order = "asc";
    this.props.sortGoals({ order, orderBy });
  }
  changeOrderBy(v) {
    const orderBy = v;
    this.props.sortGoals({ order: this.props.order, orderBy });
  }
  changeGoalsStatus(v) {
    this.props.filterGoalsByStatus(v);
  }
  render() {
    const {
      goalDialogInDom,
      goalDialogVisible,
      currentGoalOptions
    } = this.state;
    const { statusFilter, orderBy, order, filterVisible } = this.props;
    return (
      <div id="goalCardsDiv">
        <div className="row">
          <div className="col-md-8" />
          <div className="col-md-4">
            <div
              className="filterPopup"
              style={{ display: filterVisible ? "block" : "none" }}
            >
              <div className="filterPopupHeader">Filters</div>
              <div className="row">
                <div className="col-md-12">
                  <Radio.Group
                    value={statusFilter}
                    buttonStyle="solid"
                    size="small"
                    onChange={e => {
                      this.changeGoalsStatus(e.target.value);
                    }}
                  >
                    <Radio.Button value="all">All Goals</Radio.Button>
                    <Radio.Button value="completed">
                      Achieved Goals
                    </Radio.Button>
                    <Radio.Button value="pending">Pending Goals</Radio.Button>
                  </Radio.Group>
                </div>
              </div>
              <div className="row" style={{ marginTop: "10px" }}>
                <div className="col-md-2">Sort</div>
                <div className="col-md-10">
                  <Select
                    onChange={e => this.changeOrderBy(e)}
                    value={orderBy}
                    size="small"
                    style={{ width: "100%" }}
                  >
                    <Option value="dueDate">Due Date</Option>
                    {statusFilter == "all" && (
                      <Option value="progress">Progress</Option>
                    )}
                    <Option value="importance">Importance</Option>
                    <Option value="alphabetical">Alphabetical</Option>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <img src={unmarkedIcon}/> */}
        {/* <Row />
          <Row>
            <Col span={11}>
              <Radio.Group value={statusFilter} size="small" buttonStyle="solid" onChange={e=>{this.changeGoalsStatus(e.target.value)}}>
                <Radio.Button value="all">All Goals</Radio.Button>
                <Radio.Button value="completed">Achieved Goals</Radio.Button>
                <Radio.Button value="pending">Pending Goals</Radio.Button>
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
                {statusFilter=="all"&&<Option value="progress">Progress</Option>}
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
          </Row> */}
        <div className="actualCardsDiv">
          {this.getGoalRows(this.props.goals, 3)}
        </div>
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
            <Tabs defaultActiveKey="1" tabPosition="left">
              <TabPane tab="Goal Info" key="1">
                <div className="gTabContent">{this.currentGoalDialog()}</div>
              </TabPane>
              <TabPane tab="Sub Habits" key="2">
                <div className="gTabContent" />
              </TabPane>
              <TabPane tab="Sub Tasks" key="3">
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
    setTimeout(() => {
      if (this.props.statusFilter != "all") {
        this.changeGoalsStatus(this.props.statusFilter);
      } else {
        this.changeOrderBy(this.props.orderBy);
      }
    }, 1500);
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
          <div className="row" style={{ marginTop: "15px" }} key={i}>
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
            importance={r.importance}
            asscTasks="3"
            asscHabits="5"
            id={r.id}
            markGoal={this.markGoal}
          />
        </div>
      );
    });
  }

  markGoal = id => {
    let currGoal = this.props.goals.find(v => v.id == id);
    if (currGoal.progress == 100) currGoal.progress = 0;
    else {
      currGoal.progress = 100;
      message.success(`Marked ${currGoal.name} as achieved!`);
    }
    this.updateLocalGoal(currGoal);
    this.props.firebase.goalOps
      .updateGoal("nabil110176@gmail.com", currGoal, id)
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
    order: state.goalReducer.CurrentOrder,
    orderBy: state.goalReducer.CurrentOrderBy,
    filterVisible: state.goalReducer.FilterMenuVisible
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
