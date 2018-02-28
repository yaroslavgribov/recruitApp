import React, { PureComponent, Fragment } from 'react';
import { Route, NavLink } from 'react-router-dom';
import Applicants from './Applicants';
import Users from './Users';

class Candidates extends PureComponent {
  render() {
    const { match } = this.props;

    return (
      <div className="inner container">
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
          render={props => 
            <Users {...props} />
          }
        />
        <Route exact path={match.url} render={props => <Applicants {...props} />} />
      </div>
    );
  }
}

export default Candidates;
