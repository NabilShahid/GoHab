import React, { Component } from "react";
import { connect } from "react-redux";
import "./header.css";
import logo from "../../assets/images/logo_withoutText.png";
import { Row, Col, Badge, Drawer, Input } from "antd";
const Search = Input.Search;
class Header extends Component {
  state = {
    notificationsVisible: false
  };

  render() {
    return (
      <div id="headerAbDiv">
        <Row>
          <Col span={1} />
          <Col id="headerTitle" span={10}>
            <i className={this.props.icon} style={{ marginRight: "2%" }} />
            {this.props.title}
          </Col>
          <Col id="headerOptions" span={11}>
            {this.props.search&&<Search
              placeholder="Search"
              onSearch={value => console.log(value)}
              style={{ width: 200 }}
            />}
            
          </Col>
          <Col style={{ textAlign: "right", paddingTop: "14px" }} span={1}>
            <Badge count={12} showZero>
              <i
                onClick={() => {
                  this.setState({ notificationsVisible: true });
                }}
                className="fa fa-bell"
                id="bellIcon"
              />
            </Badge>
          </Col>
          <Col span={1} />
        </Row>
        <Drawer
          title="Basic Drawer"
          placement="right"
          closable={true}
          onClose={() => {
            this.setState({ notificationsVisible: false });
          }}
          visible={this.state.notificationsVisible}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Drawer>
      </div>
    );
  }
}

/**
 * state to props mapping for dislaying user from userReducer
 */
const mapStateToProps = state => {
  return {
    title: state.headerReducer.Title,
    icon:state.headerReducer.Icon,
    search:state.headerReducer.Search
  };
};

/**
 * dispatch to props mapping form updating user
 */
const mapDispatchToProps = dispatch => {
  return {   
    updateGoal: goalPayload => {
      "dispatch(updateGoal(goalPayload));"
    }
  };
};
 
export default connect(
  mapStateToProps,
  null
)(Header);
