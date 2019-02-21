import React from "react";
import PropTypes from "prop-types";
import Img from 'gatsby-image';
import classNames from 'classnames';

import PhoneNumbers from "../../components/PhoneNumbers";
import BlockContent from '../../components/block-content';

import { title1 } from '../../components/typography.module.css';
import "./Hero.styles.css";

const Hero = ({ heading, body, image, cta }) => (
  <section className="hero dark-bg">
    <Img className="hero_bg" fluid={image.asset.fluid} alt="" />
    <div className="hero__content">
      <h1 className={classNames("hero__heading", title1)}>{heading}</h1>
      <BlockContent className="hero__body" blocks={body} />
      <PhoneNumbers numbers={cta} />
    </div>
  </section>
);

Hero.propTypes = {
  heading: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired
};

export default Hero;
