import React, { Component } from "react";
import * as ROUTES from "../../constants/routes";
import { Link } from "react-router-dom";
import Main from "../Main/main";
import SignUpPage from "../SignUp/signup";
import SignInPage from "../SignIn/signin";
import SignOutButton from "../SignOut/signoutbutton";
import { Router, Route, Redirect,Switch } from "react-router-dom";
import { withFirebase } from "../../services/firebase";
import PasswordForgetPage from "../PasswordForget/passwordforget";
import Header from "../Header/header";
import { updateUser } from "../../actions/userActions.js";
import { connect } from "react-redux";
import history from "../../services/history";

import "./app.css";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authUser: null,
      userEmail: ""
    };
  }

  render() {
    return (
      <Router history={history}>
        <div>
          <Switch>
          <Route exact path="/" render={() => <Redirect to={ROUTES.MAIN} />} />
          <Route exact path={ROUTES.MAIN} component={Main} />
          <Route path={ROUTES.SIGNIN} component={SignInPage} />
          <Route path={ROUTES.SIGNUP} component={SignUpPage} />
          <Route component={Main} />
          </Switch>
        </div>
      </Router>
    );
  }

  componentDidMount() {
    this.listener = this.props.firebase.authOps.fAuth.onAuthStateChanged(authUser => {
      if (authUser == null) history.push(ROUTES.SIGNIN);
      else {
        let userEmail = authUser.email;
        authUser
          ? this.setState({ authUser, userEmail })
          : this.setState({ authUser: null, userEmail: "" });
        this.props.updateUser({
          UserEmail: userEmail,
          UserName: "Nabil Shahid"
        });
      }
    });
  }

  componentWillUnmount() {
    this.listener();
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateUser: userPayload => {
      dispatch(updateUser(userPayload));
    }
  };
};

const NavigationAuth = () => (
  <ul>
    <li>
      <Link to={ROUTES.SIGNIN}>Signin</Link>
    </li>
    <li>
      <Link to={ROUTES.LANDING}>Landing</Link>
    </li>
    <li>
      <Link to={ROUTES.HOME}>Home</Link>
    </li>
    <li>
      <Link to={ROUTES.SIGNUP}>Signup</Link>
    </li>
    <li>
      <SignOutButton />
    </li>
  </ul>
);

const NavigationNonAuth = () => (
  <ul>
    <li>
      <Link to={ROUTES.SIGNIN}>Signin</Link>
    </li>

    <li>
      <Link to={ROUTES.SIGNUP}>Signup</Link>
    </li>
  </ul>
);

export default connect(
  null,
  mapDispatchToProps
)(withFirebase(App));
