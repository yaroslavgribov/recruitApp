import React, { Component } from 'react';

import { connect } from 'react-redux';

import Job from './Job';

import { fetchJobs } from '../ducks/jobs';

class JobOpenings extends Component {
  componentDidMount() {
    this.props.fetchJobs();
  }

  applyProposal = (id) => {
    console.log(id);
  }

  render() {
    const { openings } = this.props;

    return (
      <div className="job-list">
        {openings &&
          openings.jobs.map(job => <Job key={job.id} {...job} applyProposal={this.applyProposal} />)}
      </div>
    );
  }
}

export default connect(
  ({ jobs }) => ({
    openings: jobs.openings
  }),
  {
    fetchJobs
  }
)(JobOpenings);
