import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import List from '../components/List';

import { fetchInterviews, rejectInterview } from '../ducks/interviews';

class Applicants extends Component {
  componentDidMount() {
    this.props.fetchInterviews();
  }

  render() {
    const { requests } = this.props;

    return (
      <Fragment>
        {requests ? (
          <List
            list={requests}
            renderImage={request => <img src={request.user.avatar.medium} />}
            renderContent={request => (
              <h3 className="item-name">
                {request.user.name}
                <small>{request.job.name}</small>
              </h3>
            )}
            renderActions={request => (
              <button
                type="button"
                className="button button-action"
                onClick={() => {
                  this.props.rejectInterview(request.id);
                }}
              >
                Reject
              </button>
            )}
          />
        ) : (
          <p>Loading...</p>
        )}
      </Fragment>
    );
  }
}

Applicants.propTypes = {
  requests: PropTypes.array,

  fetchInterviews: PropTypes.func,
  rejectInterview: PropTypes.func
};

export default connect(
  ({ interviews }) => ({
    requests: interviews.requests
  }),
  {
    fetchInterviews,
    rejectInterview
  }
)(Applicants);
