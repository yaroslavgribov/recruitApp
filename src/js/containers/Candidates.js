import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Route, NavLink } from 'react-router-dom';

import Applicants from './Applicants';
import Users from './Users';

class Candidates extends PureComponent {
  render() {
    const { match } = this.props;

    return (
      <div className="container inner">
        <header className="navigation">
          <nav>
            <NavLink exact to={`${match.url}`} activeClassName="active">
              Applicants
            </NavLink>
            <NavLink to={`${match.url}/users`} activeClassName="active">
              Users
            </NavLink>
          </nav>
          <Route
            path={`${match.url}/users`}
            render={props => <Users {...props} />}
          />
          <Route
            exact
            path={match.url}
            render={props => <Applicants {...props} />}
          />
        </header>
      </div>
    );
  }
}

Candidates.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string
  })
};

export default Candidates;
