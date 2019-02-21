import React from "react";
import PropTypes from "prop-types";
import Img from 'gatsby-image';

import BlockContent from '../block-content';
import "./SotR.styles.css";

const SotR = ({ heading, body, image, phone }) => (
  <section className="sotr dark-bg">
    <Img className="sotr_bg" fluid={image.asset.fluid} />
    <div className="sotr__content section">
      <h2 className="sotr__heading">{heading}</h2>
      <BlockContent className="sotr__body" block={body} />
    </div>
  </section>
);

SotR.propTypes = {
  heading: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired
};

export default SotR;
