import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import Dropdown from './Dropdown';

const Header = ({ isAuthenticated, session, logIn, logOut, signIn }) => {
  const name = session && session.name;

  return (
    <header className="header">
      <section className="inner">
        <section className="main-nav">
          <Link to="/" className="main-logo">
            RecruitApp
          </Link>
          <section className="actions">

            {isAuthenticated ? (
              <Dropdown label={name}>
                <Link to="/user/settings">
                  Settings
                </Link>
                <button className="link" onClick={logOut}>
                  Log Out
                </button>
              </Dropdown>
            ) : (
              <div>
                <Link to="/signin">Sign In</Link>
                
                <Link to="/login">
                  LogIn
                </Link>
              </div>
            )}
          </section>
        </section>
      </section>
    </header>
  );
};

Header.propTypes = {
  name: PropTypes.string,
  isAuthenticated: PropTypes.bool
};

export default connect(({ user }) => ({
  isAuthenticated: !!user.session,
  session: user.session
}))(Header);
