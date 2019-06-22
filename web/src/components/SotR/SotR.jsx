import React from "react";
import PropTypes from "prop-types";
import Img from 'gatsby-image';

import BlockContent from '../block-content';
import styles from "./styles.module.css";

const SotR = ({ heading, body, image, phone }) => (
  <section className={styles.base}>
    <Img className={styles.bg} fluid={image.asset.fluid} />
    <div className={styles.content}>
      <h2 className={styles.heading}>{heading}</h2>
      <BlockContent blocks={body} />
    </div>
  </section>
);

SotR.propTypes = {
  heading: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired
};

export default SotR;
