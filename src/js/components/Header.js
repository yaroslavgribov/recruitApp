import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import Dropdown from './Dropdown';

import { logOut } from '../ducks/user';

const Header = ({ isAuthenticated, session, role, logOut }) => {
  return (
    <header className="header">
      <section className="inner">
        <section className="main-nav">
          <Link to="/" className="main-logo">
            RecruitApp
          </Link>
          <section className="main-nav-actions">
            {isAuthenticated ? (
              <Dropdown
                renderControl={() => (
                  <Fragment>
                    {role === 'user' && !session.avatar.small.includes('missing') && (
                      <img className="user-image" src={session.avatar.small} />
                    )}
                    {role === 'employer' && !session.logo.small.includes('missing') && (
                      <img className="user-image" src={session.logo.small} />
                    )}
                    <span className="user-name">{session.name}</span>
                    <i className="icon-chevron-down" />
                  </Fragment>
                )}
              >
                <button
                  type="button"
                  className="button button-link"
                  onClick={logOut}
                >
                  <i className="icon-log-out" /> Log Out
                </button>
              </Dropdown>
            ) : (
              <Fragment>
                <Link className="button button-link" to="/login">
                  Log In
                </Link>
              </Fragment>
            )}
          </section>
        </section>
      </section>
    </header>
  );
};

Header.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  session: PropTypes.shape({
    name: PropTypes.string,
    avatar: PropTypes.shape({
      small: PropTypes.string
    }),
  }),
  role: PropTypes.string,

  logOut: PropTypes.func
};

export default connect(null, {
  logOut
})(Header);
