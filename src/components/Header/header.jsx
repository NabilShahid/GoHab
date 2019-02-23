import React, { Component } from "react";
import { connect } from "react-redux";
import "./header.css";
import logo from "../../assets/images/logo_withoutText.png";
import { Row, Col, Badge, Icon } from "antd";

class Header extends Component {
  state = {};
  render() {
    return (
      // <React.Fragment>
      //   <Row style={{ marginTop: "10px", marginBottom: "10px" }}>
      //     <Col span={5}>
      //       <div id="userHeaderLight">
             
      //         <img src={logo} id="userLogo" />
      //         <div id="userName">Nabil Shahid</div>
      //       </div>
      //     </Col>
      //     <Col span={19}>
      //       <Row id="mainHeaderDark">
      //         <Col span={1}>{/* Welcome {this.props.user.UserEmail} */}</Col>
      //         <Col span={20}>
      //           {/* Welcome {this.props.user.UserEmail} */}
      //           Home
      //         </Col>
      //         <Col span={3}>
                
      //           <Badge
      //             count={
      //               6
      //             }
      //           >
      //             <i style={{fontSize:"23px"}} className="fa fa-bell"></i>
      //           </Badge>
      //         </Col>
      //       </Row>
      //     </Col>
      //   </Row>

      //   {/* <img src={logo}/> */}
      // </React.Fragment>
      <div id="headerAbDiv">
      <Row>
        <Col span={1}>
        </Col>
        <Col id="headerTitle" span={12}>
        <i className={this.props.icon} style={{marginRight:"2%"}}></i>
          {this.props.heading}
        </Col>
        <Col span={7}>
        </Col>
      </Row>
    </div>
    );
  }
}

/**
 * state to props mapping for dislaying user from userReducer 
 */
const mapStateToProps = state => {
  return {
    user: state.User
  };
};

export default connect(
  mapStateToProps,
  null
)(Header);
