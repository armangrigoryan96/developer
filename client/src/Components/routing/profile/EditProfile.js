import React, { Fragment, useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import Alert from "../../layout/Alert";
import PropTypes from "prop-types";
import { setAlert, backgroundChange } from "../../../actions/general";
import { editProfile, deleteProfile } from "../../../actions/auth";

const EditProfile = ({
  redirect,
  setAlert,
  editProfile,
  backgroundChange,
  currentProfile,
  deleteProfile
}) => {
  const [formData, setFormData] = useState({
    name: "",
    oldpassword: "",
    password: "",
    password2: ""
  });

  useEffect(() => {
    backgroundChange("profile");
    if (currentProfile) {
      setFormData(currentProfile);
    }
  }, [backgroundChange, currentProfile]);

  const onChange = event => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const onSubmit = event => {
    event.preventDefault();
    const { name, oldpassword, password, password2 } = formData;
    if (password !== password2) {
      setAlert("Passwords do not match!", "danger");
    } else {
      editProfile({ name, oldpassword, password });
    }
  };

  if (redirect) {
    return <Redirect to="/home" />;
  }
  return (
    <Fragment>
      <div className="wow fadeInUp section-title" data-wow-delay="0.2s">
        <h1 className="color-white">Edit Profile</h1>
      </div>

      <div id="contact-form">
        <Alert />
        <form onSubmit={e => onSubmit(e)}>
          <div className="wow fadeInUp" data-wow-delay="1.2s">
            <input
              name="name"
              type="text"
              className="form-control"
              placeholder="Your name"
              value={formData.name}
              required
              onChange={e => onChange(e)}
            />
          </div>
          <div className="wow fadeInUp" data-wow-delay="1.2s">
            <input
              name="oldpassword"
              type="password"
              className="form-control"
              placeholder="Old Password"
              onChange={e => onChange(e)}
              required
            />
          </div>
          <div className="wow fadeInUp" data-wow-delay="1.2s">
            <input
              name="password"
              type="password"
              className="form-control"
              placeholder="New Password"
              onChange={e => onChange(e)}
              required
            />
          </div>

          <div className="wow fadeInUp" data-wow-delay="1.2s">
            <input
              name="password2"
              type="password"
              className="form-control"
              placeholder="Confirm New Password"
              onChange={e => onChange(e)}
              required
            />
          </div>

          <div className=" flex wow fadeInUp" data-wow-delay="1.4s">
            <div
              className="wow fadeInUp col-md-6 col-sm-8"
              data-wow-delay="1.6s"
            >
              <input
                name="submit"
                type="submit"
                className="form-control"
                value="Save"
              />
            </div>

            <div
              className="wow fadeInUp col-md-6 col-sm-8"
              data-wow-delay="1.6s"
            >
              <Link to="/profile/about" className=" next form-control">
                Add Profile info
              </Link>
            </div>
          </div>
        </form>

        <form onSubmit={e=>{
          e.preventDefault();
          deleteProfile()
        }}>
          <div className="center flex wow fadeInUp" data-wow-delay="1.4s">
            <div
              className="wow fadeInUp col-md-6 col-sm-8"
              data-wow-delay="1.6s"
            >
              <input
                name="delete"
                type="submit"
                className="delete form-control"
                value="Delete Profile"
              />
            </div>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

EditProfile.propTypes = {
  setAlert: PropTypes.func.isRequired,
  editProfile: PropTypes.func.isRequired,
  deleteProfile: PropTypes.func.isRequired,
  redirect: PropTypes.string.isRequired,
  backgroundChange: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    redirect: state.general.redirect,
    currentProfile: state.auth.user
  };
};

export default connect(
  mapStateToProps,
  { setAlert, editProfile, backgroundChange, deleteProfile }
)(EditProfile);
