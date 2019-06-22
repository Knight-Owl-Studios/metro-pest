import React from "react";
import PropTypes from "prop-types";
import Img from 'gatsby-image';

import BlockContent from '../block-content';
import styles from "./styles.module.css";

const Safety = ({ heading, body, image }) => (
  <section className={styles.base}>
    <div className={styles.content}>
      <h2 className={styles.heading}>{heading}</h2>
      <div className={styles.img}>
        <Img
          fluid={image.asset.fluid}
          alt="little girl holding puppy"
        />
      </div>
      <BlockContent blocks={body} />
    </div>
  </section>
);

Safety.propTypes = {
  heading: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired
};

export default Safety;
