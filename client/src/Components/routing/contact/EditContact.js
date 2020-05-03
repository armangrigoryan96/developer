import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Moment from 'react-moment'
import Alert from "../../layout/Alert";
import PropTypes from "prop-types";
import { backgroundChange } from "../../../actions/general";
import { addContact } from "../../../actions/profile";

const EditContact = ({
  backgroundChange,
  addContact,
  currentContact: {
    myoffice,
    location,
    phone,
    email,
    website, 
    date
  }
}) => {
  const [formData, setFormData] = useState({
    myoffice: "",
    phone: "",
    location: "",
    email: "",
    website: "",
    date: ""
  });
  const [isEdit, setEdit] = useState(false);

  useEffect(() => {
    backgroundChange("contact");
    
    setFormData({
      myoffice,
      location,
      phone,
      email,
      website
    });

    const formDataArrayed = [myoffice, location, phone, email, website];
    setEdit(formDataArrayed.every(val => val === ""));
  }, [myoffice, location, phone, email, website, backgroundChange]);

  const onChange = event => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const onSubmit = event => {
    event.preventDefault();
    addContact(formData);
  };

  return (
    <Fragment>
      <div className="wow fadeInUp section-title" data-wow-delay="0.2s">
        <h1 className="color-white">{isEdit ? "Add" : "Edit"} Contact</h1>
      </div>

      <div id="contact-form">
        <Alert />
        <form onSubmit={e => onSubmit(e)}>
          <div className="wow fadeInUp" data-wow-delay="0.4s">
            <input
              name="myoffice"
              type="text"
              className="form-control"
              placeholder="Your office"
              value={formData.myoffice}
              onChange={e => onChange(e)}
            />
          </div>
          <div className="wow fadeInUp" data-wow-delay="0.4s">
            <input
              name="location"
              type="text"
              className="form-control"
              placeholder="Where you live"
              value={formData.location}
              onChange={e => onChange(e)}
            />
          </div>
          <div className="wow fadeInUp" data-wow-delay="0.4s">
            <input
              name="phone"
              type="tel"
              className="form-control"
              placeholder="Your phone number"
              value={formData.phone}
              onChange={e => onChange(e)}
            />
          </div>
          <div className="wow fadeInUp" data-wow-delay="0.4s">
            <input
              name="email"
              type="email"
              className="form-control"
              placeholder="Your email"
              value={formData.email}
              required
              onChange={e => onChange(e)}
            />
          </div>
          <div className="wow fadeInUp" data-wow-delay="0.4s">
            <input
              name="website"
              type="url"
              className="form-control"
              placeholder="Your website"
              value={formData.website}
              onChange={e => onChange(e)}
            />
          </div>

          <div className="wow fadeInUp col-md-6 col-sm-8" data-wow-delay="1s">
            <input
              name="submit"
              type="submit"
              className="form-control"
              value="Save Changes"
            />
          </div>
          <Link to="/contact/socials">
            <input
              name="socials_redirect"
              type="button"
              className="form-control"
              value="Add Social contacts"
            />
          </Link>
        </form>
        <em className="wow fadeInUp" data-wow-delay="1s">Last modified <Moment format="LLL">{date}</Moment></em>

      </div>
    </Fragment>
  );
};

EditContact.propTypes = {
  backgroundChange: PropTypes.func.isRequired,
  addContact: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    currentContact: state.profile.contact
  };
};

export default connect(
  mapStateToProps,
  { backgroundChange, addContact }
)(EditContact);
