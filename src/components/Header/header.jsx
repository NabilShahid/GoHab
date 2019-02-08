import React, { Component } from "react";
import {connect} from "react-redux";
import './header.css';
import logo from '../../assets/images/logo_2.png'

class Header extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
      <div id="appHeader" className="row">
        <div className="col-md-1"></div>
        <div className="col-md-3">Welcome {this.props.user.UserEmail}</div>
        <div className="col-md-5" />
        <div className="col-md-3" style={{ textAlign: "right" }} />
      </div>
      <img src={logo}/>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      user: state.User       
  };
};

export default connect(mapStateToProps, null)(Header);

