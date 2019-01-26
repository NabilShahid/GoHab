import React from "react";
import * as ROUTES from '../../constants/routes'
import { Link } from 'react-router-dom';
import Main from '../Main'

import { BrowserRouter as Router, Route } from "react-router-dom";
const App = () => {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to={ROUTES.LOGIN}>Log in</Link>
          </li>
          <li>
            <Link to={ROUTES.LANDING}>Landing</Link>
          </li>
          <li>
            <Link to={ROUTES.HOME} >Home</Link>
          </li>         
        </ul>
        <Route path={ROUTES.HOME} component={Main} />
      </div>
    </Router>
  );
};

export default App;
