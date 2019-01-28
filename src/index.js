import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App/app";
import * as serviceWorker from "./serviceWorker";
import Firebase, { FirebaseContext } from './services/firebase';


ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
