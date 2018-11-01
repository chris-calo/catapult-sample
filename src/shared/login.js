import React from 'react';
import emailValidator from 'email-validator';
import { Link } from 'react-router-dom';
import { get } from './common/api';
import './login.scss';

// TODO: make flash a class and state-machine for ease of modification
class Login extends React.Component {
  componentDidMount() {
    this.hideFlash();

    if (__isBrowser__) {
      if (window.__REGISTER_SUCCESS__) {
        this.showFlash("Success! You may on login", 'success');
        window.__REGISTER_SUCCESS__ = null;
        return;
      }
    }
  }

  hideFlash() {
    this.flash.classList.remove('error');
    this.flash.classList.remove('warn');
    this.flash.classList.remove('error');
    this.flash.classList.add('hidden');
  }

  showFlash(message = "", style = "error") {
    this.flashMessage.innerHTML = message;
    this.flash.classList.remove('error');
    this.flash.classList.remove('warn');
    this.flash.classList.remove('error');
    this.flash.classList.remove('hidden');
    this.flash.classList.add(style);
  }

  handleSubmit(e) {
    e.preventDefault();

    const email = this.emailField.value.trim();
    const password = this.passwordField.value.trim();

    if (email.length < 1 || !/\S+@\S+/.test(email)) {
      this.showFlash("Hmm… that email seems off", 'error');
      return;
    }

    if (password.length < 1) {
      this.showFlash("Uh-oh, you need password!", 'error');
      return;
    }

    get('/api/v1/caloriesburned').then(result => {
      console.log(JSON.stringify(result));
    });
  }

  render() {
    return (
      <div className="login-view">
        <div className="view-container">
          <div className="logo" />
          <div className="register">
            Need a Catapult account?&nbsp;
            <Link to="/register" className="underline">
              It&rsquo;s free!
            </Link>
          </div>
          <div className="flash hidden" ref={el => this.flash = el}>
            <span className="attention">!</span>
            <span className="message" ref={el => this.flashMessage = el} />
          </div>
          <form action="/api/v1/users/login" method="POST"
          ref={el => this.loginForm = el}
          onSubmit={(e) => this.handleSubmit(e)}>
            <label>Email</label>
            <input type="text" name="email"
            placeholder="user@catapultsports.com"
            ref={el => this.emailField = el} />

            <label>Password</label>
            <input type="password" name="password"
            placeholder="•••••••••••••••"
            ref={el => this.passwordField = el} />

            <input type="submit" value="Log In" />
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
