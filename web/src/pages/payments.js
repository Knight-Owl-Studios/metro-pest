import React, { Component } from 'react'
import { graphql } from 'gatsby'
import { TransitionGroup } from 'react-transition-group'
import axios from 'axios'

import BlockContent from '../components/block-content'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import SEO from '../components/seo'
import Heading from '../components/Heading'
import PaymentForm from '../components/PaymentForm'
import { title2 } from '../components/typography.module.css'
import Fade from '../components/Fade.transition'
import { input, submit } from '../components/PaymentForm/payment.module.css'

import Layout from '../containers/layout'

import { mapEdgesToNodes, filterOutDocsWithoutSlugs } from '../lib/helpers'

import { Elements, StripeProvider } from 'react-stripe-elements'

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
        title
      }
    }
  }
`

class PaymentPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      stripe: null,
      amount: undefined,
      paymentIntent: undefined,
      loading: false,
      error: ''
    }
    this.amountInput = React.createRef()

    this.updateAmount = this.updateAmount.bind(this)
    this.getPaymentIntent = this.getPaymentIntent.bind(this)
  }

  updateAmount() {
    this.setState(() => ({ amount: this.amountInput.current.value }))
  }

  async getPaymentIntent() {
    const { amount } = this.state

    if (!amount) {
      return this.setState(() => ({ error: 'Please indicate the amount on your invoice.' }))
    }

    this.setState(() => ({
      error: '',
      loading: true
    }))

    const { data } = await axios.post('/api/payments', { amount })

    if (data.status === 'error') {
      this.setState(() => ({ error: data.errors.map(e => e.message).join('\n') }))
    } else {
      this.setState(() => ({
        paymentIntent: data.payload.paymentIntent,
        stripe: window.Stripe(data.payload.key),
        error: '',
        loading: false
      }))
    }
  }

  render() {
    const { data, errors } = this.props

    if (errors) {
      return (
        <Layout>
          <GraphQLErrorList errors={errors} />
        </Layout>
      )
    }

    const page = data && data.page

    const personNodes =
      data && data.people && mapEdgesToNodes(data.people).filter(filterOutDocsWithoutSlugs)

    if (!page) {
      throw new Error(
        'Missing "Make a Payment" page data. Open the studio at http://localhost:3333 and add "Make a Payment" page data and restart the development server.'
      )
    }

    return (
      <StripeProvider stripe={this.state.stripe}>
        <Layout>
          <SEO title={page.title} />
          <Container>
            <Heading title={page.title} image={page.headingImage.asset.fluid} />
            <div className={styles.pageContent}>
              <TransitionGroup className="steps">
                <Fade active={!this.state.paymentIntent}>
                  <h2 className={title2}>Please specify the amount on your invoice</h2>
                  <div className={styles.amount}>
                    <i className={styles.dollar} />
                    <input
                      type="number"
                      className={input}
                      placeholder="Amount"
                      ref={this.amountInput}
                      onInput={this.updateAmount}
                    />
                  </div>

                  <button className={submit} onClick={this.getPaymentIntent}>
                    Next
                  </button>
                </Fade>

                <Fade active={this.state.paymentIntent}>
                  <Elements>
                    <PaymentForm
                      amount={this.state.amount}
                      paymentIntent={this.state.paymentIntent}
                    />
                  </Elements>
                </Fade>
              </TransitionGroup>
            </div>
          </Container>
        </Layout>
      </StripeProvider>
    )
  }
}

export default PaymentPage
