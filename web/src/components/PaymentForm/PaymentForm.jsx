import React, { Component } from 'react'
import { CardElement, injectStripe } from 'react-stripe-elements'
import { TextInputField, Button, Alert } from 'evergreen-ui'

import { title2, paragraph, small } from '../typography.module.css'

import styles from './payment.module.css'

class CheckoutForm extends Component {
  state = {
    email: '',
    isSuccess: null,
    isError: null,
    error: null
  }
  
  constructor(props) {
    super(props)


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
      this.setState({ isSuccess: true, isError: false, error: null })
      onSuccess(this.state.email)
    } catch (err) {
      this.setState({ isError: true, error: err, isSuccess: false })
      onError('all', err.message)
    }

    this.setState({ isError: false, eror: null })
    onLoading(false)
  }

  setEmail(e) {
    this.setState({ email: e.target.value })
  }

  render() {
    return (
      <div className={styles.checkout}>
        { this.state.isError && <Alert intent="danger" title="There was a problem submitting payment.">Try again later, or call us at (952) 890-6007 to handle payment over the phone. We are sorry for the inconvenience.</Alert> }
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
            disabled={this.state.isSuccess}
            >
            {
              this.state.isSuccess
                ? `✔ Successfully paid ${this.props.amount}`
                : `Pay $${this.props.amount}`
            }
          </Button>
      </div>
    )
  }
}

export default injectStripe(CheckoutForm)
