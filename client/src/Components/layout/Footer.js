import React from "react";
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-sm-12">
            <div className="wow fadeInUp footer-copyright" data-wow-delay="0.3s">
              <p className="gray">Copyright &copy; 2016 Your Company | Design: TemplateMo</p>
            </div>
            <ul className="wow fadeInUp social-icon" data-wow-delay="0.3s">
              <li>
                <Link to="!#" className="fa fa-facebook" />
              </li>
              <li>
                <Link to="!#" className="fa fa-twitter" />
              </li>
              <li>
                <Link to="!#" className="fa fa-google-plus" />
              </li>
              <li>
                <Link to="!#" className="fa fa-dribbble" />
              </li>
              <li>
                <Link to="!#" className="fa fa-linkedin" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
