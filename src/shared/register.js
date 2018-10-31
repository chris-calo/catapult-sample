import React from 'react';
import { Link } from 'react-router-dom';
import './register.scss';

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.flash = React.createRef();
    this.flashMessage = React.createRef();
    this.registerForm = React.createRef();

    this.firstNameField = React.createRef();
    this.lastNameField = React.createRef();
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

    const firstName = this.firstNameField.current.value.trim();
    const lastName = this.lastNameField.current.value.trim();
    const email = this.emailField.current.value.trim();
    const password = this.passwordField.current.value.trim();

    if (firstName.length < 1) {
      this.showFlash("Weird… you must have a name!", 'error');
    }

    if (lastName.length < 1) {
      this.showFlash("Uh-oh, you forgot your last name", 'error');
    }

    if (email.length < 1 || !/\S+@\S+/.test(email)) {
      this.showFlash("Hmm… you missed your email", 'error');
      return;
    }

    if (password.length < 1) {
      this.showFlash("Hey, we need a password!", 'error');
      return;
    }
  }

  render() {
    return (
      <div className="register-view">
        <div className="view-container">
          <Link to="/" className="logo" />
          <form action="/api/v1/users/register" method="POST"
          ref={this.registerForm} onSubmit={(e) => this.handleSubmit(e)}>
            <div className="field-pair">
              <div className="field">
                <label>First Name</label>
                <input type="text" name="first-name"
                placeholder="Jane" ref={this.firstNameField} />
              </div>

              <div className="field">
                <label>Last Name</label>
                <input type="text" name="last-name"
                placeholder="Doe" ref={this.lastNameField} />
              </div>
            </div>

            <label>Email</label>
            <input type="text" name="email"
            placeholder="jdoe@catapultsports.com"
            ref={this.emailField} />

            <label>Password</label>
            <input type="password" name="password"
            placeholder="•••••••••••••••"
           ref={this.passwordField} />

            <div className="flash hidden" ref={this.flash}>
              <span className="attention">!</span>
              <span className="message" ref={this.flashMessage}></span>
            </div>

            <input type="submit" value="Get Started!" />
          </form>
        </div>
      </div>
    );
  }
}

export default Register;

