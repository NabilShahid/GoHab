import React, { Component } from "react";
import { FirebaseContext } from "../../services/firebase";
import { withFirebase } from "../../services/firebase";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { Router, Route, Redirect, Switch } from "react-router-dom";
import SignOutButton from "../SignOut/signoutbutton";
import SideMenu from "../SideMenu/sidemenu";
import { connect } from "react-redux";
import Header from "../Header/header";
import {
  insertGoals,
  sortGoals,
  updateSubItemsCount
} from "../../actions/goalActions";
import { insertTasks, sortTasks } from "../../actions/taskActions";
import { insertHabits, sortHabits } from "../../actions/habitActions";
import { toggleItemLoading } from "../../actions/loadingActions";
import { Row, Col, Icon } from "antd";
import UserTile from "../UserTile/usertile";
import Home from "../Home/home";
import Tasks from "../Tasks/tasks";
import Goals from "../Goals/goals";
import Habits from "../Habits/habits";
import HabitTracking from "../HabitTracking/habittracking";
import HabitCalendar from "../HabitCalendar/habitcalendar";
import TaskCalendar from "../TaskCalendar/taskcalendar";
import GoalStats from "../GoalStats/goalstats";
import TaskStats from "../TaskStats/taskstats";
import HabitStats from "../HabitStats/habitstats";
import history from "../../services/history";
import ROUTES from "../../constants/routes";
import PAGEKEYS from "../../constants/pageKeys";
import Loading from "../Loading/loading";
import "./main.css";

class MainBase extends Component {
  state = { menuShown: true, menuWidth: "20%" };
  toggleMenu = () => {
    const { menuShown } = this.state;
    this.setState({ menuShown: !menuShown });
  };

  render() {
    const { menuShown, menuWidth } = this.state;
    const { goalsLoading, habitsLoading, tasksLoading } = this.props;
    return (
      <div className="inheritHeight">
        <div className="inheritHeight" style={{ display: "flex" }}>
          <div
            id="sideContainer"
            className={"inheritHeight " + (menuShown ? "" : "hiddenMenu")}
            style={{ width: menuShown ? menuWidth : "0" }}
          >
            {menuShown && (
              <div onClick={this.toggleMenu} className="menuShown">
                <Icon type="menu-fold" style={{color:"white", fontSize:"17px"}}/>
              </div>
            )}
            <UserTile toggleMenu={this.toggleMenu} menuShown={menuShown} />
            <SideMenu />
            <div id="sideBottomDiv">Hello</div>
          </div>

          <div id="mainContainer" className="inheritHeight">
            {!menuShown && (
              <div onClick={this.toggleMenu} className="menuCollapsed">
                <Icon type="menu-unfold" style={{color:"#4c4c4c", fontSize:"17px"}}/>
              </div>
            )}
            <div id="headerContainer">
              <Header />
            </div>
            <div id="bodyContainer">
              {/* Second level routes */}

              <Router history={history}>
                <Switch>
                  <Route
                    exact
                    path={ROUTES[PAGEKEYS["MAIN"]]}
                    render={() => <Redirect to={ROUTES[PAGEKEYS["HOME"]]} />}
                  />
                  <Route
                    exact
                    path={ROUTES[PAGEKEYS["HOME"]]}
                    component={Home}
                  />
                  <Route
                    exact
                    path={ROUTES[PAGEKEYS["GOALS"]]}
                    render={() => {
                      return goalsLoading ? (
                        <div className="mainContainerLoadingDiv">
                          <Loading />
                        </div>
                      ) : (
                        <Goals />
                      );
                    }}
                  />
                  <Route
                    exact
                    path={ROUTES[PAGEKEYS["HABITS"]]}
                    render={() => {
                      return habitsLoading ? (
                        <div className="mainContainerLoadingDiv">
                          <Loading />
                        </div>
                      ) : (
                        <Habits />
                      );
                    }}
                  />

                  <Route
                    exact
                    path={ROUTES[PAGEKEYS["TASKS"]]}
                    render={() => {
                      return tasksLoading ? (
                        <div className="mainContainerLoadingDiv">
                          <Loading />
                        </div>
                      ) : (
                        <Tasks />
                      );
                    }}
                  />
                  <Route
                    exact
                    path={ROUTES[PAGEKEYS["HABIT_TRACKING"]]}
                    render={() => {
                      return habitsLoading ? (
                        <div className="mainContainerLoadingDiv">
                          <Loading />
                        </div>
                      ) : (
                        <HabitTracking />
                      );
                    }}
                  />
                  <Route
                    exact
                    path={ROUTES[PAGEKEYS["HABIT_CALENDAR"]]}
                    render={() => {
                      return habitsLoading ? (
                        <div className="mainContainerLoadingDiv">
                          <Loading />
                        </div>
                      ) : (
                        <HabitCalendar />
                      );
                    }}
                  />
                  <Route
                    exact
                    path={ROUTES[PAGEKEYS["TASK_CALENDAR"]]}
                    render={() => {
                      return tasksLoading ? (
                        <div className="mainContainerLoadingDiv">
                          <Loading />
                        </div>
                      ) : (
                        <TaskCalendar />
                      );
                    }}
                  />
                  <Route
                    exact
                    path={ROUTES[PAGEKEYS["GOAL_STATS"]]}
                    render={() => {
                      return goalsLoading ? (
                        <div className="mainContainerLoadingDiv">
                          <Loading />
                        </div>
                      ) : (
                        <GoalStats />
                      );
                    }}
                  />
                  <Route
                    exact
                    path={ROUTES[PAGEKEYS["TASK_STATS"]]}
                    render={() => {
                      return tasksLoading ? (
                        <div className="mainContainerLoadingDiv">
                          <Loading />
                        </div>
                      ) : (
                        <TaskStats />
                      );
                    }}
                  />
                  <Route
                    exact
                    path={ROUTES[PAGEKEYS["HABIT_STATS"]]}
                    render={() => {
                      return habitsLoading ? (
                        <div className="mainContainerLoadingDiv">
                          <Loading />
                        </div>
                      ) : (
                        <HabitStats />
                      );
                    }}
                  />
                </Switch>
              </Router>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /**
   * set initial route to home to show home tab by default
   */
  componentDidMount() {
    this.getGoalsAndInsertAndSort();
    this.getTasksAndInsertAndSort();
    this.getHabitsAndInsertAndSort();
    this.adjustMenuForDevice();
    window.onresize = () => {
      this.adjustMenuForDevice();
    };
  }

  getGoalsAndInsertAndSort() {
    this.props.toggleItemLoading("goalsLoading", true);
    this.props.firebase.goalOps
      .retrieveAllGoals(this.props.userEmail)
      .then(querySnapshot => {
        this.props.toggleItemLoading("goalsLoading", false);
        const allGoals = querySnapshot.docs.map(function(doc) {
          return { ...doc.data(), id: doc.id };
        });
        this.props.insertGoals(allGoals);
        this.props.sortGoals({ orderBy: "alphabetical" });
      })
      .catch(error => {
        console.log("firebase error: ", error);
      });
  }

  getTasksAndInsertAndSort() {
    this.props.toggleItemLoading("tasksLoading", true);
    this.props.firebase.taskOps
      .retrieveAllTasks(this.props.userEmail)
      .then(querySnapshot => {
        this.props.toggleItemLoading("tasksLoading", false);
        const allTasks = querySnapshot.docs.map(function(doc) {
          return { ...doc.data(), id: doc.id };
        });
        this.props.insertTasks(allTasks);
        this.props.sortTasks({ orderBy: "alphabetical" });
        this.props.updateSubItemsCount({
          items: allTasks,
          goalId: false,
          filterGoals: false,
          itemName: "subTasks"
        });
      })
      .catch(error => {
        console.log("firebase error: ", error);
      });
  }

  getHabitsAndInsertAndSort() {
    this.props.toggleItemLoading("habitsLoading", true);
    this.props.firebase.habitOps
      .retrieveAllHabits(this.props.userEmail)
      .then(querySnapshot => {
        this.props.toggleItemLoading("habitsLoading", false);
        const allHabits = querySnapshot.docs.map(function(doc) {
          return { ...doc.data(), id: doc.id };
        });
        this.props.insertHabits(allHabits);
        this.props.sortHabits({ orderBy: "alphabetical" });
        this.props.updateSubItemsCount({
          items: allHabits,
          goalId: false,
          filterGoals: false,
          itemName: "subHabits"
        });
      })
      .catch(error => {
        console.log("firebase error: ", error);
      });
  }

  checkIfSmallDevice() {
    return (
      getComputedStyle(document.getElementById("sideContainer")).position ==
      "absolute"
    );
  }

  adjustMenuForDevice() {
    if (this.checkIfSmallDevice()) {
      this.setState({ menuShown: false, menuWidth: "70%" });
    } else this.setState({ menuShown: true, menuWidth: "20%" });
  }
}

/**
 * state to props mapping for accessing user form user reducer
 */
const mapStateToProps = state => {
  return {
    user: state.User,
    goalsLoading: state.loadingReducer.goalsLoading,
    habitsLoading: state.loadingReducer.habitsLoading,
    tasksLoading: state.loadingReducer.tasksLoading,
    userEmail: state.userReducer.User.Email
  };
};

/*
 * dispatch to props mapping form updating user
 */
const mapDispatchToProps = dispatch => {
  return {
    insertGoals: goalsPayload => {
      dispatch(insertGoals(goalsPayload));
    },
    sortGoals: sortPayload => {
      dispatch(sortGoals(sortPayload));
    },
    insertTasks: goalsPayload => {
      dispatch(insertTasks(goalsPayload));
    },
    sortTasks: sortPayload => {
      dispatch(sortTasks(sortPayload));
    },
    insertHabits: habitsPayload => {
      dispatch(insertHabits(habitsPayload));
    },
    sortHabits: sortPayload => {
      dispatch(sortHabits(sortPayload));
    },
    updateSubItemsCount: itemsPayload => {
      dispatch(updateSubItemsCount(itemsPayload));
    },
    toggleItemLoading: (item, loading) => {
      dispatch(toggleItemLoading(item, loading));
    }
  };
};

/**
 * compose router and firebase for accessing history and firebase via props
 */
const Main = compose(
  withRouter,
  withFirebase
)(MainBase);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
