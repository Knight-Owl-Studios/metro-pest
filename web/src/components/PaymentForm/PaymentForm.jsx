import React, { Component } from 'react'
import { CardElement, injectStripe } from 'react-stripe-elements'

import styles from './payment.module.css'

class CheckoutForm extends Component {
  constructor(props) {
    super(props)
    this.submit = this.submit.bind(this)
    this.onInput = this.onInput.bind(this)
    this.amount = React.createRef()
    this.state = {
      amount: undefined
    }
  }

  async submit(ev) {
    // User clicked submit
  }

  onInput() {
    this.setState(() => ({ amount: this.amount.current.value }))
  }

  render() {
    return (
      <div className={styles.checkout}>
        <CardElement className={styles.input} />
        <button onClick={this.submit} className={styles.submit}>
          Pay{this.state.amount ? ` $${this.state.amount}` : ''}
        </button>
      </div>
    )
  }
}

export default injectStripe(CheckoutForm)
