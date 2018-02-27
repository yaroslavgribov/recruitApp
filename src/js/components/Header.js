import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import Dropdown from './Dropdown';

const Header = ({ username, logIn, logOut, signIn }) => {
  return (
    <header className="header">
      <section className="inner">
        <section className="main-nav">
          <Link to="/" className="main-logo">
            RecruitApp
          </Link>
          <section className="actions">
            <Link to="/signin">Sign In</Link>
          
            {username ? (
              <Dropdown label={username}>
                <button className="">Settings</button>
                <button className="" onClick={logOut}>Log Out</button>
              </Dropdown>
            ) : (
              <button type="button" onClick={logIn}>LogIn</button>
            )}
          </section>
        </section>
      </section>
    </header>
  );
};

Header.propTypes = {
  username: PropTypes.string
};

export default Header;
