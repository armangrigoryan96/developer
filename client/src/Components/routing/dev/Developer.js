import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Spinner from "../../layout/Spinner";
import { getDeveloper } from "../../../actions/dev";

const Developer = ({ dev, computedMatch, getDeveloper }) => {
  useEffect(() => {
    getDeveloper(computedMatch.params.id);
  }, [getDeveloper]);
  return !dev ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="wow fadeInUp contact-inf o" data-wow-delay="0.2s">
        <div className="flex">
          <img className="avatar" src={dev.user.avatar} alt="" />
          <div className='flex-spec'>
            <Link className="color-white home ml-10" to="/developers">
              <i className="rotate material-icons">send</i> back
            </Link>
            <Link className="color-white home ml-10" to={`/developers/${dev._id}/write`}>
              <i className=" material-icons">send</i> write
            </Link>
            <Link
              className="color-white home ml-10"
              to={`/developers/${dev._id}/info`}
            >
              <i className=" material-icons">details</i> more info
            </Link>
          </div>
        </div>
        <div className="wow fadeInUp contact-info" data-wow-delay="0.2s">
          <h2 className=" color-black">{dev.user.name}</h2>
          <h3 className=" color-black">{dev.about.profession}</h3>
          {dev.about.skills.length > 0 && (
            <h4 className="color-white">
              Skills at{" "}
              {dev.about.skills.map((elem, key, arr) => {
                if (arr.length - 1 === key) {
                  return elem;
                }
                return `${elem}, `;
              })}
            </h4>
          )}

          {dev.about.hobbies.length > 0 && (
            <h4 className="color-white">
              Likes{" "}
              {dev.about.hobbies.map((elem, key, arr) => {
                if (arr.length - 1 === key) {
                  return elem;
                }
                return `${elem}, `;
              })}
            </h4>
          )}

          <p className=" color-white">{dev.about.bio}</p>
        </div>
        {(dev.contact.myoffice || dev.contact.location) && (
          <div className="wow fadeInUp contact-info" data-wow-delay="0.3s">
            <h3 className="nomargin color-black">
              Visit {dev.user.name.split(" ")[0]}
            </h3>
            {dev.contact.myoffice && <p>Office is {dev.contact.myoffice}</p>}
            <p>Lives in {dev.contact.location}</p>
          </div>
        )}
        <div className="wow fadeInUp contact-info" data-wow-delay="0.2s">
          <h3 className="nomargin color-black">
            Contact {dev.user.name.split(" ")[0]}
          </h3>

          {dev.contact.phone && (
            <p>
              <i className="fa fa-phone" /> {dev.contact.phone}
            </p>
          )}
          {dev.contact.email && (
            <p className="color-white">
              <i className="fa fa-envelope-o" />{" "}
              <Link className="color-white" to={`$mailto:${dev.contact.email}`}>
                {dev.contact.email}
              </Link>
            </p>
          )}
        </div>
        <ul
          className=" nomargin flex wow fadeInUp social-icon"
          data-wow-delay="0.2s"
        >
          {dev.contact.socials.facebook && (
            <li>
              <a
                href={dev.contact.socials.facebook}
                className="before-white nomargin fa fa-facebook"
                target="_blank"
                rel="noopener noreferrer"
              />
            </li>
          )}
          {dev.contact.socials.instagram && (
            <li>
              <a
                href={dev.contact.socials.instagram}
                className="before-white nomargin fa fa-instagram"
                target="_blank"
                rel="noopener noreferrer"
              />
            </li>
          )}
          {dev.contact.socials.twitter && (
            <li>
              <a
                href={dev.contact.socials.twitter}
                className="before-white nomargin fa fa-twitter"
                target="_blank"
                rel="noopener noreferrer"
              />
            </li>
          )}
          {dev.contact.socials.linkedin && (
            <li>
              <a
                href={dev.contact.socials.linkedin}
                className=" before-white nomargin fa fa-linkedin"
                target="_blank"
                rel="noopener noreferrer"
              />
            </li>
          )}
        </ul>
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
