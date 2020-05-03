import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Spinner from "../../layout/Spinner";
import Alert from "../../layout/Alert";
import { sendComment } from "../../../actions/dev";

const DevWrite = ({ dev, sendComment }) => {
  const [message, setMessage] = useState("");
  return !dev ? (
    <Spinner />
  ) : (
    <div id="contact-form">
      <Alert />
      <form
        onSubmit={e => {
          e.preventDefault();
          sendComment(message, dev.user._id);
        }}
      >
        {" "}
        <div className="wow fadeInUp" data-wow-delay="0.6s">
          <h2 className="color-black">
            <i className="wow fadeInUp fa fa-star" data-wow-delay="0.3s" />
            Writing on {dev.user.name} wall will show others about your opinion
          </h2>
        </div>
        <div className="wow fadeInUp" data-wow-delay="0.6s">
          <textarea
            name="message"
            rows="5"
            className="form-control"
            placeholder={`Comment on ${dev.user.name}'s wall`}
            onChange={e => {
              setMessage(e.target.value);
            }}
          />
        </div>
        <div className=" wow fadeInUp" data-wow-delay="1s">
          <div className="wow fadeInUp col-md-6 col-sm-8" data-wow-delay="1s">
            <input
              name="submit"
              type="submit"
              className="form-control"
              value="Send"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

DevWrite.propTypes = {
  sendComment: PropTypes.func.isRequired,
  dev: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    dev: state.dev.developer_single,
    
  };
};

export default connect(
  mapStateToProps,
  { sendComment }
)(DevWrite);
