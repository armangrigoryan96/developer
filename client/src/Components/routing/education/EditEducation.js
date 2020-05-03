import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import Alert from "../../layout/Alert";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom"
import { backgroundChange } from "../../../actions/general";
import {  editEducation } from "../../../actions/profile";
import Spinner from "../../layout/Spinner";
import { yyyymmdd} from '../../functions'

const EditEducation = ({
  education_single,
  editEducation,
  backgroundChange,
  redirect
}) => {
  
  const [formData, setFormData] = useState({
    program: "",
    institution: "",
    location: "",
    from: "",
    to: "",
    eddescription: ""
  });

  useEffect(() => {
    backgroundChange("education");
    if (education_single) {
      setFormData(education_single);
    }
  }, [backgroundChange, education_single]);

  const onChange = event => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const onSubmit = event => {
    event.preventDefault();
    editEducation(formData, education_single._id);
  };
  if(redirect){
    return <Redirect to="/home"/>
  }
  return !education_single ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="wow fadeInUp section-title" data-wow-delay="0.2s">
        <h1 className="color-white">Edit Education</h1>
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
              value={formData.program}
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
              value={formData.institution}

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
              name="eddescription"
              rows="3"
              className="form-control"
              placeholder="Description"
              onChange={e => onChange(e)}
              value={formData.eddescription}

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

EditEducation.propTypes = {
  backgroundChange: PropTypes.func.isRequired,
  editEducation: PropTypes.func.isRequired,
  education_single: PropTypes.object,
  redirect: PropTypes.string,
};

const mapStateToProps = state => {
  return {
    education_single: state.profile.education_single,
    redirect:state.general.redirect
  };
};

export default connect(
  mapStateToProps,
  { backgroundChange, editEducation }
)(EditEducation);
