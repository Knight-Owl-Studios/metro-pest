import React, { Component } from 'react'
import { CardElement, injectStripe } from 'react-stripe-elements'
import { TextInputField, Button } from 'evergreen-ui'

import { title2, paragraph, small } from '../typography.module.css'

import styles from './payment.module.css'

class CheckoutForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: ''
    }

    this.setEmail = this.setEmail.bind(this)
    this.submit = this.submit.bind(this)
  }

  async submit(ev) {
    ev.preventDefault()
    const { stripe, paymentIntent, onLoading, onError, onSuccess } = this.props

    onError('all', null)
    onLoading(true)

    try {
      await stripe.handleCardPayment(paymentIntent.client_secret, {
        receipt_email: this.state.email
      })
      onSuccess(this.state.email)
    } catch (err) {
      onError('all', err.message)
    }

    onLoading(false)
  }

  setEmail(e) {
    this.setState({ email: e.target.value })
  }

  render() {
    return (
      <div className={styles.checkout}>
        <h2 className={title2}>Enter payment details</h2>

        <CardElement className={styles.input} />
        <TextInputField
          type="email"
          label="Email receipt (optional)"
          description="For receipt purposes only. We will not add you to any list"
          onChange={this.setEmail}
        />
        <Button
          appearance="primary"
          intent="success"
          onClick={this.submit}
          height={60}
          isLoading={this.props.loading}
        >
          {`Pay $${this.props.amount}`}
        </Button>
      </div>
    )
  }
}

export default injectStripe(CheckoutForm)
