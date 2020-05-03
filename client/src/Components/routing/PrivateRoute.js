import React  from "react";
import PropTypes from "prop-types";
// import Spinner from "../layout/Spinner";
import { Redirect } from 'react-router-dom'
import { connect } from "react-redux"

const PrivateRoute = ({ component: Component, loading, isAuthenticated, ...rest }) => {

  if (!isAuthenticated) {
   
    return <Redirect to="/" />;
  }
 

  return <Component {...rest}/>;
};

PrivateRoute.propTypes = {
    isAuthenticated: PropTypes.bool,
    loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        loading: state.auth.loading,
    }
}
export default connect(mapStateToProps)(PrivateRoute);
