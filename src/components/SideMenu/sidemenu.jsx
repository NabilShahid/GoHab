import React, { Component } from "react";
import { Menu, Icon } from "antd";
import "./sidemenu.css"


class SideMenu extends Component {
  state = {
    mode: 'inline',
    theme: 'light',
  }
  
  render() {
    return (
        <Menu        
        defaultSelectedKeys={['1']}
        mode={this.state.mode}
        theme={this.state.theme}
      >
        <Menu.Item key="home">
          <Icon type="mail" />
          Home
        </Menu.Item>
        <Menu.Item key="goals">
          <Icon type="calendar" />
          Goals
        </Menu.Item>
        <Menu.Item key="habbits">
          <Icon type="calendar" />
          Habbits
        </Menu.Item>
        <Menu.Item key="tasks">
          <Icon type="calendar" />
          Tasks
        </Menu.Item>
        <Menu.Item key="goalTree">
          <Icon type="calendar" />
          Goal Tree
        </Menu.Item>
        <Menu.Item key="habbitCalendar">
          <Icon type="calendar" />
          Habbit Calendar
        </Menu.Item>
        <Menu.Item key="habbitStats">
          <Icon type="calendar" />
          Habbit Stats
        </Menu.Item>
        <Menu.Item key="taskStats">
          <Icon type="calendar" />
          Task Stats
        </Menu.Item>
        <Menu.Item key="8">
          <Icon type="calendar" />
          Goal Progress
        </Menu.Item>
        <Menu.Item key="habbitTracking">
          <Icon type="calendar" />
          Habbit Tracking
        </Menu.Item>
        <Menu.Item key="taskManaging">
          <Icon type="calendar" />
          Task Managing
        </Menu.Item>
      
      </Menu>
    );
  }
}

export default SideMenu;
