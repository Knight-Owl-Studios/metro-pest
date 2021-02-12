import React from 'react'
import useFetch from 'use-http'
import classNames from 'classnames'

import styles from './form.module.css'

const Form = () => {
  const { post, response, loading, error } = useFetch()
  const form = React.useRef()

  const onSubmit = React.useCallback((e) => {
    e.preventDefault()

    const body = Array.from(form.current.querySelectorAll('input, textarea')).reduce((acc, input) => ({
      ...acc,
      [input.name]: input.value
    }), {})

    post('/api/email', body)
  }, [])

  return (
    <section className={styles.container} onSubmit={onSubmit}>
      {response && response.status === 'success' && <div className={styles.success}>Form submitted successfully!</div>}
      {error && <div className={styles.error}>Error submitting form. Try again later, or give us a call at 952-890-6007</div>}
      <form className={classNames(styles.form, {
        'loading': loading
      })} ref={form} disabled={loading ? "disabled" : undefined}>
        <input type="text" name="Name" className={styles.input} placeholder="Name" />
        <input type="email" name="Email" className={styles.input} placeholder="Email" />
        <input type="phone" name="Phone Number" className={styles.input} placeholder="Phone number" />
        <textarea name="problem" name="Pest Problem" className={styles.textarea} placeholder="Pest problem"></textarea>
        <button type="submit" className={styles.submit} disabled={loading ? "disabled" : undefined}>
          Request Service
        </button>
      </form>
    </section>
  )
}

export default Form
