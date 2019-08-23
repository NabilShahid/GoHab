import React, { Component } from "react";
import { Menu } from "antd";
import history from "../../services/history";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  updateHeaderOptions,
  updateHeaderFilterString
} from "../../actions/headerActions";
import PAGEKEYS from "../../constants/pageKeys";
import ROUTES from "../../constants/routes";
import HEADEROPTIONS from "../../constants/headerOptions";
import "./sidemenu.css";

class SideMenu extends Component {
  state = {};
  selectedOption;
  componentWillMount() {
    if (this.props.location.pathname == ROUTES[PAGEKEYS["MAIN"]]) {
      this.props.updateHeaderOptions(HEADEROPTIONS[PAGEKEYS["HOME"]]);
      this.selectedOption = [PAGEKEYS["HOME"]];
    } else {
      const currPage = Object.keys(ROUTES).filter(key => {
        return ROUTES[key] == this.props.location.pathname;
      })[0];
      this.props.updateHeaderOptions(HEADEROPTIONS[currPage]);
      this.selectedOption = [currPage];
    }
  }

  render() {
    const selectedOption =
      this.props.selectedOption.length > 0
        ? this.props.selectedOption
        : this.selectedOption;
    return (
      <Menu
        selectedKeys={selectedOption}
        // selectedKeys={}
        mode="inline"
        theme="light"
        onSelect={this.moveToPath}
      >
        <Menu.Item key={PAGEKEYS["HOME"]}>
          <i id="sHomeI" className="fa fa-home sideIcon" />
          Home
        </Menu.Item>
        <Menu.Item key={PAGEKEYS["GOALS"]} theme="filled">
          <i id="sGoalsI" className="fa fa-home sideIcon" />
          Goals
        </Menu.Item>
        <Menu.Item key={PAGEKEYS["HABITS"]} theme="filled">
          <i id="sHabitsI" className="fa fa-home sideIcon" />
          Habits
        </Menu.Item>
        <Menu.Item key={PAGEKEYS["TASKS"]} theme="filled">
          <i id="sTasksI" className="fa fa-home sideIcon" />
          Tasks
        </Menu.Item>
        <Menu.Item key={PAGEKEYS["HABIT_TRACKING"]}>
          <i className="fa fa-home sideIcon" />
          Habit Tracking
        </Menu.Item>
        <Menu.Item key={PAGEKEYS["GOAL_STATS"]}>
          <i className="fa fa-home sideIcon" />
          Goal Stats
        </Menu.Item>
        <Menu.Item key={PAGEKEYS["TASK_STATS"]}>
          <i className="fa fa-home sideIcon" />
          Task Stats
        </Menu.Item>
        <Menu.Item key={PAGEKEYS["HABIT_STATS"]}>
          <i className="fa fa-home sideIcon" />
          Habit Stats
        </Menu.Item>
        <Menu.Item key="8">
          <i className="fa fa-home sideIcon" />
          Goal Calendar
        </Menu.Item>
        <Menu.Item key={PAGEKEYS["TASK_CALENDAR"]}>
          <i className="fa fa-home sideIcon" />
          Tasks Calendar
        </Menu.Item>
        <Menu.Item key={PAGEKEYS["HABIT_CALENDAR"]}>
          <i className="fa fa-home sideIcon" />
          Habit Calendar
        </Menu.Item>
      </Menu>
    );
  }

  /**
   * open selective tab on second route
   */
  moveToPath = ({ key }) => {
    history.push(ROUTES[key]);
    this.props.updateHeaderOptions({
      ...HEADEROPTIONS[key],
      SelectedMenuOption: [key]
    });
    this.updateHeaderFilterString(key);
  };

  updateHeaderFilterString(key) {
    switch (key) {
      case PAGEKEYS["GOALS"]: {
        this.props.updateHeaderFilterString(this.props.goalFilterString);
        this.filterHeaderIfValue(this.props.goalFilterString);
        break;
      }
      case PAGEKEYS["TASKS"]: {
        this.props.updateHeaderFilterString(this.props.taskFilterString);
        this.filterHeaderIfValue(this.props.taskFilterString);
        break;
      }
      case PAGEKEYS["HABITS"]: {
        this.props.updateHeaderFilterString(this.props.habitFilterString);
        this.filterHeaderIfValue(this.props.habitFilterString);
        break;
      }
      default: {
      }
    }
  }

  filterHeaderIfValue(value) {
    if (value)
      setTimeout(() => {
        document.getElementById("headerSearch").focus();
      });
  }
}

/**
 * state to props mapping
 */
const mapStateToProps = state => {
  console.log(state);
  return {
    goalFilterString: state.goalReducer.CurrentFilterString,
    taskFilterString: state.taskReducer.CurrentFilterString,
    habitFilterString: state.habitReducer.CurrentFilterString,
    selectedOption: state.headerReducer.SelectedMenuOption
  };
};

/**
 * dispatch to props mapping for updating header
 */
const mapDispatchToProps = dispatch => {
  return {
    updateHeaderOptions: headerOptionsPayload => {
      dispatch(updateHeaderOptions(headerOptionsPayload));
    },
    updateHeaderFilterString: filterPayload => {
      dispatch(updateHeaderFilterString(filterPayload));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SideMenu));
