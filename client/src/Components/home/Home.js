import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import Alert from "../layout/Alert";
import { backgroundChange } from "../../actions/general";

const Home = ({ about, isAuthenticated, loading, user, backgroundChange }) => {
  useEffect(() => {
    backgroundChange("home");
  }, [backgroundChange]);

  return about === null ||
    user === null ||
    isAuthenticated === null ||
    loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <Alert />
      <img className= "avatar" src={user.avatar} alt=""/>
      <h2 className="wow fadeInUp" data-wow-delay="0.3s">
        {user.name}
      </h2>
      {about.profession&&<h4 className="wow fadeInUp" data-wow-delay="0.3s">
        <p className="color">profession: </p> {about.profession}
      </h4>}
      {about.age&&<h4 className="wow fadeInUp" data-wow-delay="0.6s">
        <p className="color">age: </p>{about.age}
      </h4>}
      {about.gender&&<h4 className="wow fadeInUp" data-wow-delay="0.6s">
        <p className="color">gender: </p>{about.gender}
      </h4>}
      {about.skills.length>0&&<h4 className="wow fadeInUp" data-wow-delay="0.6s">
        <p className="color">skills:</p>{" "}
        {about.skills.map((elem, i, arr) => {
          if (arr.length === i + 1) {
            return elem;
          }
          return `${elem}, `;
        })}
      </h4>}
      {about.hobbies.length>0&&<h4 className="wow fadeInUp" data-wow-delay="0.6s">
        <p className="color">hobbies:</p>{" "}
        {about.hobbies.map((elem, i, arr) => {
          if (arr.length === i + 1) {
            return elem;
          }
          return `${elem}, `;
        })}
      </h4>}
      {about.bio&&<h4 className="wow fadeInUp" data-wow-delay="0.6s">
        <p className="color">Biography: </p> {about.bio}
      </h4>}
    </Fragment>
  );
};

Home.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  user: PropTypes.object,
  backgroundChange: PropTypes.func.isRequired,
  about: PropTypes.object
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.auth.loading,
    user: state.auth.user,
    about: state.profile.about
  };
};

export default connect(
  mapStateToProps,
  { backgroundChange }
)(Home);
