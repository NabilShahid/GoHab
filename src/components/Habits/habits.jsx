import React, { Component } from "react";
import { Modal, Radio, Row, Col, Select, message, Button, Popover, Tooltip } from "antd";
import { connect } from "react-redux";
import { withFirebase } from "../../services/firebase/context";
import BucketList from "../BucketList/bucketlist";
import {
  updateHabit,
  sortHabits,
  filterHabitsByStatus,
  changeHabitsViewType
} from "../../actions/habitActions";
import HabitCard from "../HabitCard/habitcard";
import CreateHabitForm from "../CreateHabitForm/createhabitform";
import "./habits.css";
const Option = Select.Option;
class Habits extends Component {
  state = {
    habitDialogInDom: false,
    habitDialogVisible: false,
    currentHabitOptions: {},
    habitViewMode: "view",
    habitDialogTitle: ""
  };

  changeOrderBy(v) {
    const orderBy = v;
    this.props.sortHabits({ orderBy });
  }
  changeHabitsStatus(v) {
    this.props.filterHabitsByStatus(v);
  } 

  changeViewType(v) {
    this.props.changeHabitsViewType();
  }
  render() {
    const {
      habitDialogInDom,
      habitDialogVisible,
      currentHabitOptions,
      habitViewMode,
      habitDialogTitle
      
    } = this.state;
    const { statusFilter ,orderBy, viewTypeFilter } = this.props;
    return (
      <div id="habitCardsDiv">
        <div className="row cardsViewSelector">
          <div className="col-md-6" style={{ padding: 0 }}>
            <Button
              type="primary"
              className="noColorButton"
              style={{ background: "var(--habit-color)" }}
              onClick={()=>this.viewHabitDialog(false,false)}
            >
              <i className="fa fa-plus" style={{ marginRight: "10px" }} />
              Add Habit
            </Button>
          </div>
          
          <div className="col-md-6 cardsFilterIconContainer">
            <Popover
              placement="bottomLeft"
              title="Change View"
              content={
                <div>
                  <div className="cardFilterLabel">Habits View:</div>
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

                  <div className="cardFilterLabel">Show Habits:</div>
                  <div>
                    <Radio.Group
                      value={statusFilter}
                      buttonStyle="solid"
                      size="small"
                      onChange={e => {
                        this.changeHabitsStatus(e.target.value);
                      }}
                    >
                      <Radio.Button value="all">All</Radio.Button>
                      <Radio.Button value="pending">Following</Radio.Button>
                      <Radio.Button value="completed">Not Following</Radio.Button>
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
                style={{ color: "#17bcd0" }}
              />
            </Tooltip>
              
            </Popover>
          </div>
        </div>
       
        {viewTypeFilter === "bucket" ? (
          <BucketList
            items={this.props.habits}
            lists={this.props.goalNamesAndIDs}
            openDialog={this.viewHabitDialog}
            markItem={this.markHabit}
          />
        ) : (
          <div className="actualCardsDiv">
            {this.getHabitsRows(this.props.habits, 3)}
          </div>
        )}

        {habitDialogInDom && (
          <Modal
            visible={habitDialogVisible}
            width="53%"
            title={habitDialogTitle}
            centered
            bodyStyle={{ overflowY: "auto" }}
            style={{ top: "10px" }}
            onCancel={() => {
              this.closeHabitDialog();
            }}
            footer=""
          >
            <CreateHabitForm
              mode={habitViewMode}
              name={currentHabitOptions.name}
              description={currentHabitOptions.description}
              dueDate={currentHabitOptions.dueDate}
              id={currentHabitOptions.id}
              importance={currentHabitOptions.importance}
              parentGoal={currentHabitOptions.parentGoal}
              closeAndUpdate={this.updateLocalHabit}
              close={this.closeHabitDialog}
            />
          </Modal>
        )}
      </div>
    );
  }

  viewHabitDialog = (habit, parentGoal) => {
    const habitViewMode = habit ? "view" : "add";
    const habitDialogTitle = habit ? habit.name : "Create Habit";
    let { habitDialogVisible, habitDialogInDom } = this.state;
    const currentHabitOptions = { ...habit };
    if (parentGoal) currentHabitOptions.parentGoal = parentGoal;
    habitDialogInDom = true;
    habitDialogVisible = true;
    this.setState({
      habitDialogVisible,
      habitDialogInDom,
      currentHabitOptions,
      habitViewMode,
      habitDialogTitle
    });
  };

  closeHabitDialog = () => {
    this.setState({ habitDialogVisible: false });
    setTimeout(() => {
      this.setState({ habitDialogInDom: false });
    }, 250);
  };

  updateLocalHabit = habits => {
    this.props.updateHabit(habits);
    this.closeHabitDialog();
    setTimeout(() => {
      if (this.props.statusFilter != "all") {
        this.changeHabitsStatus(this.props.statusFilter);

        this.changeOrderBy(this.props.orderBy);
      }
    }, 1500);
  };

  /**
   *returns rows of tasks, each row containing 1 to 3 cols if available
   */
  getHabitsRows(habits, colSize) {
    let habitRows = [];
    for (let i = 0; i < habits.length; i += 3) {
      if (habits[i]) {
        const habitRowArray = [];
        for (let j = 0; j < colSize; j++) {
          if (habits[i + j]) habitRowArray.push(habits[i + j]);
        }

        habitRows.push(
          <div className="row" style={{ marginTop: "15px" }} key={i}>
            {this.getHabitCols(habitRowArray, i)}
          </div>
        );
      }
    }
    return habitRows;
  }

  getHabitCols(rowArray, rowindex) {
    let cellClass = "col-md-4";
    if (rowindex > 0) cellClass += " habitsRow";
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
            completed={r.completed}
            importance={r.importance}
            markHabit={this.markHabit}
            id={r.id}
          />
        </div>
      );
    });
  }

  markHabit = id => {
    let currHabit = this.props.habits.find(v => v.id == id);
    if (currHabit.completed) currHabit.completed = false;
    else {
      currHabit.completed = true;
      message.success(`Marked ${currHabit.name} as completed!`);
    }
    this.updateLocalHabit(currHabit);

    this.props.firebase.habitOps
      .updateHabit("nabil110176@gmail.com", currHabit, id)
      .then(() => {})
      .catch(error => {
        console.error("Error writing document: ", error);
      });
  };
}
const mapStateToProps = state => {
  return {
    habits: state.habitReducer.FilteredHabits,
    statusFilter: state.habitReducer.CurrentStatusFilter,
    orderBy: state.habitReducer.CurrentOrderBy,
    goalNamesAndIDs: state.goalReducer.SortedGoalNamesAndIDs,
    viewTypeFilter:state.habitReducer.CurrentViewType
  };
};

/**
 * dispatch to props mapping form updating user
 */
const mapDispatchToProps = dispatch => {
  return {
    updateHabit: habitPayload => {
      dispatch(updateHabit(habitPayload));
    },
    sortHabits: habitPayload => {
      dispatch(sortHabits(habitPayload));
    },
    filterHabitsByStatus: statusPayload => {
      dispatch(filterHabitsByStatus(statusPayload));
    },
    changeHabitsViewType: statusPayload => {
      dispatch(changeHabitsViewType(statusPayload));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withFirebase(Habits));
