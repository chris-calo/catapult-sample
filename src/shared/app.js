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
    if (
      this.state.routes.length < 1 &&
      (
        this.props == null ||
        this.props.routes == null ||
        this.props.routes.length < 1
      )
    ) {
      return null;
    }

    const routes = this.props.routes || this.state.routes;
    const routeMarkup = routes.map(route => {
      const path = route.route[0]==='/' ? route.route : `/${route.route}`;

      return (
        <Route key={route.route} path={path} exact={true}
        render={() => {
          // components go here
          return null;
        }} />
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
