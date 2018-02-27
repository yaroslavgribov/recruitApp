import React, { PureComponent, Fragment } from 'react';
import { Route, NavLink } from 'react-router-dom';

import { connect } from 'react-redux';
import JobOpenings from '../components/JobOpenings';

class Jobs extends PureComponent {
  render() {
    const { match } = this.props;

    return (
      <div className="inner container">
        <nav>
          <NavLink exact to={`${match.url}`} activeClassName="active">
            Openings
          </NavLink>
          <NavLink to={`${match.url}/applied`} activeClassName="active">
            Applied
          </NavLink>
        </nav>
        <Route
          path={`${match.url}/applied`}
          render={() => <h2> Applied Jobs </h2>}
        />
        <Route exact path={match.url} render={() => <JobOpenings />} />
      </div>
    );
  }
}

export default connect()(Jobs);
