import React, { Component } from "react";
import "./usertile.css";
import { Icon } from "antd";

import logo from "../../assets/images/logo_withoutText.png";

const UserTile = ({ toggleMenu, menuShown }) => {
  return (
    <div id="userDiv">
      <img src={logo} id="gohabLogo" alt="G" />
      <span id="gohabTitle">GoHab</span>{" "}
      {menuShown && (
        <Icon
          style={{ margin: "10px", width: "20px", height: "20px" }}
          type="menu-fold"
          onClick={toggleMenu}
        />
      )}
      <hr style={{ marginBottom: "7px", marginTop: "7px" }} />
    </div>
  );
};

export default UserTile;
