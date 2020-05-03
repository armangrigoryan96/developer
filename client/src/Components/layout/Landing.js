import React, { Fragment } from "react";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "./Spinner";
import Alert from './Alert'

const Landing = ({ isAuthenticated, loading }) => {
  if (!loading && isAuthenticated) {
    return <Redirect to="/home" />;
  }

  return isAuthenticated ? (
    <Spinner />
  ) : (
    <Fragment>
      <Alert />
      <h4 className="wow fadeInUp" data-wow-delay="0.3s">
        welcome to my website
      </h4>
      <h1 className="wow fadeInUp" data-wow-delay="0.6s">
        Hello, I am <strong>Stimulus</strong> currently based in New York city.
      </h1>
      <p className="wow fadeInUp" data-wow-delay="0.9s">
        Donec auctor arcu at efficitur lacinia. Praesent bibendum efficitur
        ipsum, et mattis tellus interdum in. Ut a dictum purus. Vestibulum non
        pellentesque felis, sed dignissim urna. Vestibulum id accumsan quam.
      </p>

      <Link
        to="/register"
        className="wow fadeInUp smoothScroll section-btn btn btn-success"
        data-wow-delay="1.4s"
      >
        Get Started
      </Link>
    </Fragment>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
  loading: PropTypes.bool.isRequired
};
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.auth.loading
  };
};

export default connect(mapStateToProps)(Landing);
