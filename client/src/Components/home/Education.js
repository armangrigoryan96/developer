import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from 'react-router-dom'
import Spinner from "../layout/Spinner";
import Moment from "react-moment";
import { deleteEducation, getEducation } from "../../actions/profile";

const Education = ({ getEducation, deleteEducation, education, isAuthenticated, loading }) => {
  const [data, setData] = useState("");

  useEffect(() => {
    if (education) {
      const ed = education.map((val, key) => (
        <div
          key={key}
          className="flex mt-25 wow fadeInUp color-white media"
          data-wow-delay="0.3s"
        >
          <div className="media-object media-left">
            <i style={{ fontSize: "42px" }} className="material-icons">
              school
            </i>
    
          </div>
          <div className="non media-body">
            <h3 className="media-heading">{val.program} </h3>
            <small>
              <strong className="strong-text">Institution: </strong>{" "}
              {val.institution}
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
              {val.eddescription || "No description"}
            </small>
          </div>
          <div id={val._id} className="">
            <Link to="/home"
              
              onClick={e => {
                deleteEducation(e.target.parentNode.id);
              }}
              className="m-10 btn btn-danger"
            >
              delete
            </Link>
            <Link to="/education/edit" onClick={e => {
               document.body.scrollTop = 0; // For Safari
               document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera           
               getEducation(e.target.parentNode.id)
            
              }} 
              className="m-10 btn btn-warning">edit</Link>
          </div>
        </div>
      ));
      setData(ed);
    }
  }, [education]);
  return !education || !isAuthenticated ? (
    <Spinner />
  ) : (
    <Fragment>
      <section id="education" className="parallax-section">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-sm-6">
              <div className="color-white education-thumb">
                <div
                  className="wow fadeInUp section-title"
                  data-wow-delay="0.8s"
                >
                  <h1>My Education</h1>
                </div>
                {data.length === 0 ? (
                  <h3
                    data-wow-delay="0.8s"
                    className="wow fadeInUp section-title"
                  >
                    No education yet.
                  </h3>
                ) : (
                  data
                )}
              </div>
            </div>

            <div className="col-md-6 col-sm-6">
              <div className="background-image education-img parallax-section" />
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

Education.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  deleteEducation: PropTypes.func.isRequired,
  getEducation:PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.auth.loading,
    education: state.profile.education
  };
};

export default connect(mapStateToProps, { getEducation, deleteEducation })(Education);
