import React, { useEffect } from 'react'
import { graphql } from 'gatsby'

import { snakeToCamelObject } from '../lib/helpers'
import useScript from '../lib/helpers'

import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import SEO from '../components/seo'
import Heading from '../components/Heading'

import Layout from '../containers/layout'

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

const PAYMENT_OPTIONS = {
  iframeHelperURL: 'https://example.com/helper.html',
  url: 'https://payments.worldpay.com/ngpp/integration/wpg/corporate?OrderKey=YOUR_ORDER_KEY&Ticket=YOUR_TICKET_ID',
  type: 'iframe',
  inject: 'onload',
  target: 'paymentForm',
  accessibility: true,
  debug: false,
  language: 'en',
  country: 'US',
  preferredPaymentMethod: 'VISA-SSL',
  successURL: '/success',
  cancelURL: '/cancel',
  failureURL: '/failure',
  pendingURL: '/pending',
  errorURL: '/error'
}

const PaymentPage = ({ data, errors }) => {
  const status = useScript('https://payments.worldpay.com/resources/hpp/integrations/embedded/js/hpp-embedded-integration-library.js')
  const [init, setInit] = useState(false)

  useEffect(() => {
    if (!init && status === 'ready' && typeof window.WPCL !== undefined) {

    }
  }, [status])

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
      'Missing "Make a Payment" page data. Open the studio at http://localhost:3333 and add "Make a Payment" page data and restart the development server.'
    )
  }

  return (
    <Layout>
      <SEO {...page.seo} {...snakeToCamelObject(page.social)} />
      <Container>
        <Heading title={page.title} image={page.headingImage.asset.fluid} />
        <div id="paymentForm"></div>
      </Container>
    </Layout>
  )
}

export default PaymentPage
