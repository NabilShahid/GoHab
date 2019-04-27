import React, { Component } from "react";
import ROUTES from "../../constants/routes";
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
import PAGEKEYS from "../../constants/pageKeys";

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
        <div className="inheritHeight">
          {/* All first level routes */}
          <Switch>
          <Route exact path="/" render={() => <Redirect to={ROUTES[PAGEKEYS["MAIN"]]} />} />
          <Route path={ROUTES[PAGEKEYS["MAIN"]]} component={Main} />
          <Route path={ROUTES[PAGEKEYS["SIGNIN"]]} component={SignInPage} />
           </Switch>
        </div>
      </Router>
    );
  }


  /**
   * componentDidMount hook. Check user session using firrebase onAuthStateChanged, updates userReducer
   */
  componentDidMount() {
    this.listener = this.props.firebase.authOps.fAuth.onAuthStateChanged(authUser => {
      //go to signin page if no session
      if (authUser == null) history.push(ROUTES[PAGEKEYS["SIGNIN"]]);
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

  /**
   * unsubscribes from firebase onAuthStateChanged
   */
  componentWillUnmount() {
    this.listener();
  }
}

/**
 * dispatch to props mapping form updating user
 */
const mapDispatchToProps = dispatch => {
  return {
    updateUser: userPayload => {
      dispatch(updateUser(userPayload));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(withFirebase(App));
