import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import Alert from "../../layout/Alert";
import PropTypes from "prop-types";
import { backgroundChange } from "../../../actions/general";
import { addExperience } from "../../../actions/profile";

const AddExperience = ({ backgroundChange, addExperience }) => {
  useEffect(() => {
    backgroundChange("experience");
  }, [backgroundChange]);
  const [formData, setFormData] = useState({
    jobtitle: "",
    company: "",
    location: "",
    from: "",
    to: "",
    jobdescription: ""
  });
  const onChange = event => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const onSubmit = event => {
    event.preventDefault();
    addExperience(formData);
  };

 
  return (
    <Fragment>
      <div className="wow fadeInUp section-title" data-wow-delay="0.2s">
        <h1 className="color-white">Add Experience</h1>
      </div>

      <div id="contact-form">
        <Alert />
        <form onSubmit={e => onSubmit(e)}>
          <div className="wow fadeInUp" data-wow-delay="0.4s">
            <input
              name="jobtitle"
              type="text"
              className="form-control"
              placeholder="Job title"
              required
              onChange={e => onChange(e)}
            />
          </div>
          <div className="wow fadeInUp" data-wow-delay="0.4s">
            <input
              name="company"
              type="text"
              className="form-control"
              placeholder="Company"
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
              name="jobdescription"
              rows="3"
              className="form-control"
              placeholder="Job description"
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

AddExperience.propTypes = {
  backgroundChange: PropTypes.func.isRequired,
  addExperience: PropTypes.func.isRequired
};



export default connect(
  null,
  { backgroundChange, addExperience }
)(AddExperience);
