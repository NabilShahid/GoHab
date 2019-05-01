import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { SignUpLink } from "../SignUp/signup";
import { withFirebase } from "../../services/firebase";
import ROUTES from "../../constants/routes";
import { PasswordForgetLink } from "../PasswordForget/passwordforget";
import { Card, Row, Col } from "antd";
import PAGEKEYS from "../../constants/pageKeys";
import { Button } from "antd";
import "./signinup.css";

const gridStyle = {
  width: "25%",
  textAlign: "center"
};
const SignInUp = () => (
  <div id="loginPage">
    <SignInForm />
    {/* <PasswordForgetLink/>
    <SignUpLink /> */}
  </div>
);

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null,
  signUpForm: false
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;
    event.preventDefault();
    console.log(this.props.firebase);
    this.props.firebase.authOps
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES[PAGEKEYS["MAIN"]]);
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  addUser = () => {
    this.props.firebase.goalOps.retrieveAllGoals("nabil110176@gmail.com");
  };

  render() {
    const { email, password, error, signUpForm } = this.state;

    const isInvalid = password === "" || email === "";

    return (
      <React.Fragment>
        {/* <div id="loginContainer">
          <Row>
            <Col id="leftCol" span={10} />
            <Col id="rightCol" span={14}>
              <form onSubmit={this.onSubmit}>
                <input
                  name="email"
                  value={email}
                  onChange={this.onChange}
                  type="text"
                  placeholder="Email Address"
                />
                <input
                  name="password"
                  value={password}
                  onChange={this.onChange}
                  type="password"
                  placeholder="Password"
                />
                <button disabled={isInvalid} type="submit">
                  Sign In
                </button>

                {error && <p>{error.message}</p>}
              </form>
              <Button id="loginButton" onClick={this.addUser}>Sign In</Button>
            </Col>
          </Row>
        </div> */}
        <div
          className={"siuContainer " + (signUpForm ? "siuRightPanelActive" : "")}
        >
          <div className="siuFormContainer signUpContainer">
            <form action="#">
              <div className="siuMainHeader">Create Account</div>
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
              <span>or use your email for registration</span>
              <input className="siuInput" type="text" placeholder="Name" />
              <input className="siuInput" type="email" placeholder="Email" />
              <input className="siuInput" type="password" placeholder="Password" />
              <button>Sign Up</button>
            </form>
          </div>
          <div className="siuFormContainer signInContainer">
            <form onSubmit={this.onSubmit}>
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
              <span>or use your account</span>
              <input className="siuInput"
                name="email"
                value={email}
                onChange={this.onChange}
                type="text"
                placeholder="Email Address"
              />
              <input className="siuInput"
                type="password"
                name="password"
                value={password}
                onChange={this.onChange}
                placeholder="Password"
              />
              <a href="#">Forgot your password?</a>
              <button>Sign In</button>
            </form>
          </div>
          <div className="siuOverlayContainer">
            <div className="siuOverlay">
              <div className="siuOverlayPanel siuOverlayLeft">
                <div className="siuMainHeader">Welcome Back!</div>
                <p>
                  To keep connected with us please login with your personal info
                </p>
                <button
                  className="ghost"
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
                <p>Enter your personal details and start journey with us</p>
                <button
                  className="ghost"
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

const SignInForm = compose(
  withRouter,
  withFirebase
)(SignInFormBase);

export default SignInUp;

export { SignInForm };
