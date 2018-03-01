import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

import Header from '../components/Header';

import User from './User';
import Employer from './Employer';

import SignUp from './SignUp';
import Login from './Login';

import { retrieveToken, retrieveRole } from '../utils';
import { retrieveSession } from '../ducks/user';
import { roles } from '../constants/userRoles';

class Application extends Component {
  state = {
    username: null,
    jobs: []
  };

  componentDidMount() {
    const token = retrieveToken();
    const role = retrieveRole();

    if (token) {
      this.props.retrieveSession(role, token);
    }
  }

  render() {
    const { isAuthenticated, role, session } = this.props;

    return (
      <Router>
        <main>
          <Header
            isAuthenticated={isAuthenticated}
            session={session}
            role={role}
          />
          <Route path="/login" render={props => <Login {...props} />} />
          <Route path="/signup" component={SignUp} />

          <Route
            path="/employer"
            render={props =>
              isAuthenticated ? (
                <Employer {...props} />
              ) : (
                <Redirect
                  to={{
                    pathname: '/login',
                    state: { from: props.location }
                  }}
                />
              )
            }
          />

          <Route
            path="/user"
            render={props =>
              isAuthenticated ? (
                <User {...props} />
              ) : (
                <Redirect
                  to={{
                    pathname: '/login',
                    state: { from: props.location }
                  }}
                />
              )
            }
          />

          <Route
            exact
            path="/"
            render={props => {
              if (isAuthenticated) {
                if (role === roles.user) {
                  return <Redirect to="/user" />;
                } else {
                  return <Redirect to="/employer" />;
                }
              }

              return (
                <Redirect
                  to={{
                    pathname: '/login',
                    state: { from: props.location }
                  }}
                />
              );
            }}
          />
        </main>
      </Router>
    );
  }
}

export default connect(
  ({ user }) => ({
    isAuthenticated: !!user.session,
    session: user.session,
    role: user.role
  }),
  {
    retrieveSession
  }
)(Application);
