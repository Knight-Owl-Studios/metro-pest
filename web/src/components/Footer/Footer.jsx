import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Img from 'gatsby-image'
import logo from '../../../static/img/logo-light.svg'

import styles from './Footer.module.css'

const Footer = ({ social, links, geo }) => (
  <footer className={styles.footer}>
    <div className={styles.container}>
      <nav className={styles.linksContainer}>
        <div className="text">
          <div className={styles.logoContainer}>
            <a href="/" className="logo">
              <img src={logo} alt="Metro Pest Management" />
            </a>
          </div>
          <p
            className={styles.copyright}
          >{`© ${new Date().getFullYear()} Metro Pest Management`}</p>
          {social && (
            <p className={styles.socialLinks}>
              Follow Us:{' '}
              {social.map(link => (
                <a href={link.url} className="social-link">
                  <Img className={styles.socialImg} fixed={link.icon.asset.fixed} />
                </a>
              ))}
            </p>
          )}
        </div>

        <ul className={styles.links}>
          {links.map(({ path, title }) => (
            <li className={styles.linkContainer} key={title}>
              <Link className={styles.link} to={path}>
                {title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className={styles.geoContainer}>
        <h4 className={styles.geoHeading}>Servicing the Following Areas</h4>
        <ul className={styles.geoList}>
          {geo.map(({ county, cities }, i) => (
            <li className={`${styles.geo} ${i === 0 ? styles.doubleWide : ''}`} key={county}>
              <h5 className={styles.geoTitle}>{county}</h5>
              <ul className={styles.geoLocations}>
                {cities.map((location, i) => (
                  <li className={styles.geoLocation} key={location}>
                    {location}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </footer>
)

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
}

Footer.defaultProps = {
  social: []
}

export default Footer
