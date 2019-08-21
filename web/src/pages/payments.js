import React, { Component } from 'react'
import { graphql } from 'gatsby'
import { TransitionGroup } from 'react-transition-group'
import axios from 'axios'
import { TextInputField, Button } from 'evergreen-ui'

import BlockContent from '../components/block-content'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import SEO from '../components/seo'
import Heading from '../components/Heading'
import PaymentForm from '../components/PaymentForm'
import { title2, paragraph, small } from '../components/typography.module.css'
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

const marginTop = { marginTop: '25px' }

class PaymentPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      stripe: null,
      amount: undefined,
      paymentIntent: null,
      loading: false,
      invoiceNumber: '',
      firstName: '',
      lastName: '',
      streetAddress: '',
      zipCode: '',
      errors: {}
    }

    this.getPaymentIntent = this.getPaymentIntent.bind(this)
    this.updateFormData = this.updateFormData.bind(this)
  }

  updateAmount() {
    this.setState(() => ({ amount: this.amountInput.current.value }))
  }

  async getPaymentIntent() {
    if (this.validate()) {
      const { amount, invoiceNumber, firstName, lastName, streetAddress, zipCode } = this.state

      this.setState(() => ({
        error: '',
        loading: true
      }))

      const { data } = await axios.post('/api/payments', {
        amount,
        metadata: {
          invoiceNumber,
          firstName,
          lastName,
          streetAddress,
          zipCode
        }
      })

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
  }

  validate() {
    this.setState({ errors: {} })

    if (this.state.amount && this.state.invoiceNumber) {
      return true
    }

    if (
      this.state.amount &&
      this.state.firstName &&
      this.state.lastName &&
      this.state.streetAddress &&
      this.state.zipCode
    ) {
      return true
    }

    if (
      !this.state.invoiceNumber &&
      !this.state.firstName &&
      !this.state.lastName &&
      !this.state.streetAddress &&
      !this.state.zipCode
    ) {
      this.setState(() => ({
        errors: {
          all: 'You must specify an invoice number or the service address'
        }
      }))

      return false
    }

    const errs = Object.keys(this.state)
      .filter(k => k !== 'invoiceNumber' && !this.state[k])
      .reduce((errors, key) => {
        return {
          ...errors,
          [key]: 'This is a required property when not using an invoice number'
        }
      }, {})

    this.setState(() => ({ errors: errs }))

    return false
  }

  hasErrors() {
    for (let key of Object.keys(this.state.errors)) {
      if (this.state.errors[key]) {
        return true
      }
    }

    return false
  }

  updateFormData(e) {
    this.setState({ [e.target.name]: e.target.value })
    if (this.hasErrors()) {
      this.validate()
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
                {!this.state.paymentIntent && (
                  <Fade active>
                    <h2 className={title2}>Enter details about your service.</h2>
                    <p className={small} style={marginTop}>
                      Enter the amount listed on your invoice.
                    </p>
                    <div style={marginTop}>
                      <TextInputField
                        type="number"
                        label="Amount"
                        name="amount"
                        placeholder="50.00"
                        onInput={this.updateFormData}
                        isInvalid={!!(this.state.errors.amount || this.state.errors.all)}
                        validationMessage={this.state.errors.amount}
                      />

                      <p className={small} style={marginTop}>
                        Next, enter either invoice number, or service address:
                      </p>
                      <br />

                      {this.state.errors.all && (
                        <p className={small} style={{ color: 'red' }}>
                          {this.state.errors.all}
                        </p>
                      )}

                      <div className="split">
                        <div className="column">
                          <div className="row">
                            <TextInputField
                              label="Invoice Number"
                              name="invoiceNumber"
                              onInput={this.updateFormData}
                              isInvalid={
                                !!(this.state.errors.invoiceNumber || this.state.errors.all)
                              }
                              validationMessage={this.state.errors.invoiceNumber}
                            />
                          </div>
                        </div>

                        <div style={{ margin: '25px 0' }}>or</div>

                        <div className="column">
                          <p className={small}>Service Address</p>
                          <TextInputField
                            label="First Name"
                            name="firstName"
                            onInput={this.updateFormData}
                            isInvalid={!!(this.state.errors.firstName || this.state.errors.all)}
                            validationMessage={this.state.errors.firstName}
                          />
                          <TextInputField
                            label="Last Name"
                            name="lastName"
                            onInput={this.updateFormData}
                            isInvalid={!!(this.state.errors.lastName || this.state.errors.all)}
                            validationMessage={this.state.errors.lastName}
                          />
                          <TextInputField
                            label="Street Address"
                            name="streetAddress"
                            onInput={this.updateFormData}
                            isInvalid={!!(this.state.errors.streetAddress || this.state.errors.all)}
                            validationMessage={this.state.errors.streetAddress}
                          />
                          <TextInputField
                            label="Zip Code"
                            name="zipCode"
                            onInput={this.updateFormData}
                            isInvalid={!!(this.state.errors.zipCode || this.state.errors.all)}
                            validationMessage={this.state.errors.zipCode}
                          />
                        </div>
                      </div>
                    </div>

                    <Button onClick={this.getPaymentIntent}>Next - Payment Details</Button>
                  </Fade>
                )}

                {this.state.paymentIntent && (
                  <Fade active={this.state.paymentIntent}>
                    <Elements>
                      <PaymentForm
                        amount={this.state.amount}
                        paymentIntent={this.state.paymentIntent}
                      />
                    </Elements>
                  </Fade>
                )}
              </TransitionGroup>
            </div>
          </Container>
        </Layout>
      </StripeProvider>
    )
  }
}

export default PaymentPage
