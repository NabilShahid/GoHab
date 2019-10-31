import React, { Component } from "react";
import "./templogin.css";
import bgImage from "../../assets/images/bg-01.jpg";
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
  state = {};
  componentDidMount() {
    console.clear();

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
  render() {
    return (
      <div id="loginFormDiv">
        <div className="ght-login-form">
          <div className="signup">
            <h2 className="form-title" id="signup">
              Log in
            </h2>
            <div className="ght-form-holder">
              {/* <input type="text" className="input" placeholder="Name" />
              <input type="email" className="input" placeholder="Email" />
              <input type="password" className="input" placeholder="Password" /> */}
              <Input
                placeholder="Username"
                prefix={
                  <Icon type="user" />
                }
                suffix={
                  <Tooltip title="Extra information">
                    <Icon
                      type="info-circle"
                      style={{ color: "rgba(0,0,0,.45)" }}
                    />
                  </Tooltip>
                }
              />
              <Input.Password style={{marginTop:"20px"}} prefix={
                  <Icon type="lock" />
              } placeholder="Password" />
            </div>
            <button className="submit-btn">Log in</button>
          </div>
          <div className="login slide-up">
            <div className="center">
              <h2 className="form-title" id="login">
                Sign Up
              </h2>
              <div className="ght-form-holder">
                <input type="email" className="input" placeholder="Email" />
                <input
                  type="password"
                  className="input"
                  placeholder="Password"
                />
              </div>
              <button className="submit-btn">Log in</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginForm;
