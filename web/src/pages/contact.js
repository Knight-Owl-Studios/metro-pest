import React from 'react'
import { graphql } from 'gatsby'
import cn from 'classnames'

import BlockContent from '../components/block-content'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import PeopleGrid from '../components/people-grid'
import SEO from '../components/seo'
import Heading from '../components/Heading'
import Layout from '../containers/layout'
import { mapEdgesToNodes, filterOutDocsWithoutSlugs } from '../lib/helpers'

import { title1 } from '../components/typography.module.css'
import AddressBlock from '../components/address-block'
import Form from '../components/Form'

import styles from './internal.module.css'
import contactStyles from './contact.module.css'

export const query = graphql`
  query ContactPageQuery {
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
    page: sanityPage(_id: { regex: "/(drafts.|)contact/" }) {
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
        title
      }
    }
  }
`

const ContactPage = props => {
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
      <SEO title={page.title} />
      <Container>
        <Heading title={page.title} image={page.headingImage.asset.fluid} />
        <div className={cn(styles.pageContent, contactStyles.container)}>
          <div className={contactStyles.column}>
            <BlockContent blocks={page._rawBody || []} />

            <AddressBlock
              email={companyInfo.email}
              name={companyInfo.name}
              address={companyInfo.address}
              city={companyInfo.city}
              state={companyInfo.state}
              zipCode={companyInfo.zipCode}
            />
          </div>
          <div className={contactStyles.divider} />
          <div className={contactStyles.column}>
            <Form />
          </div>
        </div>
      </Container>
    </Layout>
  )
}

export default ContactPage
