import React from 'react'
import { graphql } from 'gatsby'

import Fragments from '../components/Fragments';
import BlockContent from '../components/block-content'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import SEO from '../components/seo'
import Heading from '../components/Heading'
import Layout from '../containers/layout'
import { mapEdgesToNodes, filterOutDocsWithoutSlugs, snakeToCamelObject } from '../lib/helpers'

import styles from './internal.module.css'

export const query = graphql`
  query AboutPageQuery {
    page: sanityPage(_id: { regex: "/(drafts.|)about/" }) {
      id
      _id
      title
      _rawBody
      headingImage {
        asset {
          fluid {
            ...GatsbySanityImageFluid
          }
        }
      }
      seo {
        ...SEOFragment
      }
      social {
        ...SocialFragment
      }
    }
  }
`

const AboutPage = props => {
  const { data, errors } = props

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }

  const page = data && data.page

  if (!page) {
    throw new Error(
      'Missing "About" page data. Open the studio at http://localhost:3333 and add "About" page data and restart the development server.'
    )
  }

  return (
    <Layout>
      <SEO {...page.seo} {...snakeToCamelObject(page.social)} />
      <Container>
        <Heading title={page.title} image={page.headingImage.asset.fluid} />
        <div className={styles.pageContent}>
          <BlockContent blocks={page._rawBody || []} />
        </div>
      </Container>
    </Layout>
  )
}

export default AboutPage
