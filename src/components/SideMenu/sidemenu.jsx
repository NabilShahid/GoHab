import React, { Component } from "react";
import { Menu, Icon } from "antd";
import history from "../../services/history";
import * as ROUTES from "../../constants/routes";
import "./sidemenu.css";


class SideMenu extends Component {
  state = {
    mode: 'inline',
    theme: 'light',
  }
  
  render() {
    return (
        <Menu        
        defaultSelectedKeys={[ROUTES.HOME]}
        mode={this.state.mode}
        theme={this.state.theme}
        onSelect={this.moveToPath}	
      >
        <Menu.Item key={ROUTES.HOME}>
        <i id="sHomeI" className="fa fa-home sideIcon"></i>
          Home
        </Menu.Item>
        <Menu.Item key={ROUTES.GOALS} theme="filled">
          <i id="sGoalsI" className="fa fa-home sideIcon"></i>
          Goals
        </Menu.Item>
        <Menu.Item key="habits" theme="filled">
          <i id="sHabitsI" className="fa fa-home sideIcon"></i>
          Habits
        </Menu.Item>
        <Menu.Item key={ROUTES.TASKS} theme="filled">
          <i id="sTasksI" className="fa fa-home sideIcon"></i>
          Tasks
        </Menu.Item>
        <Menu.Item key="goalTree">
          <i className="fa fa-home sideIcon"></i>
          Goal Tree
        </Menu.Item>
        <Menu.Item key="habitCalendar">
          <i className="fa fa-home sideIcon"></i>
          Habit Calendar
        </Menu.Item>
        <Menu.Item key="habitStats">
          <i className="fa fa-home sideIcon"></i>
          Habit Stats
        </Menu.Item>
        <Menu.Item key="taskStats">
          <i className="fa fa-home sideIcon"></i>
          Task Stats
        </Menu.Item>
        <Menu.Item key="8">
          <i className="fa fa-home sideIcon"></i>
          Goal Progress
        </Menu.Item>
        <Menu.Item key="habitTracking">
          <i className="fa fa-home sideIcon"></i>
          Habit Tracking
        </Menu.Item>
        <Menu.Item key="taskManaging">
          <i className="fa fa-home sideIcon"></i>
          Task Managing
        </Menu.Item>
      
      </Menu>
    );
  }

  /**
   * open selective tab on second route
   */
  moveToPath=({key})=>{
     history.push(key);
  }
}

export default SideMenu;
