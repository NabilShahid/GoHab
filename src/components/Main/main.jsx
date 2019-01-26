import React, { Component } from "react";
import  { FirebaseContext } from '../../services/firebase';

const Main = () => {
  return (
    <div>
      Main Page<p> {process.env.REACT_APP_NABIL}</p>
      <FirebaseContext.Consumer>
        {firebase => {
          return <div>I've access to Firebase and render something.</div>;
        }}
      </FirebaseContext.Consumer>
    </div>
  );
};
export default Main;
