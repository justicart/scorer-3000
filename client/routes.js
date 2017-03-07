import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import NotFound from './components/NotFound';
import SetupState from './components/SetupState';
import CreateGame from './components/CreateGame';
import Settings from './components/Settings';

export default (
  <Route>
    <Route path="/" component={App}>
      <Route component={SetupState}>
        <IndexRoute component={CreateGame} />
        <Route path="/settings" component={Settings} />
      </Route>
      <Route path="*" component={NotFound} />
    </Route>
  </Route>
);
