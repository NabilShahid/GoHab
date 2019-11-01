import React, { Component } from "react";
import "./templogin.css";
import bgImage from "../../assets/images/bg-01.jpg";
import fbLogin from "../../assets/images/fblogin.png";
import gLogin from "../../assets/images/glogin.png";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { SignUpLink } from "../SignUp/signup";
import { withFirebase } from "../../services/firebase";
import ROUTES from "../../constants/routes";
import {AUTH_TYPES} from "../../constants/commonConsts";
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
    signUpName: "",
    error: null,
    signUpForm: false
  };

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
            .addUserInfo(signUpEmail, signUpName,AUTH_TYPES["Email"])
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

  signInWithGoogle=()=>{
    this.props.firebase.authOps.doSignInWithGoogle().then((result)=>{
      this.props.firebase.userOps
      .addUserInfo(result.user.email, result.user.displayName,AUTH_TYPES["Google"])
      .then(()=> {
        this.props.setUser({
          Email: result.user.email,
          Name: result.user.displayName
        });    
        history.push(ROUTES[PAGEKEYS["MAIN"]]);
      })
      .catch((error)=> {
        this.setState({ error });
      });  
      history.push(ROUTES[PAGEKEYS["MAIN"]]);
    }).catch(error=>{
      this.setState({error});
    })
  }
  signInWithFacebook=()=>{
    this.props.firebase.authOps.doSignInWithFacebook().then((result)=>{
      this.props.firebase.userOps
      .addUserInfo(result.user.email, result.user.displayName,AUTH_TYPES["Google"])
      .then(()=> {
        this.props.setUser({
          Email: result.user.email,
          Name: result.user.displayName
        });    
        history.push(ROUTES[PAGEKEYS["MAIN"]]);
      })
      .catch((error)=> {
        this.setState({ error });
      });  
      history.push(ROUTES[PAGEKEYS["MAIN"]]);
    }).catch(error=>{
      this.setState({error});
    })
  }

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
                prefix={<Icon type="user" />}
                value={signInEmail}
                onChange={this.onChange}
                suffix={
                  <Tooltip title="Extra information">
                    <Icon
                      type="info-circle"
                      style={{ color: "rgba(0,0,0,.45)" }}
                    />
                  </Tooltip>
                }
              />
              <Input.Password
                style={{ marginTop: "20px" }}
                prefix={<Icon type="lock" />}
                value={signInPassword}
                onChange={this.onChange}
                placeholder="Password"
              />
            </div>
            <div className="login-button-div">
              <Button
                type="primary"
                className="noColorButton"
                style={{ background: "#5D59AF", width: "55%" }}
              >
                Login
              </Button>
            </div>
            <div className="social-login-container">
              <img onClick={this.signInWithFacebook} className="social-login-image" src={fbLogin} />
              <img onClick={this.signInWithGoogle} className="social-login-image" src={gLogin} />
            </div>
          </div>
          <div className="login slide-up">
            <div className="center">
              <h2 className="form-title" id="login">
                Sign Up
              </h2>
              <div className="ght-form-holder">
                <Input
                  placeholder="Username"
                  prefix={<Icon type="user" />}
                  suffix={
                    <Tooltip title="Extra information">
                      <Icon
                        type="info-circle"
                        style={{ color: "rgba(0,0,0,.45)" }}
                      />
                    </Tooltip>
                  }
                />
                <Input.Password
                  style={{ marginTop: "20px" }}
                  prefix={<Icon type="lock" />}
                  placeholder="Password"
                />
                <Input.Password
                  style={{ marginTop: "20px" }}
                  prefix={<Icon type="lock" />}
                  placeholder="Retype Password"
                />
              </div>
              <div className="login-button-div">
                <Button
                  type="primary"
                  className="noColorButton"
                  style={{ background: "#5D59AF", width: "55%" }}
                >
                  Login
                </Button>
              </div>
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
