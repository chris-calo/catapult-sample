import React from 'react';
import { Link } from 'react-router-dom';

class Register extends React.Component {
  render() {
    return (
      <div className="register-view">
        <div className="locked icon"></div>
        <Link to="/" className="logo" />
        <form>
          <input type="text" name="first-name" placeholder="Jane" />
          <input type="text" name="last-name" placeholder="Doe" />

          <input type="text" name="email"
          placeholder="jdoe@catapultsports.com" />

          <input type="password" name="password"
          placeholder="•••••••••••••••" />
          <input type="password" name="password-confirm"
          placeholder="•••••••••••••••" />

          <input type="submit" value="Log In" />
        </form>
      </div>
    );
  }
}

export default Register;

