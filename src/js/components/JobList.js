import React, { Component } from 'react';

import { connect } from 'react-redux';

import Job from './Job';

import { fetchJobs, requestApplication } from '../ducks/jobs';

const JobListing = ({ jobList, renderButton, handleAction }) => {
  return (
    <div className="job-list">
      {jobList.map(job => (
        <Job key={job.id} job={job} renderButton={renderButton}/>
      ))}
    </div>
  );
};

export default JobListing;
