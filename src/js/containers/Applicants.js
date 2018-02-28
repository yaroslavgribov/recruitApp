import React, { Component } from 'react';

import { connect } from 'react-redux';

import { fetchInterviews, rejectInterview } from '../ducks/interviews';
import { userTypes } from '../constants/userTypes';

class Applicants extends Component {
  componentDidMount() {
    this.props.fetchInterviews();
  }

  render() {
    const { requests } = this.props;
    return (
      <div>
        {requests &&
          requests.map(request => {
            return (
              <p key={request.id}>
                {request.user.name}
                <button
                  type="button"
                  onClick={() => {
                    this.props.rejectInterview(request.id);
                  }}
                >
                  reject
                </button>
              </p>
            );
          })}
      </div>
    );
  }
}

export default connect(
  ({ interviews }) => ({
    requests: interviews.requests
  }),
  {
    fetchInterviews,
    rejectInterview
  }
)(Applicants);
