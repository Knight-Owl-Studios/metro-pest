import React from 'react'
import PropTypes from 'prop-types'

import PhoneNumbers from '../../components/PhoneNumbers'
import Form from '../../components/Form'
import styles from './styles.module.css'

const defaultHeading = 'Contact a Technician Today'

const Contact = ({ heading = defaultHeading, cta }) => (
  <section className={styles.base}>
    <div className={styles.section}>
      <div>
        <h2 className={styles.heading}>{heading}</h2>
        <div className={styles.body}>
          <Form />

          <div className={styles.divider}>or</div>

          <div className={styles.phone}>
            <PhoneNumbers numbers={cta} vertical />
          </div>
        </div>
      </div>
    </div>
  </section>
)

Contact.propTypes = {
  heading: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired
}

export default Contact
