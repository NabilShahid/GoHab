import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { SignUpLink } from "../SignUp/signup";
import { withFirebase } from "../../services/firebase";
import ROUTES from "../../constants/routes";
import { PasswordForgetLink } from "../PasswordForget/passwordforget";
import history from "../../services/history";
import { Card, Row, Col } from "antd";
import PAGEKEYS from "../../constants/pageKeys";
import { Button } from "antd";
import { setUser } from "../../actions/userActions.js";
import { connect } from "react-redux";
import "./signinup.css";

class SignInUp extends Component {
  state = {
    signInEmail: "",
    signInPassword: "",
    signUpEmail: "",
    signUpPassword: "",
    signUpName: "",
    error: null,
    signUpForm: false
  };

  onSignIn = event => {
    const { signInEmail, signInPassword } = this.state;
    event.preventDefault();
    this.props.firebase.authOps
      .doSignInWithEmailAndPassword(signInEmail, signInPassword)
      .then(() => {
        this.props.firebase.userOps
        .retrieveUserName(signInEmail)
        .then((doc)=> {
          console.log('doc.data() :', doc.data());
          if (doc.exists) {
            this.props.setUser({
              Email: signInEmail,
              Name: doc.data().UserName
            });               
            history.push(ROUTES[PAGEKEYS["MAIN"]]);            
          } 
        })
             
      })
      .catch(error => {
        this.setState({ error });
      });
  };
  onSignUp = event => {
    const { signUpEmail, signUpPassword, signUpName } = this.state;

    this.props.firebase.authOps
      .doCreateUserWithEmailAndPassword(signUpEmail, signUpPassword)
      .then(({ additionalUserInfo: { isNewUser } }) => {
        if (isNewUser)
          this.props.firebase.userOps
            .addUserInfo(signUpEmail, signUpName)
            .then(()=> {
              this.props.setUser({
                Email: signUpEmail,
                Name: signUpName
              });    
              history.push(ROUTES[PAGEKEYS["MAIN"]]);
            })
            .catch((error)=> {
              this.setState({ error });
            });
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      signInEmail,
      signInPassword,
      signUpEmail,
      signUpPassword,
      signUpName,
      error,
      signUpForm
    } = this.state;

    const isInvalid = signInPassword === "" || signInEmail === "";

    return (
      <React.Fragment>
        <div
          className={
            "siuContainer " + (signUpForm ? "siuRightPanelActive" : "")
          }
        >
          <div className="siuFormContainer signUpContainer">
            <form className="siuForm" onSubmit={this.onSignUp}>
              <div className="siuMainHeader">Create Account</div>
              <div className="socialContainer">
                <a href="#" className="siuSocialLink">
                  <i className="fab fa-facebook-f" />
                </a>
                <a href="#" className="siuSocialLink">
                  <i className="fab fa-google-plus-g" />
                </a>
                <a href="#" className="siuSocialLink">
                  <i className="fab fa-linkedin-in" />
                </a>
              </div>
              <span className="siuInfoText">
                or use your email for registration
              </span>
              <input
                className="siuInput"
                name="signUpName"
                value={signUpName}
                onChange={this.onChange}
                type="text"
                placeholder="Name"
              />
              <input
                className="siuInput"
                name="signUpEmail"
                value={signUpEmail}
                onChange={this.onChange}
                type="email"
                placeholder="Email"
              />
              <input
                className="siuInput"
                name="signUpPassword"
                value={signUpPassword}
                onChange={this.onChange}
                type="password"
                placeholder="Password"
              />
              {error && <p className="suiP">{error.message}</p>}

              <button className="siuButton">Sign Up</button>
            </form>
          </div>
          <div className="siuFormContainer signInContainer">
            <form className="siuForm" onSubmit={this.onSignIn}>
              <div className="siuMainHeader">Sign in</div>
              <div className="socialContainer">
                <a href="#" className="social">
                  <i className="fab fa-facebook-f" />
                </a>
                <a href="#" className="social">
                  <i className="fab fa-google-plus-g" />
                </a>
                <a href="#" className="social">
                  <i className="fab fa-linkedin-in" />
                </a>
              </div>
              <span className="siuInfoText">or use your account</span>
              <input
                className="siuInput"
                name="signInEmail"
                value={signInEmail}
                onChange={this.onChange}
                type="text"
                placeholder="Email Address"
              />
              <input
                className="siuInput"
                type="password"
                name="signInPassword"
                value={signInPassword}
                onChange={this.onChange}
                placeholder="Password"
              />
              {error && <p className="suiP">{error.message}</p>}
              <a className="siuSocialLink" href="#">
                Forgot your password?
              </a>
              <button className="siuButton">Sign In</button>
            </form>
          </div>
          <div
            className={
              "siuOverlayContainer " +
              (signUpForm ? "siuLeftDistance" : "siuRightDistance")
            }
          >
            <div className="siuOverlay">
              <div className="siuOverlayPanel siuOverlayLeft">
                <div className="siuMainHeader">Welcome Back!</div>
                <p className="siuP">
                  To keep connected with us please login with your personal info
                </p>
                <button
                  className="ghost siuButton"
                  id="signIn"
                  onClick={() => {
                    this.setState({ signUpForm: false });
                  }}
                >
                  Sign In
                </button>
              </div>
              <div className="siuOverlayPanel siuOverlayRight">
                <div className="siuMainHeader">Hello, Friend!</div>
                <p className="siuP">
                  Enter your personal details and start journey with us
                </p>
                <button
                  className="ghost siuButton"
                  id="signUp"
                  onClick={() => {
                    this.setState({ signUpForm: true });
                  }}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
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
)(withFirebase(SignInUp));

