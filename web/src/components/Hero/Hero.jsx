import React from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'
import classNames from 'classnames'

import PhoneNumbers from '../../components/PhoneNumbers'
import PhoneNumbersShape from '../../components/PhoneNumbers/PhoneNumber.shape'
import BlockContent from '../../components/block-content'
import BlockContentShape from '../../components/block-content/block-content.shape'

import { title1 } from '../../components/typography.module.css'
import styles from './styles.module.css'

const Hero = ({ heading, body, image, cta }) => (
  <section className={styles.base}>
    <Img className={styles.bg} fluid={image.asset.fluid} alt="" />
    <div className={styles.content}>
      <h1 className={classNames(title1, styles.heading)}>{heading}</h1>
      <BlockContent className={styles.body} blocks={body} />
      <PhoneNumbers numbers={cta} />
    </div>
  </section>
)

Hero.propTypes = {
  heading: PropTypes.string.isRequired,
  body: BlockContentShape.isRequired,
  image: PropTypes.string.isRequired,
  cta: PropTypes.arrayOf(PhoneNumbersShape).isRequired
}

export default Hero
