import React from 'react';
import PropTypes from 'prop-types';

const Dashboard = ({ name }) => {
  return <div className="inner dashboard">Hello, {name}</div>;
};

Dashboard.propTypes = {
  name: PropTypes.string
};

export default Dashboard;
