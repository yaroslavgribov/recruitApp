import React, { Component } from 'react';

import { connect } from 'react-redux';

import { fetchUsers } from '../ducks/candidates';
import { userTypes } from '../constants/userTypes';

class Users extends Component {
  componentDidMount() {
    this.props.fetchUsers();
  }

  render() {
    const { userList } = this.props;
    return (
      <div>
        {userList &&
          userList.map(user => {
            return <p>{user.name}</p>;
          })}
      </div>
    );
  }
}

export default connect(
  ({ candidates }) => ({
    userList: candidates.users
  }),
  {
    fetchUsers
  }
)(Users);
