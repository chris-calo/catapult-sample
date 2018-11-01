import fetch from 'isomorphic-fetch';

import React from 'react';
import store from 'store';

import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { post } from './common/api';
import routes from './routes';

import './common/fonts.scss';
import './common/reset.scss';

if (__isBrowser__) { window.__DATA_LOADED__ = false }

const ScrollToTop = () => {
  if (!__isBrowser__) { return null }

  window.scrollTo(0, 0);
  return null;
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      auth: false,
    };
  }

  componentDidMount() {
    const session = store.get('session');

    if (!session || typeof session === 'undefined') return;
    if (!session.email || `${session.email}`.length < 1) return;
    if (!session.token || `${session.email}`.token < 1) return;

    const request = { email: session.email, token: session.token };
    post('/api/v1/user/validate', request).then(result => {
      if (!result.ok) store.remove('session');
      this.setState({ auth: result.ok })
    });
  }

  render() {
    const routeMarkup = routes.map(route => {
      return (
        <Route key={route.path} path={route.path} exact={route.exact}
        component={route.component} />
      );
    });

    return (
      <div id="app">
        <div className="blinder"></div>
        <Route component={ScrollToTop} />
        <Switch>
          {routeMarkup}
        </Switch>
      </div>
    );
  }
}

export default withRouter(props => <App {...props} />);
