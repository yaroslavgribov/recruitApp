import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';

import List from './List';

class JobListing extends PureComponent {
  renderImage = job => {
    return (
      <figure className="item-image">
        <img src={job.employer.logo.small} />
      </figure>
    );
  };

  renderContent = job => {
    return (
      <Fragment>
        <h3 className="item-name">
          {job.name}
          <small>{job.employer.name}</small>
        </h3>
        <p>
          <i className="icon-map-pin" /> {job.employer.address}
        </p>
        <p>
          <strong>
            {job.salary_from} - {job.salary_to} {job.salary_currency}
          </strong>{' '}
          / {job.salary_type}{' '}
        </p>
        <p>
          {JSON.parse(job.description)
            .join('')
            .split(' ')
            .slice(0, 25)
            .join(' ')}...
        </p>
        <ul className="skills-list">
          {job.subskill_list.slice(0, 3).map(skill => (
            <li key={skill} className="skill">
              {skill}
            </li>
          ))}
          {job.subskill_list.length > 3 && (
            <li className="note">{job.subskill_list.length - 3} more</li>
          )}
        </ul>
      </Fragment>
    );
  };

  render() {
    return (
      <List
        list={this.props.list}
        renderImage={this.renderImage}
        renderContent={this.renderContent}
        renderActions={this.props.renderButton}
      />
    );
  }
}

JobListing.propTypes = {
  list: PropTypes.array,
  renderButton: PropTypes.func
};

export default JobListing;
