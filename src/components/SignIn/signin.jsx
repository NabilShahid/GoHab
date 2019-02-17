import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { SignUpLink } from "../SignUp/signup";
import { withFirebase } from "../../services/firebase";
import * as ROUTES from "../../constants/routes";
import { PasswordForgetLink } from "../PasswordForget/passwordforget";
import { Card, Row, Col } from "antd";
import { Button } from "antd";
import "./signin.css";

const gridStyle = {
  width: "25%",
  textAlign: "center"
};
const SignInPage = () => (
  <div id="loginPage">
    <SignInForm />
    {/* <PasswordForgetLink/>
    <SignUpLink /> */}
  </div>
);

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;
    event.preventDefault();
    console.log(this.props.firebase)
    this.props.firebase.authOps
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.MAIN);
      })
      .catch(error => {
        this.setState({ error });
      });

    
  };
  

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  
  addUser=()=>{
    this.props.firebase.goalOps.retrieveAllGoals("nabil110176@gmail.com");
  }

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === "" || email === "";

    return (
      <React.Fragment>
        <div id="loginContainer">
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
        </div>
      </React.Fragment>
    );
  }
}

const SignInForm = compose(
  withRouter,
  withFirebase
)(SignInFormBase);

export default SignInPage;

export { SignInForm };
