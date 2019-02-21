import React from "react";
import PropTypes from "prop-types";
import Link from "gatsby-link";
import Img from 'gatsby-image';
import logo from '../../../static/img/logo-light.svg'

import "./Footer.styles.css";

const Footer = ({ social, links, geo }) => (
  <footer className="footer dark-bg">
    <div className="section">
      <nav className="footer__links-container">
        <div className="footer__text">
          <div className="footer__logo-container">
            <a href="/" className="footer__logo">
              <img src={logo} alt="Metro Pest Management" />
            </a>
          </div>
          <p className="footer__copyright">{`© ${new Date().getFullYear()} Metro Pest Management`}</p>
          {social && (
            <p className="footer__social-links">
              Follow Us:{" "}
              {social.map(link => (
                <a href={link.url} className="footer__social-link">
                  <Img
                    className="footer__social-img"
                    fixed={link.icon.asset.fixed}
                  />
                </a>
              ))}
            </p>
          )}
        </div>

        <ul className="footer__links">
          {links.map(({ path, title }) => (
            <li className="footer__link-container" key={title}>
              <Link className="footer__link" to={path}>
                {title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <ul className="footer__geo">
        {geo.map(({ county, cities }, i) => (
          <li
            className={`geo ${i === 0 ? "geo--double-wide" : ""}`}
            key={county}
          >
            <h5 className="geo__title">{county}</h5>
            <ul className="geo__locations">
              {cities.map((location, i) => (
                <li className="geo__location" key={location}>
                  {location}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  </footer>
);

Footer.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string,
      title: PropTypes.string
    })
  ),
  social: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string,
      href: PropTypes.string.isRequired,
      img: PropTypes.string,
      name: PropTypes.string
    })
  ),
  geo: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      locations: PropTypes.arrayOf(PropTypes.string)
    })
  )
};

Footer.defaultProps = {
  social: []
};

export default Footer;
