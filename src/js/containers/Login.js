import React, { Component, Fragment } from 'react';

import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

import { logIn } from '../ducks/user';

import instance from '../axiosInstance';
import generateError from '../errors';
import { roles } from '../constants/userRoles';

class Login extends Component {
  logIn = event => {
    event.preventDefault();

    const { email, password, role } = event.target.elements;

    this.props.logIn(role.value, email.value, password.value);
  };

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };

    const { error, isAuthenticated } = this.props;

    if (isAuthenticated) {
      return <Redirect to={from} />;
    }

    return (
      <Fragment>
        <form className="form" onSubmit={this.logIn}>
          <header className="form-header">
            Please log in to proceed
          </header>

          <section className="form-content">
            <div className="form-field">
              <input className="form-control" type="email" name="email" />
            </div>
            <div className="form-field">
              <input className="form-control" type="password" name="password" />
            </div>
            <div className="form-field">
              <select className="form-control" name="role">
                <option value={roles.user}>User</option>
                <option value={roles.employer}>Employer</option>
              </select>
            </div>
          </section>

          <section className="form-footer">
            <button className="button button-primary" type="submit">
              Log In
            </button>
          </section>
        </form>
        {error && <p>{error}</p>}
      </Fragment>
    );
  }
}

export default connect(
  ({ user }) => ({
    error: user.error,
    isAuthenticated: !!user.session
  }),
  {
    logIn
  }
)(Login);
