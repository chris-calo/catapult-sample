import React from 'react';
import store from 'store';
import { Link, withRouter } from 'react-router-dom';
import classNames from 'classnames';
import './header.scss';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "Chris",
      lastName: "Calo",
    }
  }

  componentDidMount() {
    const session = store.get('session');

    if (!session || typeof session === 'undefined') return;
    if (!session.firstName || `${session.firstName}`.length < 1) return;
    if (!session.lastName || `${session.lastName}`.length < 1) return;

    this.setState({
      firstName: session.firstName,
      lastName: session.lastName,
    });
  }

  render() {
    const pathname = this.props.history.location.pathname;

    const athleteClasses = classNames({
      'athlete': true,
      'active': pathname === '/athlete',
    });

    const workoutClasses = classNames({
      'workout': true,
      'active': pathname === '/workout',
    });

    const streamClasses = classNames({
      'stream': true,
      'active': pathname === '/stream',
    });

    return (
      <div className="header">
        <Link to="/athlete" className="logo-container">
          <div className="logo" />
        </Link>
        <div className="nav">
          <Link to="/athlete" className={athleteClasses}>
            <div className="activity-indicator" />
            <div className="label">
              <span className="icon" />
              <span className="name">Activity</span>
            </div>
          </Link>
          <Link to="/workout" className={workoutClasses}>
            <div className="activity-indicator" />
            <div className="label">
              <span className="icon" />
              <span className="name">Workouts</span>
            </div>
          </Link>
          <Link to="/stream" className={streamClasses}>
            <div className="activity-indicator" />
            <div className="label">
              <span className="icon" />
              <span className="name">Video</span>
            </div>
          </Link>
        </div>
        <div className="profile">
          <div className="name">
            {this.state.firstName} {this.state.lastName}
          </div>
          <div className="platform">
            OptimEye S5
          </div>
        </div>
        <div className="dropshadow" />
      </div>
    );
  }
}

export default withRouter(props => <Header {...props} />);
