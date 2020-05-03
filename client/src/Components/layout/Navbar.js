import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../actions/auth";
import Spinner from "../layout/Spinner";
import { topFunction } from "../functions";
import { getAllDevelopers } from "../../actions/dev";
const Navbar = ({ isAuthenticated, loading, logout, getAllDevelopers }) => {
  useEffect(() => {}, []);
  const guestLinks = (
    <ul className="nav navbar-nav navbar-right">
      <li>
        <Link
          onClick={() => topFunction()}
          to="/register"
          className="smoothScroll"
        >
          Register
        </Link>
      </li>
      <li>
        <Link
          onClick={() => topFunction()}
          to="/login"
          className="smoothScroll"
        >
          Login
        </Link>
      </li>
    </ul>
  );
  const profileLinks = (
    <ul className="nav navbar-nav navbar-right">
      <li>
        <Link onClick={() => topFunction()} to="/home" className="smoothScroll">
          Home
        </Link>
      </li>
      <li>
        <Link
          onClick={() => topFunction()}
          to="/profile"
          className="smoothScroll"
        >
          Profile
        </Link>
      </li>

      <li>
        <Link
          onClick={() => topFunction()}
          to="/experience"
          className="smoothScroll"
        >
          Experience
        </Link>
      </li>
      <li>
        <Link
          onClick={() => topFunction()}
          to="/education"
          className="smoothScroll"
        >
          Education
        </Link>
      </li>
      <li>
        <Link
          onClick={() => topFunction()}
          to="/contact"
          className="smoothScroll"
        >
          Contact
        </Link>
      </li>
      <li>
        <Link
          onClick={() => {
            topFunction();
            getAllDevelopers();
            
          }}
          to="/developers"
          className="smoothScroll"
        >
          Discover new stuff
        </Link>
      </li>

      <li>
        <Link to="/login" onClick={logout} className="smoothScroll">
          Log Out
        </Link>
      </li>
    </ul>
  );

  return (
    <div className="navbar navbar-fixed-top custom-navbar" role="navigation">
      <div className="container">
        <div className="navbar-header">
          <button
            className="navbar-toggle"
            data-toggle="collapse"
            data-target=".navbar-collapse"
          >
            <span className="icon icon-bar" />
            <span className="icon icon-bar" />
            <span className="icon icon-bar" />
          </button>
          <Link
            onClick={() => topFunction()}
            to={isAuthenticated ? "/home" : "/"}
            className="navbar-brand"
          >
            Developer
          </Link>
        </div>

        <div className="collapse navbar-collapse">
          {isAuthenticated === null || loading ? (
            <Spinner />
          ) : isAuthenticated === false ? (
            guestLinks
          ) : (
            profileLinks
          )}
        </div>
      </div>
    </div>
  );
};

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool,
  loading: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  getAllDevelopers: PropTypes.func.isRequired
};
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.auth.loading
  };
};
export default connect(
  mapStateToProps,
  { logout, getAllDevelopers }
)(Navbar);
