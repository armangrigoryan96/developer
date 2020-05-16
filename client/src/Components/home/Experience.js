import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from 'react-router-dom'
import Spinner from "../layout/Spinner";
import Moment from "react-moment";
import { deleteExperience, getExperience } from "../../actions/profile";

const Experience = ({
  experiences,
  deleteExperience,
  isAuthenticated,
  getExperience,

}) => {
  const [data, setData] = useState("");
 
  useEffect(() => {
    if (experiences) {
      const exp = experiences.map((val, key) => (
        <div
          key={key}
          className="flex mt-25 wow fadeInUp color-white media"
          data-wow-delay="0.2s"
        >
          <div className="media-object media-left">
            <i className="fa fa-laptop" />
          </div>

          <div className="non media-body">
            <h3 className="nomargin media-head ing">{val.jobtitle} </h3>
            <small>
              <strong className="strong-text">Company: </strong> {val.company}
            </small>
            <small>
              <strong className="strong-text">Location: </strong> {val.location}
            </small>
            <small>
              <strong className="strong-text"> Date: </strong>{" "}
              <Moment format="YYYY/MM/DD">{val.from}</Moment> -{" "}
              <Moment format="YYYY/MM/DD">{val.to}</Moment>
            </small>
            <small>
              <strong className="strong-text">Description: </strong>{" "}
              {val.jobdescription || "No description"}
            </small>
          </div>
          <div id={val._id} className="">
            <Link to="/home"
              
              onClick={e => {
                deleteExperience(e.target.parentNode.id);
              }}
              className="m-10 btn btn-danger"
            >
              delete
            </Link>
            <Link to="/experience/edit" onClick={e => {
               document.body.scrollTop = 0; // For Safari
               document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera           
               getExperience(e.target.parentNode.id)
            
              }} 
              className="m-10 btn btn-warning">edit</Link>
          </div>
        </div>
      ));
      setData(exp);
    }
  }, [experiences]);

  return experiences === null || !isAuthenticated ? (
    <Spinner />
  ) : (
    <Fragment>
      <section id="experience" className=" backgr-grey parallax-section">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-sm-6">
              <div className="background-image experience-img parallax-section" />
            </div>
            <div className="col-md-6 col-sm-6">
              <div className="color-white experience-thumb">
                <div
                  className="wow fadeInUp section-title"
                  data-wow-delay="0.8s"
                >
                  <h1>My Experiences</h1>
                </div>
                {data.length === 0 ? (
                  <h3
                    data-wow-delay="0.8s"
                    className="wow fadeInUp section-title"
                  >
                    No experience yet.
                  </h3>
                ) : (
                  data
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

Experience.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  experience: PropTypes.object,
  deleteExperience: PropTypes.func.isRequired,
  getExperience: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.auth.loading,
    experiences: state.profile.experience,
  };
};

export default connect(
  mapStateToProps,
  { deleteExperience,  getExperience  }
)(Experience);
