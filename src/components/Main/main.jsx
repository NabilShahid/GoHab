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
import { Row, Col } from "antd";
import UserTile from "../UserTile/usertile";
import Home from "../Home/home";
import Tasks from "../Tasks/tasks";
import Goals from "../Goals/goals";
import history from "../../services/history";
import * as ROUTES from "../../constants/routes";
import MENUOPTIONS from "../../constants/menuOptions";
import "./main.css";
import "font-awesome/css/font-awesome.min.css";

class MainBase extends Component {
  state = {};
  render() {
    return (
      <div>        
        <Row>
          <Col span={5}>
            <UserTile />
            <SideMenu />
          </Col>

          <Col span={19} id="headerContainer">
            <Header heading="Home" icon="fa fa-home" />
            <div id="contentContainer">
             {/* Second level routes */}
              <Router history={history}>
                <Switch>
                  <Route path={ROUTES.HOME} component={Home} />
                  <Route path={ROUTES.TASKS} component={Tasks} />
                  <Route path={ROUTES.GOALS} component={Goals} />
                </Switch>
              </Router>
            </div>
          </Col>
        </Row>
      </div>
    );
  }

  /**
   * set initial route to home to show home tab by default
   */
  componentDidMount() {
    history.push(ROUTES.HOME);
  }
}

/**
 * state to props mapping for accessing user form user reducer  
 */
const mapStateToProps = state => {
  return {
    user: state.User
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
  null
)(Main);
