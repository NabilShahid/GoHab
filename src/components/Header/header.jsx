import React, { Component } from "react";
import { connect } from "react-redux";
import NotificationTile from "../NotificationTile/notificationtile";
import Goals from "../Goals/goals";
import Habits from "../Habits/habits";
import Tasks from "../Tasks/tasks";
import { filterGoals } from "../../actions/goalActions";
import { filterTasks } from "../../actions/taskActions";
import { filterHabits } from "../../actions/habitActions";
import { updateFilterString } from "../../actions/headerActions";
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
import "./header.css";
const Search = Input.Search;
class Header extends Component {
  state = {
    notificationsVisible: false,
    notificationsDialogInDom: false,
    notificationDialogVisible: false,
    notificationCount: 0,
    notifications: [],
    selectedNotificationIndex:0
  };
  
  searchValues(value) {
    switch (this.props.title) {
      case HEADEROPTIONS[PAGEKEYS["GOALS"]].Title: {
        this.props.filterGoals(value);
        this.props.updateFilterString(value);
        break;
      }
      case HEADEROPTIONS[PAGEKEYS["TASKS"]].Title: {
        this.props.filterTasks(value);
        this.props.updateFilterString(value);
        break;
      }
      case HEADEROPTIONS[PAGEKEYS["HABITS"]].Title: {
        this.props.filterHabits(value);
        this.props.updateFilterString(value);
        break;
      }
      default: {
      }
    }
  }
  getNotifications = () => {
    this.props.api
      .getNotifications("nabil110176@gmail.com", "all")
      .then(result => {
        console.log(result);
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
    return notifications.map((n,i) => {
      return (
        <div key={i} onClick={()=>{
          const selectedNotificationIndex=i;
          this.openNotificationsDialog();
          this.setState({selectedNotificationIndex});
        }}>
        <NotificationTile
         
          notificationInfo={n.Info}
        />
        </div>
      );
    });
  };
  openNotificationsDialog = () => {
    let { notificationDialogVisible, notificationsDialogInDom } = this.state;
    notificationDialogVisible = true;
    notificationsDialogInDom = true;
    this.setState({ notificationDialogVisible, notificationsDialogInDom });
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
      "nabil110176@gmail.com",
      this.getNotifications
    );
  }
  setNotificationsDialogItems=()=>{
    const {notifications,selectedNotificationIndex}=this.state;
    var s=getDueItems(this.props.tasks,notifications[selectedNotificationIndex].Ids)
    console.log(s)
    if(notifications[selectedNotificationIndex].Info[1]=="Goals"){

      return(
        <Goals
        subMode={{
          ColSize: 2,
          Goals: getDueItems(this.props.goals,notifications[selectedNotificationIndex].Ids)
        }}
      />
      )
    }
    else if(notifications[selectedNotificationIndex].Info[1]=="Tasks")
    {
      console.log("Tasks")
      return(
        <Tasks
        subMode={{
          ColSize: 2,
          Tasks: getDueItems(this.props.tasks,notifications[selectedNotificationIndex].Ids)
        }}
      />
      )
    }
    else if(notifications[selectedNotificationIndex].Info[1]=="Habits")
    {

      return(
        <Habits
        subMode={{
          ColSize: 2,
          Tasks: getDueItems(this.props.habits,notifications[selectedNotificationIndex].Ids)
        }}
      />
      )
    }
   
  }
  render() {
    const { search, firebase } = this.props;
    const {
      notificationsDialogInDom,
      notificationDialogVisible,
      notificationsVisible,
      notificationCount
    } = this.state;
    return (
      <div id="headerDiv">
        <Row>
          <Col span={1} />
          <Col id="headerTitle" span={9}>
            <i className={this.props.icon} style={{ marginRight: "2%" }} />
            {this.props.title}
          </Col>
          <Col id="headerOptions" span={11}>
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
                style={{ fontSize: "22px" }}
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
                style={{ fontSize: "25px" }}
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
            title={"currentGoalOptions.name"}
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
    goals:state.goalReducer.Goals
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
    updateFilterString: filterPayload => {
      dispatch(updateFilterString(filterPayload));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withFirebase(withApi(Header)));
