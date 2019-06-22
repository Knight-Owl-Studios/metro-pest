import React from "react";
import PropTypes from "prop-types";
import BlockContent from '../block-content';;

import styles from "./styles.module.css";

const About = ({ heading, body }) => (
  <section className={styles.about}>
    <div>
      <h2 className={styles.heading}>{heading}</h2>
      <BlockContent blocks={body} />
    </div>
  </section>
);

About.propTypes = {
  heading: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired
};

export default About;
