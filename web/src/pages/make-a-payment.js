import React from 'react'
import { graphql } from 'gatsby'

import { snakeToCamelObject } from '../lib/helpers'

import Container from '../components/container'
import SEO from '../components/seo'
import Heading from '../components/Heading'
import BlockContent from '../components/block-content'
import Layout from '../containers/layout'

import styles from './internal.module.css'

export const query = graphql`
  query PaymentPageQuery {
    page: sanityPage(_id: { regex: "/(drafts.|)payment/" }) {
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


const PaymentPage = ({ data }) => {
  const page = data && data.page

  if (!page) {
    throw new Error(
      'Missing "Make a Payment" page data. Open the studio at http://localhost:3333 and add "Make a Payment" page data and restart the development server.'
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

export default PaymentPage
