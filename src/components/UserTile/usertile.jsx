import React, { Component } from "react";
import "./usertile.css";
import { Icon } from "antd";
import { GoHabLogo } from "../../constants/iconSvgs";

import logo from "../../assets/images/logo_withoutText.png";

const UserTile = ({ toggleMenu, menuShown }) => {
  return (
    <div id="userDiv">
      <GoHabLogo style={{width:"30px",height:"30px",marginRight:"8px",marginBottom:"6px"}}/>
      <span id="gohabTitle">GoHab</span>{" "}     
      <hr style={{ marginBottom: "7px", marginTop: "7px" }} />
    </div>
  );
};

export default UserTile;
