import React from 'react';

const Dashboard = ({ name, ...rest }) => {
  return <div className="inner dashboard">Hello, {name}</div>;
};

export default Dashboard;
