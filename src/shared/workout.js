import React from 'react';
import store from 'store';
import Header from './common/header';
import Footer from './common/footer';
import { withRouter, Link } from 'react-router-dom';
import { post } from './common/api';
import './workout.scss';

class Workout extends React.Component {
  componentDidMount() {
    const session = store.get('session');
    const redirect = () => this.props.history.replace('/login');

    if (!session || typeof session === 'undefined') {
      redirect(); return;
    }
    if (!session.email || `${session.email}`.length < 1) {
      redirect(); return;
    }
    if (!session.token || `${session.email}`.token < 1) {
      redirect(); return;
    }

    const request = { email: session.email, token: session.token };
    post('/api/v1/user/validate', request).then(result => {
      if (!result.ok) {
        store.remove('session');
        redirect();
      }
    });
  }

  render() {
    return (
      <div className="workout-view">
        <Header />
        <div className="view-container">
        </div>
        <Footer />
      </div>
    );
  }
}

export default withRouter(props => <Workout {...props} />);
