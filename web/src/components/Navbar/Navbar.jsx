import React, { Component } from "react";
import PropTypes from "prop-types";
import Link from "gatsby-link";
import classNames from "classnames";
import logo from '../../../static/img/logo-dark.svg'

import "./Navbar.styles.css";

export default class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };
  }

  toggleMenu = open => {
    return this.setState(
      () => ({ open: !this.state.open }),
      () => {
        document.body.style.overflow = !this.state.open ? "visible" : "hidden";
      }
    );
  };

  render() {
    const { links, phone } = this.props;

    return (
      <nav className="nav">
        <div className="nav__logo">
          <a href="/"><img src={logo} alt="Metro Pest Management" /></a>
        </div>

        <ul
          className={classNames("nav__links", {
            open: this.state.open
          })}
        >
          <li className="nav__close mobile">
            <a href="javascript:void(0)" onClick={this.toggleMenu}>
              <i className="fa fa-times" />
            </a>
          </li>
          {links.map(({ path, title }) => (
            <li key={title} className="nav__link-container">
              <Link to={path} className="nav__link">
                {title}
              </Link>
            </li>
          ))}
        </ul>

        <div className="nav__phone">
          <a href={`tel:${phone}`} className="nav__phone-link">
            {phone}
          </a>
        </div>

        <div className="mobile-icon mobile" onClick={this.toggleMenu}>
          <i className="fa fa-bars" />
        </div>
      </nav>
    );
  }
}

Navbar.defaultProps = {
  links: []
};

Navbar.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string,
      title: PropTypes.string
    })
  )
};
