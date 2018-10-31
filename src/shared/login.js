import React from 'react';
import emailValidator from 'email-validator';
import { Link } from 'react-router-dom';
import './login.scss';

// TODO: make flash a class and state-machine for ease of modification
class Login extends React.Component {
  constructor(props) {
    super(props);

    this.flash = React.createRef();
    this.flashMessage = React.createRef();
    this.registerForm = React.createRef();

    this.emailField = React.createRef();
    this.passwordField = React.createRef();
  }

  componentDidMount() {
    if (__isBrowser__) {
      if (window.__REGISTER_SUCCESS__) {
        this.showFlash("Success! You may on login", 'success');
        window.__REGISTER_SUCCESS__ = null;
        return;
      }
    }
  }

  hideFlash() {
    this.flash.current.classList.remove('error');
    this.flash.current.classList.remove('warn');
    this.flash.current.classList.remove('error');
    this.flash.current.classList.add('hidden');
  }

  showFlash(message = "", style = "error") {
    this.flashMessage.current.innerHTML = message;
    this.flash.current.classList.remove('error');
    this.flash.current.classList.remove('warn');
    this.flash.current.classList.remove('error');
    this.flash.current.classList.remove('hidden');
    this.flash.current.classList.add(style);
  }

  handleSubmit(e) {
    e.preventDefault();

    const email = this.emailField.current.value.trim();
    const password = this.passwordField.current.value.trim();

    if (email.length < 1 || !/\S+@\S+/.test(email)) {
      this.showFlash("Hmm… that email seems off", 'error');
      return;
    }

    if (password.length < 1) {
      this.showFlash("Uh-oh, you need password!", 'error');
      return;
    }
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
          <div className="flash hidden" ref={this.flash}>
            <span className="attention">!</span>
            <span className="message" ref={this.flashMessage}></span>
          </div>
          <form action="/api/v1/users/login" method="POST"
          ref={this.loginForm} onSubmit={(e) => this.handleSubmit(e)}>
            <label>Email</label>
            <input type="text" name="email"
            placeholder="user@catapultsports.com"
            ref={this.emailField} />

            <label>Password</label>
            <input type="password" name="password"
            placeholder="•••••••••••••••"
            ref={this.passwordField} />

            <input type="submit" value="Log In" />
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
