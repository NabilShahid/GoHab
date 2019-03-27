import React, { Component } from "react";
import { Menu, Icon } from "antd";
import history from "../../services/history";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { updateHeader, updateFilterString } from "../../actions/headerActions";
import { removeGoalFilter } from "../../actions/goalActions";
import PAGEKEYS from "../../constants/pageKeys";
import ROUTES from "../../constants/routes";
import HEADEROPTIONS from "../../constants/headerOptions";
import "./sidemenu.css";

class SideMenu extends Component {
  state = {};
  selectedOption;
  componentWillMount() {
    if (this.props.location.pathname == ROUTES[PAGEKEYS["MAIN"]]) {
      this.props.updateHeader(HEADEROPTIONS[PAGEKEYS["HOME"]]);
      this.selectedOption = [PAGEKEYS["HOME"]];
    } else {
      const currPage = Object.keys(ROUTES).filter(key => {
        return ROUTES[key] == this.props.location.pathname;
      })[0];
      this.props.updateHeader(HEADEROPTIONS[currPage]);
      this.selectedOption = [currPage];
    }
  }

  render() {
    return (
      <Menu
        defaultSelectedKeys={this.selectedOption}
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
        <Menu.Item key="goalTree">
          <i className="fa fa-home sideIcon" />
          Goal Tree
        </Menu.Item>
        <Menu.Item key="habitCalendar">
          <i className="fa fa-home sideIcon" />
          Habit Calendar
        </Menu.Item>
        <Menu.Item key="habitStats">
          <i className="fa fa-home sideIcon" />
          Habit Stats
        </Menu.Item>
        <Menu.Item key="taskStats">
          <i className="fa fa-home sideIcon" />
          Task Stats
        </Menu.Item>
        <Menu.Item key="8">
          <i className="fa fa-home sideIcon" />
          Goal Progress
        </Menu.Item>
        <Menu.Item key="habitTracking">
          <i className="fa fa-home sideIcon" />
          Habit Tracking
        </Menu.Item>
        <Menu.Item key="taskManaging">
          <i className="fa fa-home sideIcon" />
          Task Managing
        </Menu.Item>
      </Menu>
    );
  }

  /**
   * open selective tab on second route
   */
  moveToPath = ({ key }) => {
    history.push(ROUTES[key]);
    this.props.updateHeader(HEADEROPTIONS[key]);
    // key==PAGEKEYS["HOME"]&&this.props.removeGoalFilter();
    this.updateHeaderFilterString(key);
  };

  updateHeaderFilterString(key) {
    switch (key) {
      case PAGEKEYS["GOALS"]: {
        this.props.updateFilterString(this.props.goalFilterString);
        this.filterHeaderIfValue(this.props.goalFilterString);
        break;
      }
      case PAGEKEYS["TASKS"]: {
        this.props.updateFilterString(this.props.taskFilterString);
        this.filterHeaderIfValue(this.props.taskFilterString);
        break;
      }
    }
  }

  filterHeaderIfValue(value) {
    if (value)
      setTimeout(()=>{
        document.getElementById("headerSearch").focus();
      });
  }
}

/**
 * state to props mapping
 */
const mapStateToProps = state => {
  return {
    goalFilterString: state.goalReducer.CurrentFilterString,
    taskFilterString: state.taskReducer.CurrentFilterString
  };
};

/**
 * dispatch to props mapping for updating header
 */
const mapDispatchToProps = dispatch => {
  return {
    updateHeader: headerPayload => {
      dispatch(updateHeader(headerPayload));
    },
    updateFilterString: filterPayload => {
      dispatch(updateFilterString(filterPayload));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SideMenu));
