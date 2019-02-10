import React, { Component } from "react";
import  { FirebaseContext } from '../../services/firebase';
import { withFirebase } from "../../services/firebase";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import SignOutButton from "../SignOut/signoutbutton";
import SideMenu from "../SideMenu/sidemenu";
import {connect} from "react-redux";
import Header from "../Header/header";

class MainBase extends Component {
  state = {  }
  render() { 
    return (
    
    
        <div>
        <SideMenu/>
       {/* Hello Main Page {this.props.user.UserEmail}
       <SignOutButton /> */}
       </div>
      
    );
  }
  componentDidMount() {
    setTimeout(()=>{
      console.log(this.props.user);

    },1)
  }
  
}

const mapStateToProps = (state) => {
  return {
      user: state.User       
  };
};

const Main = compose(
  withRouter,
  withFirebase
)(MainBase);


export default connect(mapStateToProps, null)(Main);
