import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

import { logIn } from '../ducks/user';

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
          <header className="form-header">Please log in to proceed</header>

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
            <div className="form-field">
              {error && <p className="form-error">{error}</p>}
            </div>
          </section>

          <section className="form-footer">
            <button className="button button-primary" type="submit">
              Log In
            </button>
          </section>
        </form>
      </Fragment>
    );
  }
}

Login.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      from: PropTypes.object
    })
  }),
  error: PropTypes.string,
  isAuthenticated: PropTypes.bool,
  loggedOut: PropTypes.bool,

  logIn: PropTypes.func
};

export default connect(
  ({ user }) => ({
    error: user.error,
    isAuthenticated: !!user.session,
    loggedOut: user.loggedOut
  }),
  {
    logIn
  }
)(Login);
