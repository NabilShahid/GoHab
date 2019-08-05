import React, { Component } from "react";
import ROUTES from "../../constants/routes";
import { Link } from "react-router-dom";
import Main from "../Main/main";
import Loading from "../Loading/loading";
import SignUpPage from "../SignUp/signup";
import SignInUp from "../SignInUp/signinup";
import SignOutButton from "../SignOut/signoutbutton";
import { Router, Route, Redirect, Switch } from "react-router-dom";
import { withFirebase } from "../../services/firebase";
import PasswordForgetPage from "../PasswordForget/passwordforget";
import Header from "../Header/header";
import { setUser } from "../../actions/userActions.js";
import { connect } from "react-redux";
import history from "../../services/history";
import PAGEKEYS from "../../constants/pageKeys";

import "./app.css";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userLoaded: false      
    };
  }

  render() {
    const {userLoaded}=this.state;
    return (
      <Router history={history}>
        <div className="inheritHeight">
          {/* All first level routes */}
          <Switch>
            <Route
              exact
              path="/"
              render={() => <Redirect to={ROUTES[PAGEKEYS["MAIN"]]} />}
            />
            <Route
                    
                    path={ROUTES[PAGEKEYS["MAIN"]]}
                    render={() => {
                      return !userLoaded ? (
                        <div className="mainContainerLoadingDiv">
                         <Loading/>
                        </div>
                      ) : (
                        <Main/>
                      );
                    }}
                  />
            <Route path={ROUTES[PAGEKEYS["SIGNIN"]]} component={SignInUp} />
          </Switch>
        </div>
      </Router>
    );
  }

  /**
   * componentDidMount hook. Check user session using firrebase onAuthStateChanged, updates userReducer
   */
  componentDidMount() {
    this.firebaseAuthListener = this.props.firebase.authOps.fAuth.onAuthStateChanged(
      authUser => {
        //go to signin page if no session
        if (authUser == null) {
          history.push(ROUTES[PAGEKEYS["SIGNIN"]]);
          this.setState({userLoaded:false})

        }
        else {
          let userEmail = authUser.email;          
          this.props.firebase.userOps
            .retrieveUserName(userEmail)
            .then((doc)=> {
              if (doc.exists) {
                this.props.setUser({
                  Email: userEmail,
                  Name: doc.data().UserName
                });        
                if(userEmail)this.setState({userLoaded:true});       
              } else {
                history.push(ROUTES[PAGEKEYS["SIGNIN"]]);
              }
            })
            .catch(function(error) {
              history.push(ROUTES[PAGEKEYS["SIGNIN"]]);
            });        
         
        }
      }
    );
  }

  /**
   * unsubscribes from firebase onAuthStateChanged
   */
  componentWillUnmount() {
    this.firebaseAuthListener();
  }
}

/**
 * dispatch to props mapping form updating user
 */
const mapDispatchToProps = dispatch => {
  return {
    setUser: userPayload => {
      dispatch(setUser(userPayload));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(withFirebase(App));
