import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import Alert from "../../layout/Alert";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom"
import { backgroundChange } from "../../../actions/general";
import {  editExperience } from "../../../actions/profile";
import Spinner from "../../layout/Spinner";
import { yyyymmdd} from '../../functions'

const EditExperience = ({
  experience_single,
  editExperience,
  backgroundChange,
  redirect
}) => {
  
  const [formData, setFormData] = useState({
    jobtitle: "",
    company: "",
    location: "",
    from: "",
    to: "",
    jobdescription: ""
  });

  useEffect(() => {
    backgroundChange("experience");
    if (experience_single) {
      setFormData(experience_single);
    }
  }, [backgroundChange, experience_single]);

  const onChange = event => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const onSubmit = event => {
    event.preventDefault();
    editExperience(formData, experience_single._id);
  };
  if(redirect){
    return <Redirect to="/home"/>
  }
  return !experience_single ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="wow fadeInUp section-title" data-wow-delay="0.2s">
        <h1 className="color-white">Edit Experience</h1>
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
              value={formData.jobtitle}
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
              value={formData.company}

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
              value={formData.location}

            />

            <div className=" flex wow fadeInUp" data-wow-delay="0.4s">
              <div>
                <label className="label"> From</label>
                <input
                  className="special-input"
                  type="date"
                  name="from"
                  onChange={e => onChange(e)}
                  value={yyyymmdd(formData.from)}
                  required
                />
              </div>
              <div className="pl-10">
                <label className="label"> To</label>

                <input
                  name="to"
                  type="date"
                  className="special-input "
                  onChange={e => onChange(e)}
                  value={yyyymmdd(formData.to)}
                    required
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
              value={formData.jobdescription}

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

EditExperience.propTypes = {
  backgroundChange: PropTypes.func.isRequired,
  editExperience: PropTypes.func.isRequired,
  experience_single: PropTypes.object,
  redirect: PropTypes.string,
};

const mapStateToProps = state => {
  return {
    experience_single: state.profile.experience_single,
    redirect:state.general.redirect
  };
};

export default connect(
  mapStateToProps,
  { backgroundChange, editExperience }
)(EditExperience);
