import React from 'react'
import { graphql } from 'gatsby'
import cn from 'classnames'
import { snakeToCamelObject } from '../lib/helpers'

import BlockContent from '../components/block-content'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import SEO from '../components/seo'
import Heading from '../components/Heading'
import Layout from '../containers/layout'

import Form from '../components/Form'

import styles from './internal.module.css'

export const query = graphql`
  query ServicesPageQuery {
    companyInfo: sanityCompanyInfo {
      name
      address
      city
      state
      zipCode
      email
    }
    phone: allSanityPhonenumber {
      edges {
        node {
          id
          area
          number
        }
      }
    }
    page: sanityPage(_id: { regex: "/(drafts.|)services/" }) {
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

const ServicesPage = props => {
  const { data, errors } = props

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }

  const page = data && data.page
  const companyInfo = data && data.companyInfo

  return (
    <Layout>
      <SEO {...page.seo} {...snakeToCamelObject(page.social)} />
      <Container>
        <Heading title={page.title} image={page.headingImage.asset.fluid} />
        <div className={cn(styles.pageContent)}>
          <BlockContent blocks={page._rawBody || []} />
        </div>
      </Container>
    </Layout>
  )
}

export default ServicesPage
