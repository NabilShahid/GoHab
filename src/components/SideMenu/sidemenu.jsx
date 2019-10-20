import React, { Component } from "react";
import { Menu, Icon } from "antd";
import history from "../../services/history";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  updateHeaderOptions,
  updateHeaderFilterString
} from "../../actions/headerActions";
import PAGEKEYS from "../../constants/pageKeys";
import ROUTES from "../../constants/routes";
import { MENU_MAPPING } from "../../constants/commonConsts";
import HEADEROPTIONS from "../../constants/headerOptions";
import "./sidemenu.css";
import ICONS from "../../constants/iconSvgs";
const { SubMenu } = Menu;

class SideMenu extends Component {
  selectedOption;
  defaultOpenMenu = "ItemsMenu";
  iconsStyles = {
    fill: "#6f7782",
    width: "20px",
    height: "20px",
    marginRight: "10px"
  };
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
      this.defaultOpenMenu =
        Object.keys(MENU_MAPPING).find(
          (curr, i) => MENU_MAPPING[curr].indexOf(currPage) > -1
        ) || this.defaultOpenMenu;
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
        defaultOpenKeys={[this.defaultOpenMenu]}
        // selectedKeys={}
        mode="inline"
        theme="light"
        onSelect={this.moveToPath}
      >
        <Menu.Item key={PAGEKEYS["HOME"]}>
          <ICONS.Home style={this.iconsStyles} />
          Home
        </Menu.Item>
        <SubMenu
          key="ItemsMenu"
          title={
            <span>
              {/* <Icon type="mail" /> */}
              <ICONS.Items style={this.iconsStyles} />
              <span>Items</span>
            </span>
          }
        >
          <Menu.Item key={PAGEKEYS["GOALS"]} theme="filled">
            <ICONS.Goal style={{ ...this.iconsStyles, width: "24px" }} />
            Goals
          </Menu.Item>
          <Menu.Item key={PAGEKEYS["HABITS"]} theme="filled">
            <ICONS.Habit style={this.iconsStyles} />
            Habits
          </Menu.Item>
          <Menu.Item key={PAGEKEYS["TASKS"]} theme="filled">
            <ICONS.Task style={this.iconsStyles} />
            Tasks
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key="AnalyticsMenu"
          title={
            <span>
              <ICONS.Analytics style={this.iconsStyles} />
              <span>Analytics</span>
            </span>
          }
        >
          <Menu.Item key={PAGEKEYS["GOAL_STATS"]}>
            <ICONS.Goal style={{ ...this.iconsStyles, width: "24px" }} />
            Goal Stats
          </Menu.Item>

          <Menu.Item key={PAGEKEYS["HABIT_STATS"]}>
            <ICONS.Habit style={this.iconsStyles} />
            Habit Stats
          </Menu.Item>
          <Menu.Item key={PAGEKEYS["TASK_STATS"]}>
            <ICONS.Task style={this.iconsStyles} />
            Task Stats
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key="HabitTrackingMenu"
          title={
            <span>
              <Icon type="mail" />
              <span>Habit Tracking</span>
            </span>
          }
        >
          <Menu.Item key={PAGEKEYS["HABIT_TRACKING"]}>
            <i className="fa fa-home sideIcon" />
            Track Habits
          </Menu.Item>
          <Menu.Item key={PAGEKEYS["HABIT_CALENDAR"]}>
            <i className="fa fa-home sideIcon" />
            Habits Record
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key="CalendarMenu"
          title={
            <span>
              <Icon type="mail" />
              <span>Calendar</span>
            </span>
          }
        >
          <Menu.Item key="8">
            <i className="fa fa-home sideIcon" />
            Goal Calendar
          </Menu.Item>
          <Menu.Item key={PAGEKEYS["TASK_CALENDAR"]}>
            <i className="fa fa-home sideIcon" />
            Tasks Calendar
          </Menu.Item>
        </SubMenu>
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
