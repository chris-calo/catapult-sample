import fetch from 'isomorphic-fetch';

import Login from './login';
import Register from './register';
import Athlete from './athlete';
import Stream from './stream';

const routes = [
  {
    path: '/',
    exact: true,
    component: Login,
    private: false,
  },
  {
    path: '/login',
    exact: true,
    component: Login,
    private: false,
  },
  {
    path: '/register',
    exact: true,
    component: Register,
    private: false,
  },
  {
    path: '/athlete',
    exact: true,
    component: Athlete,
    private: true,
  },
  {
    path: '/stream',
    exact: true,
    component: Stream,
    private: true,
  },
];

export default routes;
