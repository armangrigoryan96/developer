import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";

const Contact = ({ contacts }) => {
  return !contacts ? (
    <Spinner />
  ) : (
    <Fragment>
      <section id="contact" className="parallax-section">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-sm-6">
              <div className="background-image contact-img" />
            </div>

            <div className="bg-dark col-md-6 col-sm-6">
              <div className="contact-thumb">
                <div
                  className="wow fadeInUp contact-info"
                  data-wow-delay="0.3s"
                  style = {{
                    display: 'flex'
                  }}
                >
                  <h2 className="color-white">Contacts</h2>
                  <Link
                    to="/contact"
                    onClick={e => {
                      document.body.scrollTop = 0; // For Safari
                      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
                     
                    }}
                    className="m-10 btn btn-warning"
                    style={{
                      alignSelf: 'center'
                    }}
                  >
                    edit
                  </Link>
                </div>

                {(contacts.myoffice || contacts.location) && (
                  <div
                    className="wow fadeInUp contact-info"
                    data-wow-delay="0.3s"
                  >
                    <h3 className="nomargin color-white">Visit me</h3>
                    {contacts.myoffice && (
                      <p>My office is {contacts.myoffice}</p>
                    )}
                    <p>I live in {contacts.location}</p>
                  </div>
                )}
                <div
                  className="wow fadeInUp contact-info"
                  data-wow-delay="0.2s"
                >
                  {contacts.phone && <h3 className="color-white">Phone</h3>}
                  {contacts.phone && (
                    <p>
                      <i className="fa fa-phone" /> {contacts.phone}
                    </p>
                  )}
                  {contacts.email && (
                    <p>
                      <i className="fa fa-envelope-o" />{" "}
                      <Link to={`$mailto:${contacts.email}`}>
                        {contacts.email}
                      </Link>
                    </p>
                  )}
                  {contacts.website && (
                    <p>
                      <i className="fa fa-globe" />{" "}
                      <a href={`${contacts.website}`}>{contacts.website}</a>
                    </p>
                  )} 
                </div>
                {contacts.socials && (
                  <div
                    className="wow fadeInUp contact-inf o"
                    data-wow-delay="0.2s"
                  >
                    <h3 className="color-white">Social Contacts</h3>

                    <ul
                      className=" nomargin flex wow fadeInUp social-icon"
                      data-wow-delay="0.2s"
                    >
                      {contacts.socials.facebook && (
                        <li>
                          <a
                            href={contacts.socials.facebook}
                            className="nomargin fa fa-facebook"
                            target="_blank"
                            rel="noopener noreferrer"
                          />
                        </li>
                      )}
                      {contacts.socials.instagram && (
                        <li>
                          <a
                            href={contacts.socials.instagram}
                            className="nomargin fa fa-instagram"
                            target="_blank"
                            rel="noopener noreferrer"
                          />
                        </li>
                      )}
                      {contacts.socials.twitter && (
                        <li>
                          <a
                            href={contacts.socials.twitter}
                            className="nomargin fa fa-twitter"
                            target="_blank"
                            rel="noopener noreferrer"
                          />
                        </li>
                      )}
                      {contacts.socials.linkedin && (
                        <li>
                          <a
                            href={contacts.socials.linkedin}
                            className="nomargin fa fa-linkedin"
                            target="_blank"
                            rel="noopener noreferrer"
                          />
                        </li>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

Contact.propTypes = {
  contact: PropTypes.object
};

const mapStateToProps = state => {
  return {
    contacts: state.profile.contact
  };
};

export default connect(mapStateToProps)(Contact);
