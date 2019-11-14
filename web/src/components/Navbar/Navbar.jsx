import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import classNames from 'classnames'
import logo from '../../../static/img/logo-dark.svg'

import styles from './Navbar.module.css'

export default class Navbar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false
    }
  }

  toggleMenu = open => {
    return this.setState(
      () => ({ open: !this.state.open }),
      () => {
        document.body.style.overflow = !this.state.open ? 'visible' : 'hidden'
      }
    )
  }

  componentWillUnmount() {
    document.body.style.overflow = 'visible';
  }

  render() {
    const { links, phone } = this.props

    return (
      <nav className={styles.container}>
        <div className={styles.logo}>
          <a href="/" className={styles.logoLink}>
            <img src={logo} alt="Metro Pest Management" />
          </a>
        </div>

        <ul
          className={classNames(styles.links, {
            [styles.linksOpen]: this.state.open
          })}
        >
          <li className={styles.closeContainer}>
            <a className={styles.close} href="javascript:void(0)" onClick={this.toggleMenu}>
              <i className="fa fa-times" />
            </a>
          </li>
          {links.map(({ path, title, mobile }) => (
            <li key={title} className={styles.linkContainer}>
              <Link to={path} className={classNames(styles.link, { [styles.mobileOnly]: mobile })}>
                {title}
              </Link>
            </li>
          ))}
        </ul>

        <div className={styles.phoneContainer}>
          <a href={`tel:${phone}`} className={styles.phone}>
            {phone}
          </a>
        </div>

        <div className={styles.mobileMenu} onClick={this.toggleMenu}>
          <i className="fa fa-bars" />
        </div>
      </nav>
    )
  }
}

Navbar.defaultProps = {
  links: []
}

Navbar.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string,
      title: PropTypes.string,
      mobile: PropTypes.bool
    })
  )
}
