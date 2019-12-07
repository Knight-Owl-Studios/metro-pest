import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import graphql from "graphql";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "reset.css";
import "./typography.css";
import "./global.css";

const TemplateWrapper = ({ data, children }) => (
  <div>
    <Helmet>
      <link
        href="https://fonts.googleapis.com/css?family=Lato:400|Montserrat:700"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Lato:700|Montserrat:600"
        rel="stylesheet"
        media="print"
        onload="this.media='all'"
      />
      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.1.0/css/all.css"
        integrity="sha384-lKuwvrZot6UHsBSfcMvOkWwlCMgc0TaWr+30HWe3a4ltaBwTZhyTEggF5tJv8tbt"
        crossorigin="anonymous"
        media="print"
        onload="this.media='all'"
      />
    </Helmet>

    <Navbar
      links={data.markdownRemark.frontmatter.nav}
      phone={data.markdownRemark.frontmatter.phone.default}
    />
    <div>{children()}</div>
    <Footer
      social={data.markdownRemark.frontmatter.social}
      links={data.markdownRemark.frontmatter.nav}
      geo={data.markdownRemark.frontmatter.geo}
    />
  </div>
);

TemplateWrapper.propTypes = {
  children: PropTypes.func
};

export default TemplateWrapper;

export const pageQuery = graphql`
  query SettingsQuery {
    markdownRemark(fields: { slug: { eq: "/settings/" } }) {
      frontmatter {
        nav {
          title
          path
        }
        phone {
          default
        }
        social {
          name
          img
          icon
          href
        }
        geo {
          title
          locations
        }
      }
    }
  }
`;
