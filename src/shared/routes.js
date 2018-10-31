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
  },
  {
    path: '/login',
    exact: true,
    component: Login,
  },
  {
    path: '/register',
    exact: true,
    component: Register,
  },
  {
    path: '/athlete',
    exact: true,
    component: Athlete,
  },
  {
    path: '/stream',
    exact: true,
    component: Stream,
  },
];

export default routes;
