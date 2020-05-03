import React ,{useEffect}from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types'
import { Link } from "react-router-dom";
import Spinner from "../../layout/Spinner";



const Developers = ({ developers }) => {
  // useEffect(() => {
  //   console.log(developers)
  // }, [])

  return !developers ? (
    <Spinner /> 
  ) : (
    <div className="developers">
      
      <h2 className="dev-title">Other Developers</h2>
      {developers.map((dev, key) => (
        <Link to={`/developers/${dev._id}`} key={key} className="dev">
          <img className="dev-img" src={dev.user.avatar} alt="" />
          <div className="dev-info">
            <h3 className="nomargin">{dev.user.name}</h3>
            {dev.about.profession ? (
              <h4 className="nopadding nomargin">{dev.about.profession}</h4>
            ) : (
              <h4 className="nopadding nomargin">New user</h4>
            )}
          </div>
        </Link>
      ))}
       <Link className="color-white home" to="/home">
          <i className="material-icons home">home</i> home
        </Link>
    </div>
  );
};

Developers.propTypes={
  developers: PropTypes.array,
}
const mapStateToProps = state => {
  return {
    developers: state.dev.developers
  };
};
export default connect(mapStateToProps)(Developers);
