import React from "react";
import PropTypes from "prop-types";
import BlockContent from '../block-content';

import "./About.styles.css";

const About = ({ heading, body }) => (
  <section className="about section">
    <div className="about__content">
      <h1 className="about__heading">{heading}</h1>
      <BlockContent  className="about__body" blocks={body} />
    </div>
  </section>
);

About.propTypes = {
  heading: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired
};

export default About;
