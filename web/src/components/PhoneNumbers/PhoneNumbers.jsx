import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './PhoneNumbers.module.css'

const PhoneNumbers = ({ numbers, vertical }) => (
  <div
    className={classNames(styles.container, {
      [styles.vertical]: vertical
    })}
  >
    {numbers.map(n => (
      <div className={styles.number} key={n.heading}>
        <h2 className={styles.heading}>{n.heading}</h2>
        <a className={styles.link} href={`tel:${n.number.number}`}>
          {n.number.number}
        </a>
      </div>
    ))}
  </div>
)

PhoneNumbers.propTypes = {
  vertical: PropTypes.bool,
  numbers: PropTypes.shape({
    heading: PropTypes.string,
    number: PropTypes.shape({
      number: PropTypes.string
    })
  })
}

export default PhoneNumbers
