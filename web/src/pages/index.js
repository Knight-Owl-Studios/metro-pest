import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import { mapEdgesToNodes, filterOutDocsWithoutSlugs } from '../lib/helpers'
import BlogPostPreviewGrid from '../components/blog-post-preview-grid'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import SEO from '../components/seo'
import Layout from '../containers/layout'

import Hero from '../components/Hero'
import About from '../components/About'
import SotR from '../components/SotR'
import Safety from '../components/Safety'
import Contact from '../components/Contact'

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
      heroHeading
      heroImage {
        asset {
          fluid {
            ...GatsbySanityImageFluid
          }
        }
      }
      _rawHeroBody
      heroCta {
        heading
        number {
          number
        }
      }

      servicesHeading
      _rawServicesBody

      aboutHeading
      _rawAboutBody
      aboutImage {
        asset {
          fluid {
            ...GatsbySanityImageFluid
          }
        }
      }

      safetyHeading
      _rawSafetyBody
      safetyImage {
        asset {
          fluid {
            ...GatsbySanityImageFluid
          }
        }
      }

      ctaHeading
      ctaPhone {
        number {
          number
        }
        heading
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

  const { title } = data.site.seo
  return (
    <Layout id="homePage">
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <Hero
        heading={data.home.heroHeading}
        body={data.home._rawHeroBody}
        image={data.home.heroImage}
        cta={data.home.heroCta}
      />
      <About heading={data.home.servicesHeading} body={data.home._rawServicesBody} />
      <SotR
        heading={data.home.aboutHeading}
        body={data.home._rawAboutBody}
        image={data.home.aboutImage}
      />
      <Safety
        heading={data.home.safetyHeading}
        body={data.home._rawSafetyBody}
        image={data.home.safetyImage}
      />
      <Contact heading={data.home.ctaHeading} cta={data.home.ctaPhone} />
    </Layout>
  )
}

export default IndexPage
