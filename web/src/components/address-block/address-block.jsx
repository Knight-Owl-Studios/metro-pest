import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import styles from './address-block.module.css'

export default class AddressBlock extends React.PureComponent {
  static propTypes = {
    email: PropTypes.string,
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    zipCode: PropTypes.string.isRequired
  }

  static defaultProps = {
    email: ''
  }

  renderEmailBlock() {
    const { email } = this.props

    return (
      email && (
        <Fragment>
          <p className={styles.label}>Email us at:</p>
          <p className={styles.row}><a className={styles.email} href={`mailto:${email}`}>{email}</a></p>
        </Fragment>
      )
    )
  }

  renderAddress() {
    const { name, address, city, state, zipCode } = this.props

    return (
      <Fragment>
        <div className={styles.label}>Address:</div>
        <div className={styles.row}>{name}</div>
        <div className={styles.row}>{address}</div>
        <div className={styles.row}>{`${city}, ${state} ${zipCode}`}</div>
      </Fragment>
    )
  }

  render() {
    return (
      <div className={styles.container}>
        <address>
          <div className={styles.addressBlock}>{this.renderEmailBlock()}</div>
          <div className={styles.addressBlock}>{this.renderAddress()}</div>
        </address>
      </div>
    )
  }
}
