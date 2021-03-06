import React from 'react';
import { Route, IndexRoute, browserHistory } from 'react-router';
import App from './containers/App';
import NotFound from './components/NotFound';
import SetupState from './components/SetupState';
import CreateGame from './components/CreateGame';
import Games from './components/Games';
import Players from './components/Players';
import Game from './components/Game';
import Hole from './components/Hole';
import Admin from './components/Admin';
import Dashboard from './components/Dashboard';
import Auth from './components/Auth';
import AuthenticatedRoutes from './components/AuthenticatedRoutes';
import { UserAuthWrapper } from 'redux-auth-wrapper';

const AdminAccess = UserAuthWrapper({
  authSelector: state => state.user,
  predicate: user => { return user.role === 'admin' },
  redirectAction: () => browserHistory.push('/login'),
  wrapperDisplayName: 'UserIsAdmin',
});

const AdminRoutes = AdminAccess( props => props.children )

export default (
  <Route>
    <Route path="/" component={App}>
      <Route component={SetupState}>
        <IndexRoute component={CreateGame} />
        <Route path="/games" component={Games} />
        <Route path="/players" component={Players} />
        <Route path="/games/:id" component={Game} />
        <Route path="/games/:id/hole/:number" component={Hole} />
        <Route component={AuthenticatedRoutes}>
          <Route path="/dashboard" component={Dashboard} />
          <Route component={AdminRoutes}>
            <Route path="/admin" component={Admin} />
          </Route>
        </Route>
      </Route>
      <Route path="/signup" component={Auth} title="Sign Up" />
      <Route path="/login" component={Auth} title="Log In" />
      <Route path="*" component={NotFound} />
    </Route>
  </Route>
);
