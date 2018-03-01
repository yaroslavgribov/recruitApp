import React from 'react';

const Job = ({
  job,

  renderButton,

  ...rest
}) => {
  const {
    id,
    name,
    employer,
    salary_from,
    salary_to,
    salary_currency,
    salary_type,
    subskill_list,
    description
  } = job;
  return (
    <article className="job" key={id}>
      <figure className="job-image">
        <img src={employer.logo.small} />
      </figure>
      <section className="job-content">
        <h3 className="job-name">
          {name}
          <small>{employer.name}</small>
        </h3>
        <p>
          <i className="icon-map-pin" /> {employer.address}
        </p>
        <p>
          <strong>
            {salary_from} - {salary_to} {salary_currency}
          </strong>{' '}
          / {salary_type}{' '}
        </p>
        <p>
          {JSON.parse(description)
            .join('')
            .split(' ')
            .slice(0, 25)
            .join(' ')}...
        </p>
        <ul className="skills-list">
          {subskill_list.slice(0, 3).map(skill => (
            <li key={skill} className="skill">
              {skill}
            </li>
          ))}
          {subskill_list.length > 3 && (
            <li className="note">{subskill_list.length - 3} more</li>
          )}
        </ul>
      </section>
      <section className="job-actions">{renderButton(job)}</section>
    </article>
  );
};

export default Job;
