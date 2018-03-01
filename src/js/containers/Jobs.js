import React, { PureComponent, Fragment } from 'react';
import { Route, NavLink } from 'react-router-dom';

import { connect } from 'react-redux';
import JobOpenings from '../components/JobOpenings';
import JobApplications from '../components/JobApplications';

class Jobs extends PureComponent {
  render() {
    const { match } = this.props;

    return (
      <div className="container inner">
        <header className="navigation">
          <nav>
            <NavLink exact to={`${match.url}`} activeClassName="active">
              Openings
            </NavLink>
            <NavLink to={`${match.url}/applied`} activeClassName="active">
              Applied
            </NavLink>
          </nav>
        </header>
        <Route
          path={`${match.url}/applied`}
          render={props => <JobApplications {...props} />}
        />
        <Route exact path={match.url} render={() => <JobOpenings />} />
      </div>
    );
  }
}

export default connect()(Jobs);
// ({ jobs }) => ({
//   openings: jobs.openings,
//   applications: jobs.applications
// }),
// {
//   fetchJobs,
//   requestApplication,
//   cancelApplication
// }
