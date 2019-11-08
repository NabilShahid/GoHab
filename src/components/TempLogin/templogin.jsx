import React, { Component } from "react";
import "./templogin.css";
import bgImage from "../../assets/images/bg-01.jpg";
import fbLogin from "../../assets/images/fblogin.png";
import gLogin from "../../assets/images/glogin.png";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { SignUpLink } from "../SignUp/signup";
import Loading from "../Loading/loading";
import { withFirebase } from "../../services/firebase";
import ROUTES from "../../constants/routes";
import { AUTH_TYPES } from "../../constants/commonConsts";
import { PasswordForgetLink } from "../PasswordForget/passwordforget";
import history from "../../services/history";
import PAGEKEYS from "../../constants/pageKeys";
import { setUser } from "../../actions/userActions.js";
import { connect } from "react-redux";
import {
  Button,
  Input,
  Icon,
  Rate,
  DatePicker,
  Checkbox,
  Tooltip,
  Select
} from "antd";
class LoginForm extends Component {
  state = {
    signInEmail: "",
    signInPassword: "",
    signUpEmail: "",
    signUpPassword: "",
    signUpPasswordRetype: "",
    signUpName: "",
    signInError: null,
    signUpError: null,
    signUpForm: false,
    signInLoading: false,
    signUpLoading: false
  };
  loginInputStyle = { marginTop: "20px" };
  componentDidMount() {
    const loginBtn = document.getElementById("login");
    const signupBtn = document.getElementById("signup");

    loginBtn.addEventListener("click", e => {
      let parent = e.target.parentNode.parentNode;
      Array.from(e.target.parentNode.parentNode.classList).find(element => {
        if (element !== "slide-up") {
          parent.classList.add("slide-up");
        } else {
          signupBtn.parentNode.classList.add("slide-up");
          parent.classList.remove("slide-up");
        }
      });
    });

    signupBtn.addEventListener("click", e => {
      let parent = e.target.parentNode;
      Array.from(e.target.parentNode.classList).find(element => {
        if (element !== "slide-up") {
          parent.classList.add("slide-up");
        } else {
          loginBtn.parentNode.parentNode.classList.add("slide-up");
          parent.classList.remove("slide-up");
        }
      });
    });
  }

  onSignIn = event => {
    event.preventDefault();
    const { signInEmail, signInPassword } = this.state;
    if (this.validateSignInRequiredFields(signInEmail, signInPassword)) {
      this.setState({
        signInError: { message: "Please provide email and password" }
      });
      return;
    }
    this.setState({ signInLoading: true });
    this.props.firebase.authOps
      .doSignInWithEmailAndPassword(signInEmail, signInPassword)
      .then(() => {
        this.props.firebase.userOps.retrieveUserName(signInEmail).then(doc => {
          if (doc.exists) {
            this.props.setUser({
              Email: signInEmail,
              Name: doc.data().UserName
            });
            history.push(ROUTES[PAGEKEYS["MAIN"]]);
          }
        });
      })
      .catch(signInError => {
        this.setState({ signInError, signInLoading: false });
      });
  };
  validateSignUpRequiredFields = (
    signUpEmail,
    signUpPassword,
    signUpPasswordRetype,
    signUpName
  ) => {
    return (
      !signUpEmail || !signUpPassword || !signUpName || !signUpPasswordRetype
    );
  };
  validateSignInRequiredFields = (signInEmail, signInPassword) => {
    return !signInEmail || !signInPassword;
  };

  validatePasswordMatch = (signUpPassword, signUpPasswordRetype) => {
    return signUpPassword !== signUpPasswordRetype;
  };
  onSignUp = event => {
    event.preventDefault();

    const {
      signUpEmail,
      signUpPassword,
      signUpPasswordRetype,
      signUpName
    } = this.state;
    if (
      this.validateSignUpRequiredFields(
        signUpEmail,
        signUpPassword,
        signUpPasswordRetype,
        signUpName
      )
    ) {
      this.setState({ signUpError: { message: "Please fill all fields" } });
      return;
    }

    if (this.validatePasswordMatch(signUpPassword, signUpPasswordRetype)) {
      this.setState({ signUpError: { message: "Passwords do not match" } });
      return;
    }
    this.setState({ signUpLoading: true });
    this.props.firebase.authOps
      .doCreateUserWithEmailAndPassword(signUpEmail, signUpPassword)
      .then(({ additionalUserInfo: { isNewUser } }) => {
        if (isNewUser)
          this.props.firebase.userOps
            .addUserInfo(signUpEmail, signUpName, AUTH_TYPES["Email"])
            .then(() => {
              this.props.setUser({
                Email: signUpEmail,
                Name: signUpName
              });
              history.push(ROUTES[PAGEKEYS["MAIN"]]);
            })
            .catch(signUpError => {
              this.setState({ signUpError, signUpLoading: false });
            });
      })
      .catch(signUpError => {
        this.setState({ signUpError, signUpLoading: false });
      });
  };

  signInWithGoogle = () => {
    this.props.firebase.authOps
      .doSignInWithGoogle()
      .then(result => {
        this.props.firebase.userOps
          .addUserInfo(
            result.user.email,
            result.user.displayName,
            AUTH_TYPES["Google"]
          )
          .then(() => {
            this.props.setUser({
              Email: result.user.email,
              Name: result.user.displayName
            });
            history.push(ROUTES[PAGEKEYS["MAIN"]]);
          })
          .catch(signInError => {
            this.setState({ signInError });
          });
        history.push(ROUTES[PAGEKEYS["MAIN"]]);
      })
      .catch(signInError => {
        this.setState({ signInError });
      });
  };
  signInWithFacebook = () => {
    this.props.firebase.authOps
      .doSignInWithFacebook()
      .then(result => {
        this.props.firebase.userOps
          .addUserInfo(
            result.user.email,
            result.user.displayName,
            AUTH_TYPES["Google"]
          )
          .then(() => {
            this.props.setUser({
              Email: result.user.email,
              Name: result.user.displayName
            });
            history.push(ROUTES[PAGEKEYS["MAIN"]]);
          })
          .catch(signInError => {
            this.setState({ signInError });
          });
        history.push(ROUTES[PAGEKEYS["MAIN"]]);
      })
      .catch(signInError => {
        this.setState({ signInError });
      });
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
      signInError,
      signUpError,
      signUpForm,
      signInLoading,
      signUpLoading
    } = this.state;

    return (
      <div id="loginFormDiv">
        <div className="ght-login-form">
          <div className="signup">
            <h2 className="form-title" id="signup">
              Log in
            </h2>
            <form onSubmit={this.onSignIn}>
              <div className="ght-form-holder">
                <Input
                  placeholder="Email"
                  prefix={<Icon type="mail" />}
                  value={signInEmail}
                  onChange={this.onChange}
                  name="signInEmail"
                />
                <Input.Password
                  style={this.loginInputStyle}
                  prefix={<Icon type="lock" />}
                  value={signInPassword}
                  onChange={this.onChange}
                  name="signInPassword"
                  placeholder="Password"
                />
              </div>
              {signInError && (
                <p className="login-form-error">{signInError.message}</p>
              )}
              <div className="login-button-div">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="noColorButton"
                  style={{ background: "#1848A0", width: "55%" }}
                  loading={signInLoading}
                >
                  Login
                </Button>
              </div>
            </form>
            <div className="social-login-container">
              <img
                onClick={this.signInWithFacebook}
                className="social-login-image"
                src={fbLogin}
                alt=""
              />
              <img
                onClick={this.signInWithGoogle}
                className="social-login-image"
                src={gLogin}
                alt=""
              />
            </div>
          </div>
          <div className="login slide-up">
            <div className="center">
              <h2 className="form-title" id="login">
                Sign Up
              </h2>
              <form onSubmit={this.onSignUp}>
                <div className="ght-form-holder">
                  <Input
                    placeholder="Username"
                    onChange={this.onChange}
                    name="signUpName"
                    prefix={<Icon type="user" />}
                  />
                  <Input
                    placeholder="Email"
                    onChange={this.onChange}
                    style={this.loginInputStyle}
                    name="signUpEmail"
                    prefix={<Icon type="mail" />}
                  />
                  <Input.Password
                    style={this.loginInputStyle}
                    prefix={<Icon type="lock" />}
                    onChange={this.onChange}
                    placeholder="Password"
                    name="signUpPassword"
                  />
                  <Input.Password
                    style={this.loginInputStyle}
                    onChange={this.onChange}
                    prefix={<Icon type="lock" />}
                    placeholder="Retype Password"
                    name="signUpPasswordRetype"
                  />
                </div>
                {signUpError && (
                  <p className="login-form-error">{signUpError.message}</p>
                )}
                <div className="login-button-div">
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="noColorButton"
                    style={{ background: "#1848A0", width: "55%" }}
                    onChange={this.onChange}
                    loading={signUpLoading}
                  >
                    Sign Up
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
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
)(withFirebase(LoginForm));
