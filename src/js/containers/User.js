import React, { Component } from 'react';

import { Route, NavLink } from 'react-router-dom';

import { connect } from 'react-redux';

import Dashboard from '../components/Dashboard';
import Jobs from './Jobs';

class User extends Component {
  render() {
    const { match, session } = this.props;
    return (
      <div>
        <header className="navigation">
          <nav className="inner">
            <NavLink exact to={match.url} activeClassName="active">
              Dashboard
            </NavLink>
            <NavLink to={`${match.url}/jobs`} activeClassName="active">
              Jobs
            </NavLink>
          </nav>
        </header>
        <Route
          path={`${match.url}/jobs`}
          render={props => <Jobs {...props} />}
        />
        <Route
          exact
          path={match.url}
          render={props => <Dashboard name={session.name} {...props} />}
        />
      </div>
    );
  }
}

export default connect(({ user }) => ({
  session: user.session
}))(User);
