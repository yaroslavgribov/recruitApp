import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import Dropdown from './Dropdown';

import { logOut } from '../ducks/user';

const Header = ({ isAuthenticated, session, logOut }) => {
  const name = session && session.name;

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
                    {!session.avatar.small.includes('missing') && (
                      <img className="user-image" src={session.avatar.small} />
                    )}
                    <span className="user-name">{session.name}</span>
                    <i className="icon-chevron-down" />
                  </Fragment>
                )}
              >
                <Link className="button button-link" to="/user/settings">
                  <i className="icon-settings" /> Settings
                </Link>
                <Link
                  to="/login"
                  type="button"
                  className="button button-link"
                  onClick={logOut}
                >
                  <i className="icon-log-out" /> Log Out
                </Link>
              </Dropdown>
            ) : (
              <Fragment>
                <Link className="button button-link" to="/signup">
                  Sign Up
                </Link>

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
    })
  }).isRequired
};

export default connect(null, {
  logOut
})(Header);
