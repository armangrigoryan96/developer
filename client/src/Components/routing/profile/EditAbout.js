import React, { Fragment, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Alert from "../../layout/Alert";
import PropTypes from "prop-types";
import { backgroundChange } from "../../../actions/general";
import { editAbout } from "../../../actions/profile";
import Moment from 'react-moment'
import {getAge, yyyymmdd} from '../../functions'

const EditAbout = ({
  redirect,
  editAbout,
  backgroundChange,
  currentAbout
}) => {
  const [formData, setFormData] = useState({
    birth: "",
    gender: "",
    profession: "",
    hobbies: "",
    skills: "",
    bio: "",
    date: ""
  });

  useEffect(() => {
    backgroundChange("profile");
    if (currentAbout) {
      setFormData(currentAbout);
    }
    
  }, [backgroundChange, currentAbout]);



  
  
  const onChange = event => {
    setFormData({ ...formData, [event.target.name]: event.target.value });

  };

  const onSubmit = event => {
    event.preventDefault();
    let {
      birth,
      gender,
      profession,
      skills,
      hobbies,
      bio
    } = formData;
    const age = getAge(birth);
    editAbout({
      birth,
      age,
      gender,
      profession,
      skills,
      hobbies,
      bio
    });
  };

  if (redirect) {
    return <Redirect to="/home" />;
  }
  return (
    <Fragment>
      <div className="wow fadeInUp section-title" data-wow-delay="0.2s">
        <h1 className="color-white">Edit About</h1>
      </div>

      <div id="contact-form">
        
        <Alert />
        <form onSubmit={e => onSubmit(e)}>
          <div className="  wow fadeInUp" data-wow-delay="0.4s">
            <label className="pr-10">Your birth date</label>
            <input
              className="special-input"
              type="date"
              name="birth"
              onChange={e => onChange(e)}
              value={yyyymmdd(formData.birth)}
            />
          </div>
          <div className=" flex wow fadeInUp" data-wow-delay="0.3s">
            <div className=" pr-10 wow fadeInUp" data-wow-delay="0.5s">
              <input
                type="radio"
                name="gender"
                value="male"
                className="form-radio"
                id="male"
                onChange={e => onChange(e)}
                checked={formData.gender==="male"&&"checked"}
              />
              <label htmlFor="male">male</label>
            </div>
            <div className="pr-10 wow fadeInUp" data-wow-delay="0.5s">
              <input
                type="radio"
                name="gender"
                value="female"
                className="form-radio radio-one"
                id="female"
                onChange={e => onChange(e)}
                checked={formData.gender==="female" && "checked"}

              />
              <label htmlFor="female">female</label>
            </div>
            <div className="pr-10 wow fadeInUp" data-wow-delay="0.5s">
              <input
                type="radio"
                name="gender"
                value="other"
                className="form-radio radio-one"
                id="other"
                onChange={e => onChange(e)}
                checked={formData.gender==="other"&&"checked"}

              />
              <label htmlFor="other">other</label>
            </div>
          </div>
          <div className="wow fadeInUp" data-wow-delay="0.5s">
            <input
              name="profession"
              type="text"
              className="form-control"
              placeholder="Your profession."
              value={formData.profession}
              onChange={e => onChange(e)}
          
            />
          </div>
          <div className="wow fadeInUp" data-wow-delay="0.6s">
            <input
              name="skills"
              type="text"
              className="form-control"
              placeholder="Your skills (e.g, HTML, CSS, JS)."
              value={formData.skills}
              onChange={e => onChange(e)}
              

            />
          </div>
          <div className="wow fadeInUp" data-wow-delay="0.6s">
            <input
              name="hobbies"
              type="text"
              className="form-control"
              placeholder="Your hobbies (e.g, Reading, Gym, Pool)."
              value={formData.hobbies}
              onChange={e => onChange(e)}
            />
          </div>
          <div className="wow fadeInUp" data-wow-delay="0.6s">
            <textarea
              name="bio"
              type="text"
              className="form-control"
              placeholder="Your short bio."
              value={formData.bio}
              onChange={e => onChange(e)}
            />
          </div>

          <div className=" flex wow fadeInUp" data-wow-delay="1s">
            <div className="wow fadeInUp col-md-6 col-sm-8" data-wow-delay="1s">
              <input
                name="submit"
                type="submit"
                className="form-control"
                value="Save changes"
              />
            </div>
          </div>
        </form>

        <em className="wow fadeInUp" data-wow-delay="1s">Last modified <Moment format="LLL">{formData.date}</Moment></em>

      </div>
    </Fragment>
  );
};

EditAbout.propTypes = {
  editAbout: PropTypes.func.isRequired,
  redirect: PropTypes.string.isRequired,
  backgroundChange: PropTypes.func.isRequired,
  currentAbout: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    redirect: state.general.redirect,
    currentAbout: state.profile.about
  };
};

export default connect(
  mapStateToProps,
  {  editAbout, backgroundChange }
)(EditAbout);
