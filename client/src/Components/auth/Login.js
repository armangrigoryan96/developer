import React, { Fragment, useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Alert from "../layout/Alert";
import PropTypes from "prop-types";

//actions
import { login } from "../../actions/auth";

const Login = ({ login, isAuthenticated, loading }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const onChange = event => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const onSubmit = event => {
    event.preventDefault();
    login(formData);
    event.target.password.value = "";
  };

  if (isAuthenticated) {
    return <Redirect to="/home" />;
  }

  return (
    <Fragment>
      <div className="wow fadeInUp section-title" data-wow-delay="0.2s">
        <h1 className="color-white">Login</h1>
        <p className="color-white">
          Integer ut consectetur est. In cursus orci non ipsum gravida
          dignissim.
        </p>
      </div>

      <div id="contact-form">
        <Alert />
        <form onSubmit={e => onSubmit(e)}>
          <div className="wow fadeInUp" data-wow-delay="1.2s">
            <input
              name="email"
              type="email"
              className="form-control"
              id="email"
              placeholder="Your email"
              required
              onChange={e => onChange(e)}
            />
          </div>
          <div className="wow fadeInUp" data-wow-delay="1.2s">
            <input
              name="password"
              type="password"
              className="form-control"
              placeholder="Password"
              onChange={e => onChange(e)}
              required
            />
          </div>

          <div className="wow fadeInUp col-md-6 col-sm-8" data-wow-delay="1.6s">
            <input
              name="submit"
              type="submit"
              className="form-control"
              id="submit"
              value="Sign up"
            />
          </div>
        </form>
      </div>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.auth.loading
  };
};
export default connect(
  mapStateToProps,
  { login }
)(Login);
