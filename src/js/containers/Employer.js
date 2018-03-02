import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { NavLink, Route } from 'react-router-dom';

import { connect } from 'react-redux';

import Candidates from './Candidates';
import Dashboard from '../components/Dashboard';

class Employer extends Component {
  render() {
    const { match, session } = this.props;
    return (
      <div>
        <header className="navigation">
          <nav className="inner">
            <NavLink exact to={match.url} activeClassName="active">
              Dashboard
            </NavLink>
            <NavLink to={`${match.url}/candidates`} activeClassName="active">
              Candidates
            </NavLink>
          </nav>
        </header>

        <Route
          path={`${match.url}/candidates`}
          render={props => <Candidates {...props} />}
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

Employer.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string
  }),
  session: PropTypes.shape({
    name: PropTypes.string
  })
};

export default connect(({ user }) => ({
  session: user.session
}))(Employer);
