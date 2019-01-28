import React, { Component } from "react";
import * as ROUTES from "../../constants/routes";
import { Link } from "react-router-dom";
import Main from "../Main/main";
import SignUpPage from "../SignUp/signup";
import SignInPage from "../SignIn/signin";
import SignOutButton from "../SignOut/signoutbutton";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { withFirebase } from '../../services/firebase';
import PasswordForgetPage from '../PasswordForget/passwordforget'
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
      userEmail:''
    };
  }

  render() {
    return (
      <Router>
        <div>
          <div>Welcome {this.state.userEmail}</div>
          {this.state.authUser ? <NavigationAuth /> : <NavigationNonAuth />}
          <Route exact path={ROUTES.HOME} component={Main} />
          <Route path={ROUTES.PASSWORD_FORGET} render={(props) => <PasswordForgetPage {...props}/> } />
          <Route path={ROUTES.SIGNIN} component={SignInPage} />
          <Route path={ROUTES.SIGNUP} component={SignUpPage} />
        </div>
      </Router>
    );
  }

  componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
      let userEmail=authUser.email;
      authUser
        ? this.setState({ authUser,userEmail })
        : this.setState({ authUser: null, userEmail:"" });
        
    });
  }

  componentWillUnmount() {
    this.listener();
  }
}

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

export default withFirebase(App);
