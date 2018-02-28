import React, { Component } from 'react';

import Job from './Job';

const JobListing = ({ jobList, renderButton}) => {
  return (
    <div className="job-list">
      {jobList.map(job => (
        <Job key={job.id} job={job} renderButton={renderButton}/>
      ))}
    </div>
  );
};

export default JobListing;
