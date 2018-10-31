import fetch from 'isomorphic-fetch';

import React from 'react';
import store from 'store';

import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import routes from './routes';

import Header from './common/Header.js';
import Footer from './common/Footer.js';
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
      routes: [],
    };
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
