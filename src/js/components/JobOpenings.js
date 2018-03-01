import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';

import JobListing from './JobList';
import Job from './Job';

import { fetchJobs, requestApplication } from '../ducks/jobs';

import { jobTypes } from '../constants/jobTypes';

class JobOpenings extends Component {
  componentDidMount() {
    this.props.fetchJobs(jobTypes.openings);
  }

  renderButton = () => job => {
    return (
      <button
        className="button button-action"
        onClick={() => this.props.requestApplication(job.id)}
      >
        Apply
      </button>
    );
  };

  render() {
    const { openings } = this.props;

    const availableJobs =
      !!openings &&
      openings.filter(
        job => !job.application || job.application.state === 'withdrawn'
      );

    return (
      <Fragment>
        {openings ? (
          <JobListing
            jobList={availableJobs}
            renderButton={this.renderButton()}
          />
        ) : (
          <p>Loading...</p>
        )}
      </Fragment>
    );
  }
}

export default connect(
  ({ jobs }) => ({
    openings: jobs.openings
  }),
  {
    fetchJobs,
    requestApplication
  }
)(JobOpenings);
