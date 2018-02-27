import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

import Header from '../components/Header';
import SignIn from './SignIn';
import User from './User';
import Login from './Login';

import { retrieveToken, setTokenHeaders } from '../utils';
import { retrieveSession } from '../ducks/user';

class Application extends Component {
  state = {
    username: null,
    jobs: []
  };

  componentDidMount() {
    const token = retrieveToken();

    if (token) {
      setTokenHeaders();
      this.props.retrieveSession(token);
    }
  }

  render() {
    const { isAuthenticated } = this.props;

    return (
      <Router>
        <main>
          <Header
            username={this.state.username}
            logIn={this.logIn}
            logOut={this.logOut}
          />
          <Route
            path="/login"
            render={props => <Login logIn={this.logIn} {...props} />}
          />
          <Route path="/signin" component={SignIn} />
          <Route
            path="/user"
            render={props =>
              isAuthenticated ? (
                <User {...props} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            exact
            path="/"
            render={props =>
              isAuthenticated ? (
                <Redirect to="/user" />
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
        </main>
      </Router>
    );
  }
}

export default connect(
  ({ user }) => ({
    isAuthenticated: !!user.session
  }),
  {
    retrieveSession
  }
)(Application);
