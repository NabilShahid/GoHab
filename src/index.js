import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App/app";
import * as serviceWorker from "./serviceWorker";
import Firebase, { FirebaseContext } from "./services/firebase";
import "bootstrap/dist/css/bootstrap.css";
import "antd/dist/antd.css";
import 'font-awesome/css/font-awesome.min.css';
import store from "./store";
import { Provider } from "react-redux";
ReactDOM.render(
  <Provider store={store}>
    <FirebaseContext.Provider value={new Firebase()}>
      <App />
    </FirebaseContext.Provider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
