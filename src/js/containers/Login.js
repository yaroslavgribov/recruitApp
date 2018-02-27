import React, { Component, Fragment } from 'react';

import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

import { createSession } from '../ducks/user';

import instance from '../axiosInstance';
import generateError from '../errors';

class Login extends Component {

  logIn = event => {
    event.preventDefault();

    const { email, password } = event.target.elements;

    this.props.createSession(email.value, password.value);
  };

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };

    const { error, isAuthenticated } = this.props;


    if (isAuthenticated) {
      return <Redirect to={from} />;
    }

    return (
      <Fragment>
        <form onSubmit={this.logIn}>
          <div>
            <input type="email" name="email" />
          </div>
          <div>
            <input type="password" name="password" />
          </div>
          <div>
            <button type="submit">Login</button>
          </div>
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
    createSession
  }
)(Login);
