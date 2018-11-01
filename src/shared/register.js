import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { post } from './common/api';
import './register.scss';

class Register extends React.Component {
  componentDidMount() {
    this.hideFlash();
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

    const firstName = this.firstNameField.value.trim();
    const lastName = this.lastNameField.value.trim();
    const email = this.emailField.value.trim();
    const password = this.passwordField.value.trim();

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

    const request = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };

    post('/api/v1/user', request).then(result => {
      if (result.ok) {
        if (__isBrowser__) {
          window.__REGISTER_SUCCESS__ = true;
        }

        this.props.history.push('/login');
      } else {
        this.showFlash(result.msg.replace('ERROR: ', ''), 'error');
      }
    });
  }

  render() {
    return (
      <div className="register-view">
        <div className="view-container">
          <Link to="/" className="logo" />
          <form action="/api/v1/users/register" method="POST"
          ref={el => this.registerForm = el}
          onSubmit={(e) => this.handleSubmit(e)}>
            <div className="field-pair">
              <div className="field">
                <label>First Name</label>
                <input type="text" name="first-name"
                placeholder="Jane" ref={el => this.firstNameField = el} />
              </div>

              <div className="field">
                <label>Last Name</label>
                <input type="text" name="last-name"
                placeholder="Doe" ref={el => this.lastNameField = el} />
              </div>
            </div>

            <label>Email</label>
            <input type="text" name="email"
            placeholder="jdoe@catapultsports.com"
            ref={el => this.emailField = el} />

            <label>Password</label>
            <input type="password" name="password"
            placeholder="•••••••••••••••"
           ref={el => this.passwordField = el} />

            <div className="flash hidden" ref={el => this.flash = el}>
              <span className="attention">!</span>
              <span className="message" ref={el => this.flashMessage = el} />
            </div>

            <input type="submit" value="Get Started!" />
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(props => <Register {...props} />);

