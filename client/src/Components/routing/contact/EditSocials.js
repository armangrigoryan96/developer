import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import Alert from "../../layout/Alert";
import PropTypes from "prop-types";
import { backgroundChange } from "../../../actions/general";
import { addSocials } from "../../../actions/profile";

const EditSocials = ({
  backgroundChange,
  addSocials,
  currentContact
  //
}) => {
  const [formData, setFormData] = useState({
    facebook: "",
    instagram: "",
    twitter: "",
    linkedin: ""
  });
  const [isEdit, setEdit] = useState(false);

  useEffect(() => {
    backgroundChange("contact");
    if (currentContact) {
      setFormData(currentContact);
    }
    const formDataArrayed = Object.values(currentContact);
    setEdit(formDataArrayed.every(val => val === ""));
  }, [currentContact, backgroundChange]);

  const onChange = event => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const onSubmit = event => {
    event.preventDefault();
    addSocials(formData);
  };

  return (
    <Fragment>
      <div className="wow fadeInUp section-title" data-wow-delay="0.2s">
        <h1 className="color-white">
          {isEdit ? "Add" : "Edit"} Social Contact
        </h1>
      </div>

      <div id="contact-form">
        <Alert />
        <form onSubmit={e => onSubmit(e)}>
          <div className="wow fadeInUp" data-wow-delay="0.4s">
            <input
              name="facebook"
              type="url"
              className="form-control"
              placeholder="Your facebook page"
              value={formData.facebook}
              onChange={e => onChange(e)}
            />
          </div>
          <div className="wow fadeInUp" data-wow-delay="0.4s">
            <input
              name="instagram"
              type="url"
              className="form-control"
              placeholder="Your instagram page"
              value={formData.instagram}
              onChange={e => onChange(e)}
            />
          </div>
          <div className="wow fadeInUp" data-wow-delay="0.4s">
            <input
              name="twitter"
              type="url"
              className="form-control"
              placeholder="Your twitter page"
              value={formData.twitter}
              onChange={e => onChange(e)}
            />
          </div>
          <div className="wow fadeInUp" data-wow-delay="0.4s">
            <input
              name="linkedin"
              type="url"
              className="form-control"
              placeholder="Your linkedin page"
              value={formData.linkedin}
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
        </form>
      </div>
    </Fragment>
  );
};

EditSocials.propTypes = {
  backgroundChange: PropTypes.func.isRequired,
  addSocials: PropTypes.func.isRequired,
  currentContact: PropTypes.object
};

const mapStateToProps = state => {
  return {
    currentContact: state.profile.contact.socials
  };
};

export default connect(
  mapStateToProps,
  { backgroundChange, addSocials }
)(EditSocials);
