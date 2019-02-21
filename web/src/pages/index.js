import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import { mapEdgesToNodes, filterOutDocsWithoutSlugs } from '../lib/helpers';
import BlogPostPreviewGrid from '../components/blog-post-preview-grid';
import Container from '../components/container';
import GraphQLErrorList from '../components/graphql-error-list';
import SEO from '../components/seo';
import Layout from '../containers/layout';

import Hero from "../components/Hero";
import About from "../components/About";
import SotR from "../components/SotR";
import Safety from "../components/Safety";
import Contact from "../components/Contact";

export const query = graphql`
  query IndexPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      seo {
        title
        description
        keywords
      }
    }
    home: sanityHomePage(_id: { regex: "/(drafts.|)homePage/" }) {
      cta {
        heading
        cta {
          number {
            number
          }
          heading
        }
      }
      hero {
        image {
          asset {
            fluid {
              ...GatsbySanityImageFluid
            }
          }
        }
        heading
        body {
          _type
          style
          children {
            _key
            _type
            text
          }
        }
        cta {
          heading
          number {
            number
          }
        }
      }
      needs {
        heading
        body {
          _type
          children {
            _key
            _type
            text
          }
        }
      }
      safety {
        heading
        body {
          _type
          children {
            _key
            _type
            text
          }
        }
        image {
          asset {
            fluid {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
      sotr {
        heading
        body {
          _type
          children {
            _type
            _key
            text
          }
        }
        image {
          asset {
            fluid {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
      seo {
        _type
        title
      }
    }
  }
`

export const IndexPage = ({ data, errors }) => {
  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }

  const { hero, needs, sotr, safety, cta } = data.home;

  const { title } = data.site.seo;
  return (
    <Layout id="homePage">
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <Hero {...hero} />
      <About {...needs} />
      <SotR {...sotr} />
      <Safety {...safety} />
      <Contact {...cta}/>
    </Layout>
  );
};

export default IndexPage
