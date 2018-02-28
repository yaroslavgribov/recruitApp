import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';

import JobListing from './JobList';
import Job from './Job';

import { fetchJobs, cancelApplication } from '../ducks/jobs';

import { jobTypes } from '../constants/jobTypes';

class JobApplications extends Component {
  componentDidMount() {
    this.props.fetchJobs(jobTypes.applications);
  }

  cancelProposal = job => {
    this.props.cancelApplication(job.application.id);
  };

  renderButton = () => job => {
    return (
      <button
        onClick={() => {
          this.cancelProposal(job);
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
    applications: jobs.applications
  }),
  {
    fetchJobs,
    cancelApplication
  }
)(JobApplications);
