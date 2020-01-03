import React, { Component } from 'react'
import { graphql } from 'gatsby'
import axios from 'axios'
import { TextInputField, Button, Tab, Tablist, Pane, Spinner, Alert, Small } from 'evergreen-ui'

import { snakeToCamelObject } from '../lib/helpers'

import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import SEO from '../components/seo'
import Heading from '../components/Heading'

import PaymentForm from '../components/PaymentForm'
import InvoiceField from '../components/PaymentForm/invoice-field'
import ServiceAddress from '../components/PaymentForm/service-address'

import { title2, paragraph, small } from '../components/typography.module.css'

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
        ...SEOFragment
      }
      social {
        ...SocialFragment
      }
    }
  }
`

class PaymentPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      activeTab: null,
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
    this.setLoading = this.setLoading.bind(this)
    this.setError = this.setError.bind(this)
    this.success = this.success.bind(this)
  }

  async getPaymentIntent() {
    if (this.validate()) {
      const { amount, invoiceNumber, firstName, lastName, streetAddress, zipCode } = this.state

      this.setState(() => ({
        error: '',
        loading: true
      }))

      const { data } = await axios.post('/api/payments', {
        amount: amount * 100,
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

  setLoading(loading = true) {
    this.setState({ loading })
  }

  setError(key, err) {
    this.setState({
      errors: {
        ...this.state.errors,
        [key]: err
      }
    })
  }

  success(email) {
    let successMessage = `Successfully paid $${this.state.amount}.`
    if (email) {
      successMessage += ` An email will be sent to ${email} with your receipt`
    }
    this.setState({ success: true, successMessage })
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
        <SEO {...page.seo} {...snakeToCamelObject(page.social)} />
          <Container>
            <Heading title={page.title} image={page.headingImage.asset.fluid} />
            <div className={styles.pageContent}>
              {!this.state.paymentIntent && (
                <Pane maxWidth={600} marginLeft="auto" marginRight="auto">
                  {this.state.errors.all && <Alert intent="danger" title={this.state.errors.all} />}
                  {this.state.loading && <Alert intent="none" title="Loading..." />}
                  {this.state.success && <Alert intent="success" title={this.state.successMessage} />}
                  <h2 className={title2}>Enter details about your service.</h2>
                  <Pane is="p" className={paragraph} marginTop={25} fontWeight="bold">
                    Enter the amount listed on your invoice.
                  </Pane>
                  <Pane marginTop={25}>
                    <Pane className={styles.dollar} paddingLeft={15}>
                      <TextInputField
                        onInput={this.updateFormData}
                        label="Invoice Amount"
                        name="amount"
                        type="number"
                        step=".01"
                        inputHeight={50}
                        fontSize="18px"
                        isInvalid={!!(this.state.errors.amount || this.state.errors.all)}
                        validationMessage={this.state.errors.amount}
                      />
                    </Pane>
                    <Pane is="p" className={paragraph} marginTop={50} fontWeight="bold">
                      Enter either invoice number, or service address:
                      <Pane is="p" className={small}>Click an option below</Pane>
                    </Pane>
                    <Tablist marginBottom={50} textAlign="center">
                      <Tab
                        height={75}
                        width="45%"
                        marginTop={25}
                        background={this.state.activeTab === 'invoice' ? "#f5f5f5" : "transparent"}
                        style={{ border: this.state.activeTab === 'invoice' ? '' : `2px solid #dad9d9` }}
                        onSelect={() => this.setState({ activeTab: 'invoice' })}
                        isSelected={this.state.activeTab === 'invoice'}
                      >
                        Inoice Number
                      </Tab>
                      <Tab
                        height={75}
                        width="45%"
                        marginTop={25}
                        background={this.state.activeTab === 'serviceAddress' ? "#f5f5f5" : "transparent"}
                        style={{ border: this.state.activeTab === 'serviceAddress' ? '' : `2px solid #dad9d9` }}
                        onSelect={() => this.setState({ activeTab: 'serviceAddress' })}
                        isSelected={this.state.activeTab === 'serviceAddress'}
                      >
                        Service Address
                      </Tab>
                    </Tablist>
                    {this.state.activeTab === 'invoice' && (
                      <InvoiceField
                        onInput={this.updateFormData}
                        isInvalid={!!(this.state.errors.invoiceNumber || this.state.errors.all)}
                        validationMessage={this.state.errors.invoiceNumber}
                      />
                    )}
                    {this.state.activeTab === 'serviceAddress' && (
                      <ServiceAddress onInput={this.updateFormData} errors={this.state.errors} />
                    )}
                  </Pane>

                  <Pane textAlign="right">
                    <Button
                      appearance="primary"
                      onClick={this.getPaymentIntent}
                      isLoading={this.state.loading}
                      height={48}
                    >
                      Next - Payment Details
                    </Button>
                  </Pane>
                </Pane>
              )}

              {!!this.state.paymentIntent && (
                <Elements>
                  <PaymentForm
                    loading={this.state.loading}
                    onLoading={this.setLoading}
                    onError={this.setError}
                    amount={this.state.amount}
                    paymentIntent={this.state.paymentIntent}
                    onSuccess={this.success}
                  />
                </Elements>
              )}
            </div>
          </Container>
        </Layout>
      </StripeProvider>
    )
  }
}

export default PaymentPage
