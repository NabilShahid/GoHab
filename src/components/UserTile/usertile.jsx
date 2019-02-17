import React, { Component } from "react";
import "./usertile.css";
import logo from "../../assets/images/logo_withoutText.png";

const UserTile = () => {
  return (
    <div id="userDiv">
      <img src={logo} id="userLogo" /><span style={{fontSize:"17px",fontWeight:"500"}}>GoHab</span>
      <hr style={{ marginBottom: "0px" }} />
    </div>
  );
};

export default UserTile;
