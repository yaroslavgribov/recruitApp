import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
              <i className="icon-grid" /> Dashboard
            </NavLink>
            <NavLink to={`${match.url}/jobs`} activeClassName="active">
              <i className="icon-briefcase" /> Jobs
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

User.propTypes = {
  session: PropTypes.shape({
    name: PropTypes.string
  }),
  match: PropTypes.shape({
    url: PropTypes.string
  })
};

export default connect(({ user }) => ({
  session: user.session
}))(User);
