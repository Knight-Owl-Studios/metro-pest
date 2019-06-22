import React from 'react'
import PropTypes from 'prop-types'

import styles from './form.module.css'

export default class Form extends React.PureComponent {
  render() {
    return (
      <section className={styles.container}>
        <form className={styles.form}>
          <input type="text" className={styles.input} placeholder="Name" />
          <input type="email" className={styles.input} placeholder="Email" />
          <input type="phone" className={styles.input} placeholder="Phone number" />
          <button type="submit" className={styles.submit}>
            Request Service
          </button>
        </form>
      </section>
    )
  }
}
