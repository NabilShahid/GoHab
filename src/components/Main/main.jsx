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
        {/* <Header /> */}
        <Row>
          <Col span={5}>
            <UserTile />
            <SideMenu />
          </Col>

          <Col span={19} id="headerContainer">
            <Header heading="Home" icon="fa fa-home" />
            <div id="contentContainer">
              <Router history={history}>
                <Switch>
                  <Route path={ROUTES.HOME} component={Home} />
                  <Route path={ROUTES.TASKS} component={Tasks} />
                </Switch>
              </Router>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
  componentDidMount() {
    history.push(ROUTES.HOME);
  }
}

const mapStateToProps = state => {
  return {
    user: state.User
  };
};

const Main = compose(
  withRouter,
  withFirebase
)(MainBase);

export default connect(
  mapStateToProps,
  null
)(Main);
