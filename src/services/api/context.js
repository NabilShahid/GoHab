import React from 'react';

const ApiContext = React.createContext(null);
export const withApi = Component => props => (
    <ApiContext.Consumer>
      {api => <Component {...props} api={api} />}
    </ApiContext.Consumer>
  );
export default ApiContext;