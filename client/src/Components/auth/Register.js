import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import Alert from "../layout/Alert";
import PropTypes from "prop-types";
import { Redirect } from 'react-router-dom'

//actions
import { setAlert } from "../../actions/general";
import { register } from "../../actions/auth";

const Register = ({ register, setAlert, isAuthenticated, loading }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
   
  });
  const onChange = event => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const onSubmit = event => {
    event.preventDefault();
    if (formData.password !== formData.password2) {
      setAlert("Passwords do not match", "danger");
    } else {
      const { name, email, password} = formData;
      register({ name, email, password });
    }
  };

  
  if (isAuthenticated) {
    return <Redirect to="/home" />;
  }
  return (
    <Fragment>
      <div className="wow fadeInUp section-title" data-wow-delay="0.2s">
        <h1 className="color-white">Register</h1>
        <p className="color-white">
          Integer ut consectetur est. In cursus orci non ipsum gravida
          dignissim.
        </p>
      </div>

      <div id="contact-form">
        <Alert />
        <form onSubmit={e => onSubmit(e)}>
          <div className="wow fadeInUp" data-wow-delay="1s">
            <input
              name="name"
              type="text"
              className="form-control"
              id="fullname"
              placeholder="Your name"
              onChange={e => onChange(e)}
            />
          </div>
          <div className="wow fadeInUp" data-wow-delay="1.2s">
            <input
              name="email"
              type="email"
              className="form-control"
              id="email"
              placeholder="Your email"
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
            />
          </div>
          <div className="wow fadeInUp" data-wow-delay="1.2s">
            <input
              name="password2"
              type="password"
              className="form-control"
              placeholder="Confirm password"
              onChange={e => onChange(e)}
            />
          </div>
         

          <div className="wow fadeInUp col-md-6 col-sm-8" data-wow-delay="1.6s">
            <input
              name="submit"
              type="submit"
              className="form-control"
              value="Sign up"
            />
          </div>
        </form>
      </div>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
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
  { register, setAlert }
)(Register);
