import React from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'
import styles from './heading.module.css'

const Heading = ({ title, image }) => (
  <header className={styles.container}>
    <Img className={styles.img} fluid={image} alt="" />
    <h1 className={styles.heading}>{title}</h1>
  </header>
)

Heading.propTypes = {
  title: PropTypes.string,
  image: PropTypes.shape({}) // gatsby image
}

export default Heading
