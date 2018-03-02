import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import JobListing from './JobListing';

import { fetchJobs, cancelApplication } from '../ducks/jobs';

import { jobTypes } from '../constants/jobTypes';

class JobApplications extends Component {
  componentDidMount() {
    this.props.fetchJobs(jobTypes.applications);
  }

  renderButton = job => {
    return (
      <button
        className="button button-action"
        onClick={() => {
          this.props.cancelApplication(job.application.id);
        }}
      >
        Cancel
      </button>
    );
  };

  render() {
    const { applications } = this.props;

    const availableJobs =
      !!applications &&
      applications.filter(job => {
        return (
          job.application.state !== 'withdrawn' &&
          job.application.state !== 'rejected'
        );
      });

    return (
      <Fragment>
        {applications ? (
          <JobListing
            list={availableJobs}
            renderButton={this.renderButton}
          />
        ) : (
          <p>Loading...</p>
        )}
      </Fragment>
    );
  }
}

JobApplications.propTypes = {
  applications: PropTypes.array,

  fetchJobs: PropTypes.func,
  cancelApplication: PropTypes.func
};

export default connect(
  ({ jobs }) => ({
    applications: jobs.applications
  }),
  {
    fetchJobs,
    cancelApplication
  }
)(JobApplications);
