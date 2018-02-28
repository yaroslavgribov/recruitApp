import React from 'react';

const Dashboard = ({ name, ...rest }) => {
  return <div className="inner">Hello, {name}</div>;
};

export default Dashboard;
