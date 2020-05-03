import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import Alert from "../../layout/Alert";
import PropTypes from "prop-types";
import { backgroundChange } from "../../../actions/general"
import { addEducation } from "../../../actions/profile";

const AddEducation = ({ backgroundChange, addEducation }) => {
  useEffect(() => {
    backgroundChange("education");
  }, [backgroundChange]);
  const [formData, setFormData] = useState({
    program: "",
    institution: "",
    location: "",
    from: "",
    to: "",
    eddescription: ""
  });
  const onChange = event => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const onSubmit = event => {
    event.preventDefault();
    addEducation(formData);
  };

  return (
    <Fragment>
      <div className="wow fadeInUp section-title" data-wow-delay="0.2s">
        <h1 className="color-white">Add Education</h1>
      </div>

      <div id="contact-form">
        <Alert />
        <form onSubmit={e => onSubmit(e)}>
          <div className="wow fadeInUp" data-wow-delay="0.4s">
            <input
              name="program"
              type="text"
              className="form-control"
              placeholder="Your Study Program"
              required
              onChange={e => onChange(e)}
            />
          </div>
          <div className="wow fadeInUp" data-wow-delay="0.4s">
            <input
              name="institution"
              type="text"
              className="form-control"
              placeholder="Your Institution Name"
              required
              onChange={e => onChange(e)}
            />
          </div>
          <div className="wow fadeInUp" data-wow-delay="0.4s">
            <input
              name="location"
              type="text"
              className="form-control"
              placeholder="Location"
              onChange={e => onChange(e)}
            />

            <div className=" flex wow fadeInUp" data-wow-delay="0.4s">
              <div>
                <label className="label"> From</label>
                <input
                  className="special-input"
                  type="date"
                  name="from"
                  onChange={e => onChange(e)}
                />
              </div>
              <div className="pl-10">
                <label className="label"> To</label>

                <input
                  name="to"
                  type="date"
                  className="special-input "
                  onChange={e => onChange(e)}
                />
              </div>
            </div>
          </div>

          <div className="wow fadeInUp" data-wow-delay="1.2s">
            <textarea
              name="eddescription"
              rows="3"
              className="form-control"
              placeholder="Description"
              onChange={e => onChange(e)}
            />
          </div>

          <div className="wow fadeInUp col-md-6 col-sm-8" data-wow-delay="1.6s">
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

AddEducation.propTypes = {
  backgroundChange: PropTypes.func.isRequired,
  addEducation: PropTypes.func.isRequired
};

export default connect(
  null,
  { backgroundChange, addEducation }
)(AddEducation);
