import React from 'react';

import { withFirebase } from '../../services/firebase';
import {withRouter} from 'react-router-dom';
import { compose } from 'recompose';
import ROUTES from '../../constants/routes';
import PAGEKEYS from "../../constants/pageKeys";



const SignOutButtonBase = ({ firebase,history }) => (
  <button type="button" onClick={()=>{firebase.doSignOut();history.push(ROUTES[PAGEKEYS["SIGNIN"]])}}>
    Sign Out
  </button>
);

const SignOutButton = compose(
    withRouter,
    withFirebase,
  )(SignOutButtonBase);

export default SignOutButton;