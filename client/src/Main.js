import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Route, Switch } from "react-router-dom";

// home, auth, layout Components
import Landing from "./Components/layout/Landing";
import Register from "./Components/auth/Register";
import Login from "./Components/auth/Login";
import Education from "./Components/home/Education";
import Experience from "./Components/home/Experience";
import Comments from "./Components/home/Comments";
import Contact from "./Components/home/Contact";
import Home from "./Components/home/Home";

//routing Components
import PrivateRoute from "./Components/routing/PrivateRoute";

import EditProfile from "./Components/routing/profile/EditProfile";
import EditAbout from "./Components/routing/profile/EditAbout";

import EditContact from "./Components/routing/contact/EditContact";
import Social from "./Components/routing/contact/EditSocials";

import AddExperience from "./Components/routing/experience/AddExperience";
import EditExperience from "./Components/routing/experience/EditExperience";

import AddEducation from "./Components/routing/education/AddEducation";
import EditEducation from "./Components/routing/education/EditEducation";

//guest Routes
import Developers from "./Components/routing/dev/Developers";
import Developer from "./Components/routing/dev/Developer";

// redux
import { connect } from "react-redux";
import DevMoreInfo from "./Components/routing/dev/DevMoreInfo";
import DevWrite from "./Components/routing/dev/DevWrite";

const Main = ({ isAuthenticated, background }) => {
  return (
    <Fragment>
      <section id="home" className="parallax-section contact">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-sm-6">
              <div className={`${background}-img`} />
            </div>
            <div className="col-md-6 col-sm-6">
              <div className="home-thumb">
                <div className="section-title">
                  <Switch>
                    <Route exact path="/" component={Landing} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/login" component={Login} />
                    {/* For logged in-s only */}
                    <PrivateRoute exact path="/home" component={Home} />
                    <PrivateRoute
                      exact
                      path="/profile"
                      component={EditProfile}
                    />
                    <PrivateRoute
                      exact
                      path="/profile/about"
                      component={EditAbout}
                    />
                    <PrivateRoute
                      exact
                      path="/experience"
                      component={AddExperience}
                    />
                    <PrivateRoute
                      exact
                      path="/experience/edit"
                      component={EditExperience}
                    />
                    <PrivateRoute
                      exact
                      path="/education"
                      component={AddEducation}
                    />
                    <PrivateRoute
                      exact
                      path="/education/edit"
                      component={EditEducation}
                    />
                    <PrivateRoute
                      exact
                      path="/contact"
                      component={EditContact}
                    />
                    <PrivateRoute
                      exact
                      path="/contact/socials"
                      component={Social}
                    />
                    <PrivateRoute
                      exact
                      path="/developers"
                      component={Developers}
                    />
                    <PrivateRoute
                      exact
                      path="/developers/:id"
                      component={Developer}
                    />
                    <PrivateRoute
                      exact
                      path="/developers/:id/info"
                      component={DevMoreInfo}
                    />

                    <PrivateRoute
                      exact
                      path="/developers/:id/write"
                      component={DevWrite}
                    />
                  </Switch>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {isAuthenticated && (
        <Fragment>
          <Experience />
          <Education />
          <Comments />
          <Contact />
        </Fragment>
      )}
    </Fragment>
  );
};

Main.propTypes = {
  isAuthenticated: PropTypes.bool,
  background: PropTypes.string.isRequired
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    background: state.general.background
  };
};
export default connect(mapStateToProps)(Main);
