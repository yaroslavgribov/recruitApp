import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';

import List from '../components/List';

import { fetchUsers } from '../ducks/candidates';

class Users extends Component {
  componentDidMount() {
    this.props.fetchUsers();
  }

  render() {
    const { userList } = this.props;

    return (
      <Fragment>
        {userList ? (
          <List
            list={userList}
            renderImage={user => <img src={user.avatar.medium} />}
            renderContent={user => (
              <h3 className="item-name">
                {user.name}
                <small>{user.email}</small>
              </h3>
            )}
            renderActions={() => null}
          />
        ) : (
          <p>Loading...</p>
        )}
      </Fragment>
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
