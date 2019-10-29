import React, { Component } from "react";
import "./usertile.css";
import { Icon } from "antd";

import logo from "../../assets/images/logo_withoutText.png";

const UserTile = () => {
  return (
    <div id="userDiv">
      <img src={logo} id="gohabLogo" alt="G" />
      <span id="gohabTitle">GoHab</span>{" "}     
      <hr style={{ marginBottom: "7px", marginTop: "7px" }} />
    </div>
  );
};

export default UserTile;
