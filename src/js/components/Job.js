import React from 'react';

const Job = ({
  id,
  name,
  employer,
  salary_from,
  salary_to,
  salary_currency,
  salary_type,
  subskill_list,
  description,

  applyProposal,

  ...rest
}) => {
  return (
    <article className="job" key={id}>
      <figure className="job-image">
        <img src={employer.logo.small} />
      </figure>
      <section className="job-content">
        <h3>
          {name} 
          <small>{employer.name}</small>
        </h3>
        <p>{employer.address}</p>
        <p>
          {salary_from} - {salary_to} {salary_currency} / {salary_type}{' '}
        </p>
        <p>{JSON.parse(description).join('').split(' ').slice(0, 25).join(' ')}...</p>
        <ul>
          {subskill_list
            .slice(0, 3)
            .map(skill => <li key={skill}> {skill} </li>)}
        </ul>
      </section>
      <section className="job-actions">
        <button type="button" onClick={() => applyProposal(id)}>
          Apply
        </button>
      </section>
    </article>
  );
};

export default Job;
