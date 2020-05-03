import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Spinner from "../../layout/Spinner";
import { getDeveloper } from "../../../actions/dev";
import Moment from "react-moment";

const Developer = ({ dev, computedMatch, getDeveloper }) => {
  const [exp, setExp] = useState(null);
  const [edu, setEdu] = useState(null);

  useEffect(() => {
    getDeveloper(computedMatch.params.id);

    if (dev.experience.length>0) {
      const exp = (
        <div
          className="flex mt-25 wow fadeInUp color-white media"
          data-wow-delay="0.2s"
        >
          <div className="media-object media-left">
            <i className="fa fa-laptop" />
          </div>

          <div className="non media-body">
            <h3 className="nomargin media-head ing">
              {dev.experience[0].jobtitle}{" "}
            </h3>
            <small>
              <strong className="strong-text">Company: </strong>{" "}
              {dev.experience[0].company}
            </small>
            <small>
              <strong className="strong-text">Location: </strong>{" "}
              {dev.experience[0].location}
            </small>
            <small>
              <strong className="strong-text"> Date: </strong>{" "}
              <Moment format="YYYY/MM/DD">{dev.experience[0].from}</Moment> -{" "}
              <Moment format="YYYY/MM/DD">{dev.experience[0].to}</Moment>
            </small>
            <small>
              <strong className="strong-text">Description: </strong>{" "}
              {dev.experience[0].jobdescription || "No description"}
            </small>
          </div>
        </div>
      );
      setExp(exp);
    }
    if (dev.education.length>0) {
      const edu = (
        <div
          className="flex mt-25 wow fadeInUp color-white media"
          data-wow-delay="0.2s"
        >
          <div className="media-object media-left">
            <i className="fa fa-laptop" />
          </div>

          <div className="non media-body">
            <h3 className="nomargin media-head ing">
              {dev.education[0].program}{" "}
            </h3>
            <small>
              <strong className="strong-text">Institution: </strong>{" "}
              {dev.education[0].institution}
            </small>
            <small>
              <strong className="strong-text">Location: </strong>{" "}
              {dev.education[0].location}
            </small>
            <small>
              <strong className="strong-text"> Date: </strong>{" "}
              <Moment format="YYYY/MM/DD">{dev.education[0].from}</Moment> -{" "}
              <Moment format="YYYY/MM/DD">{dev.education[0].to}</Moment>
            </small>
            <small>
              <strong className="strong-text">Description: </strong>{" "}
              {dev.education[0].eddescription || "No description"}
            </small>
          </div>
        </div>
      );
      setEdu(edu);
    }
  }, [getDeveloper]);
  return !dev ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="wow fadeInUp contact-inf o" data-wow-delay="0.2s">
        <div className="flex">
          <img className="avatar" src={dev.user.avatar} alt="" />
          <div className="flex-spec">
            <Link
              className="color-white home ml-10"
              to={`/developers/${dev._id}`}
            >
              <i className="rotate material-icons">send</i> back
            </Link>
          </div>
        </div>
        <div className="wow fadeInUp contact-info" data-wow-delay="0.2s">
          <h2 className=" color-black">{dev.user.name}</h2>
          <h3 className=" color-black">{dev.about.profession}</h3>
         
          <h3 className=" color-black"><u>Experience</u></h3>
          {exp? exp: <h4>No experience yet</h4>}
          <h3 className=" color-black"><u>Education</u></h3>
          {edu? edu: <h4>No education yet</h4>}
         
          <em>Note this information is not full, yet</em>
        </div>
      </div>
    </Fragment>
  );
};

Developer.propTypes = {
  dev: PropTypes.object,
  getDeveloper: PropTypes.func.isRequired
};
const mapStateToProps = state => {
  return {
    dev: state.dev.developer_single
  };
};
export default connect(
  mapStateToProps,
  { getDeveloper }
)(Developer);
