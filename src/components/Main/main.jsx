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
import { Row, Col } from "antd";
import UserTile from "../UserTile/usertile";
import Home from "../Home/home";
import Tasks from "../Tasks/tasks";
import Goals from "../Goals/goals";
import Habits from "../Habits/habits";
import history from "../../services/history";
import ROUTES from "../../constants/routes";
import PAGEKEYS from "../../constants/pageKeys";
import Loading from "../Loading/loading";
import "./main.css";

class MainBase extends Component {
  state = {};
  render() {
    const { goalsLoading } = this.props;
    return (
      <div className="inheritHeight">
        <div className="inheritHeight" style={{ display: "flex" }}>
          <div id="sideContainer" className="inheritHeight">
            <UserTile />
            <SideMenu />
          </div>

          <div id="mainContainer" className="inheritHeight">
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
                      return goalsLoading ? (
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
                      return goalsLoading ? (
                        <div className="mainContainerLoadingDiv">
                          <Loading />
                        </div>
                      ) : (
                        <Tasks />
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
  }

  getGoalsAndInsertAndSort() {
    this.props.toggleItemLoading("goalsLoading",true);
    this.props.firebase.goalOps
      .retrieveAllGoals("nabil110176@gmail.com")
      .then(querySnapshot => {
        this.props.toggleItemLoading("goalsLoading",false);
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
    this.props.toggleItemLoading("tasksLoading",true);
    this.props.firebase.taskOps
      .retrieveAllTasks("nabil110176@gmail.com")
      .then(querySnapshot => {
        this.props.toggleItemLoading("tasksLoading",false);
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
    this.props.toggleItemLoading("habitsLoading",true);
    this.props.firebase.habitOps
      .retrieveAllHabits("nabil110176@gmail.com")
      .then(querySnapshot => {
        this.props.toggleItemLoading("habitsLoading",false);
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
}

/**
 * state to props mapping for accessing user form user reducer
 */
const mapStateToProps = state => {
  return {
    user: state.User,
    goalsLoading: state.loadingReducer.goalsLoading
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
    toggleItemLoading: (item,loading) => {
      dispatch(toggleItemLoading(item,loading));
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
