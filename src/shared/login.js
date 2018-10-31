import React from 'react';
import { Link } from 'react-router-dom';

class Login extends React.Component {
  render() {
    return (
      <div className="login-view">
        <div className="locked icon"></div>
        <Link to="/" className="logo" />
        <form>
          <input type="text" name="email"
          placeholder="user@catapultsports.com" />

          <input type="password" name="password"
          placeholder="•••••••••••••••" />

          <input type="submit" value="Log In" />

          <div className="register">
            Need a Catapult account?&nbsp;
            <Link to="/register">
              It&rsquo;s Free!
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
