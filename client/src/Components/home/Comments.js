import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { getMyComments } from "../../actions/dev";
import Spinner from "../layout/Spinner";

const Comments = ({ received_comments, getMyComments }) => {
  useEffect(() => {
    getMyComments();
    console.log({received_comments})
  }, []);

  return (
    <Fragment>
      <section id="quotes" className="parallax-section">
        <div className="overlay" />
        <div className="container">
          <div className="wow fadeInUp section-title" data-wow-delay="0.3s">
            <h1>People say about me</h1>
          </div>
          <div className="row">
            {received_comments === null ? (
              <Spinner />
            ) : received_comments.length === 0 ? (
              <h2>No Comments yet.</h2>
            ) : (
              received_comments.map((comment, key) => (
                <div key={key} className="col-md-offset-1 col-md-10 col-sm-12">
                  <i
                    className="wow fadeInUp fa fa-star"
                    data-wow-delay="0.3s"
                  />
                 { /*<Moment format="LLL" /> */}

                  <h3 className="wow fadeInUp" data-wow-delay="0.4s">
                    {comment.from.name}:
                  </h3>
                  <h4 className="wow fadeInUp" data-wow-delay="0.5s">
                    <em>{comment.message}</em>
                  </h4>
                </div>
              ))
            )}
            ;
          </div>
        </div>
      </section>
    </Fragment>
  );
};

Comments.propTypes = {
  received_comments: PropTypes.array,
  getMyComments: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    received_comments: state.dev.received_comments
  };
};

export default connect(
  mapStateToProps,
  { getMyComments }
)(Comments);
