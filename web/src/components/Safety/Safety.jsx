import React from "react";
import PropTypes from "prop-types";
import Img from 'gatsby-image';

import BlockContent from '../block-content';
import "./Safety.styles.css";

const Safety = ({ heading, body, image }) => (
  <section className="safety section">
    <div className="safety__content">
      <h2 className="safety__heading">{heading}</h2>
      <div className="safety__img-container">
        <Img
          fluid={image.asset.fluid}
          alt="little girl holding puppy"
          className="safety__img"
        />
      </div>
      <BlockContent className="safety__body" blocks={body} />
    </div>
  </section>
);

Safety.propTypes = {
  heading: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired
};

export default Safety;
