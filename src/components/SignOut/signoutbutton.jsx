import React from 'react';

import { withFirebase } from '../../services/firebase';
import {withRouter} from 'react-router-dom';
import { compose } from 'recompose';
import * as ROUTES from '../../constants/routes';


const SignOutButtonBase = ({ firebase,history }) => (
  <button type="button" onClick={()=>{firebase.doSignOut();history.push(ROUTES.SIGNIN)}}>
    Sign Out
  </button>
);

const SignOutButton = compose(
    withRouter,
    withFirebase,
  )(SignOutButtonBase);

export default SignOutButton;