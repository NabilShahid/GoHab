import React, { Component } from "react";
import { connect } from "react-redux";
import NotificationTile from "../NotificationTile/notificationtile";
import Goals from "../Goals/goals";
import Habits from "../Habits/habits";
import Tasks from "../Tasks/tasks";
import { filterGoals } from "../../actions/goalActions";
import { filterTasks } from "../../actions/taskActions";
import { filterHabits } from "../../actions/habitActions";
import { updateHeaderFilterString,updateHeaderOptions } from "../../actions/headerActions";
import { getNotificationDialogText } from "../../services/methods/ghtCommonMethods";
import {
  alphaSort,
  getDueItems
} from "../../services/methods/ghtCommonMethods.js";
import PAGEKEYS from "../../constants/pageKeys";
import HEADEROPTIONS from "../../constants/headerOptions";
import history from "../../services/history";
import ROUTES from "../../constants/routes";
import { withFirebase } from "../../services/firebase";
import { withApi } from "../../services/api";
import { Row, Col, Badge, Drawer, Input, Popover, Modal } from "antd";
import ICONS,{HEADER_ICONS_STYLES} from "../../constants/iconSvgs";
import "./header.css";
const Search = Input.Search;
class Header extends Component {
  state = {
    notificationsVisible: false,
    notificationsDialogInDom: false,
    notificationDialogVisible: false,
    notificationCount: 0,
    notifications: [],
    selectedNotificationIndex: 0,
    notificationDialogTitle: ""
  };

  searchValues(value) {
    switch (this.props.title) {
      case HEADEROPTIONS[PAGEKEYS["GOALS"]].Title: {
        this.props.filterGoals(value);
        this.props.updateHeaderFilterString(value);
        break;
      }
      case HEADEROPTIONS[PAGEKEYS["TASKS"]].Title: {
        this.props.filterTasks(value);
        this.props.updateHeaderFilterString(value);
        break;
      }
      case HEADEROPTIONS[PAGEKEYS["HABITS"]].Title: {
        this.props.filterHabits(value);
        this.props.updateHeaderFilterString(value);
        break;
      }
      default: {
      }
    }
  }
  getNotifications = () => {
    this.props.api
      .getNotifications(this.props.user.Email, "all")
      .then(result => {
        this.setState({
          notificationCount: result.length,
          notifications: result
        });
      })
      .catch(ex => {
        this.setState({ notificationCount: 0, notifications: {} });
      });
  };
  getNotificationsList = () => {
    const { notifications } = this.state;
    Object.keys(notifications);
  };
  getDueItems = () => {
    const { notifications } = this.state;
    if (notifications && notifications.length > 0)
      return notifications.map((n, i) => {
        return (
          <div
            key={i}
            onClick={() => {
              const selectedNotificationIndex = i;
              this.openNotificationItems(n.Info);
              this.setState({ selectedNotificationIndex });
            }}
          >
            <NotificationTile notificationInfo={n.Info} />
          </div>
        );
      });
    return <div>No notifications...</div>;
  };
  openNotificationItems = collection => {
    if (collection[1] != "Habits") {
      let { notificationDialogVisible, notificationsDialogInDom } = this.state;
      notificationDialogVisible = true;
      notificationsDialogInDom = true;
      let notificationDialogTitle = getNotificationDialogText(collection);
      this.setState({
        notificationDialogVisible,
        notificationsDialogInDom,
        notificationDialogTitle
      });
    } else {
      this.props.updateHeaderOptions({
        ...HEADEROPTIONS["HABIT_TRACKING"],
        SelectedMenuOption: ["HABIT_TRACKING"]
      });      
      history.push(ROUTES[PAGEKEYS["HABIT_TRACKING"]]);
    }
    this.setState({ notificationsVisible: false });
  };
  closeNotificationDialog = () => {
    this.setState({ notificationDialogVisible: false });
    setTimeout(() => {
      this.setState({ notificationsDialogInDom: false });
    }, 250);
  };
  componentWillMount() {
    this.getNotifications();
    this.listenToChanges();
  }
  listenToChanges() {
    this.props.firebase.goalOps.listenToGoalChanges(
      this.props.user.Email,
      this.getNotifications
    );
    this.props.firebase.taskOps.listenToTaskChanges(
      this.props.user.Email,
      this.getNotifications
    );
  }
  setNotificationsDialogItems = () => {
    const { notifications, selectedNotificationIndex } = this.state;
    if (notifications.length > 0) {
      if (notifications[selectedNotificationIndex].Info[1] == "Goals") {
        return (
          <Goals
            subMode={{
              ColSize: 2,
              Goals: getDueItems(
                this.props.goals,
                notifications[selectedNotificationIndex].Ids
              )
            }}
          />
        );
      } else if (notifications[selectedNotificationIndex].Info[1] == "Tasks") {
        return (
          <Tasks
            subMode={{
              ColSize: 2,
              Tasks: getDueItems(
                this.props.tasks,
                notifications[selectedNotificationIndex].Ids
              )
            }}
          />
        );
      } else if (notifications[selectedNotificationIndex].Info[1] == "Habits") {
        return (
          <Habits
            subMode={{
              ColSize: 2,
              Tasks: getDueItems(
                this.props.habits,
                notifications[selectedNotificationIndex].Ids
              )
            }}
          />
        );
      }
    }
  };
  commonIconStyles = { fill: "#6f7782", width: "30px", height: "30px", marginRight: "10px" };
  render() {
    const { search, firebase, user, flushStore } = this.props;
    const {
      notificationsDialogInDom,
      notificationDialogVisible,
      notificationsVisible,
      notificationCount,
      notificationDialogTitle
    } = this.state;
    const Icon=ICONS[this.props.icon]||(()=>{return <div></div>}); 
    const iconStyle=HEADER_ICONS_STYLES[this.props.icon];   
    return (
      <div id="headerDiv">
        <Row>
          <Col span={1} />
          <Col id="headerTitle" span={14}>
            <Icon style={{...this.commonIconStyles,...iconStyle}}/>
            {this.props.title}
          </Col>
          <Col id="headerOptions" span={6}>
            {search && (
              <Search
                id="headerSearch"
                placeholder="Search"
                value={this.props.currentFilterString}
                onChange={e => {
                  this.searchValues(e.target.value);
                }}
                style={{ width: 210 }}
              />
            )}
          </Col>

          <Col className="headerIconContainer" span={1}>
            <Badge count={notificationCount} showZero>
              <i
                onClick={() => {
                  this.setState({ notificationsVisible: true });
                }}
                className="fa fa-bell headerIcon"
                style={{ fontSize: "20px" }}
              />
            </Badge>
          </Col>

          <Col className="headerIconContainer" span={1}>
            <Popover
              placement="bottomLeft"
              // title="Change View"
              content={
                <div className="submenu">
                  <div className="submenuOption">Account Settings</div>
                  <div
                    onClick={() => {
                      firebase.authOps.doSignOut().then(() => {
                        history.push(ROUTES[PAGEKEYS["SIGNIN"]]);
                        flushStore();
                      });
                    }}
                    className="submenuOption"
                  >
                    Logout
                  </div>
                </div>
              }
              trigger="click"
            >
              <i
                onClick={() => {
                  // this.setState({ notificationsVisible: true });
                }}
                className="fa fa-cog headerIcon"
                style={{ fontSize: "22px" }}
              />
            </Popover>
          </Col>
          <Col span={1} />
        </Row>
        <Drawer
          title="Notifications"
          placement="right"
          closable={true}
          onClose={() => {
            this.setState({ notificationsVisible: false });
          }}
          visible={notificationsVisible}
        >
          {this.getDueItems()}
        </Drawer>
        {notificationsDialogInDom && (
          <Modal
            visible={notificationDialogVisible}
            width="58%"
            title={notificationDialogTitle}
            centered
            bodyStyle={{ overflowY: "auto" }}
            style={{ top: "10px" }}
            onCancel={() => {
              this.closeNotificationDialog();
            }}
            footer=""
          >
            {this.setNotificationsDialogItems()}
          </Modal>
        )}
      </div>
    );
  }
}

/**
 * state to props mapping
 */
const mapStateToProps = state => {
  return {
    title: state.headerReducer.Title,
    icon: state.headerReducer.Icon,
    search: state.headerReducer.Search,
    filter: state.headerReducer.Filter,
    currentFilterString: state.headerReducer.CurrentFilterString,
    tasks: state.taskReducer.Tasks,
    goals: state.goalReducer.Goals,
    user: state.userReducer.User
  };
};

/**
 * dispatch to props mapping
 */
const mapDispatchToProps = dispatch => {
  return {
    filterGoals: filterPayload => {
      dispatch(filterGoals(filterPayload));
    },
    filterTasks: filterPayload => {
      dispatch(filterTasks(filterPayload));
    },
    filterHabits: filterPayload => {
      dispatch(filterHabits(filterPayload));
    },
    updateHeaderFilterString: filterPayload => {
      dispatch(updateHeaderFilterString(filterPayload));
    },
    updateHeaderOptions: headerOptionsPayload => {
      dispatch(updateHeaderOptions(headerOptionsPayload));
    },
    flushStore: flush => {
      dispatch({ type: "FLUSH_STORE" });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withFirebase(withApi(Header)));
