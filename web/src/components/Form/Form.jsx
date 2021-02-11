import React from 'react'
import useFetch from 'use-http'

import styles from './form.module.css'

const Form = () => {
  const { post } = useFetch(location.origin)
  const form = React.useRef()
  const [error, setError] = React.useState(null)
  const [success, setSuccess] = React.useState(null)

  const onSubmit = React.useCallback(async (e) => {
    const body = Array.from(form.current.querySelector('input')).reduce((acc, input) => ({
      ...acc,
      [input.name]: input.value
    }), {})
    
    try {
      const response = await post('/api/email', body)
      setSuccess(true)
    } catch (err) {
      setError(true)
    }
  }, [])

  return (
    <section className={styles.container} onSubmit={onSubmit}>
      {success && <div className={styles.success}>Form submitted successfully!</div>}
      {error && <div className={styles.error}>Error submitting form. Try again later, or give us a call at 952-890-6007</div>}
      <form className={styles.form} ref={form}>
        <input type="text" className={styles.input} placeholder="Name" />
        <input type="email" className={styles.input} placeholder="Email" />
        <input type="phone" className={styles.input} placeholder="Phone number" />
        <textarea name="problem" className={styles.textarea} placeholder="Pest problem"></textarea>
        <button type="submit" className={styles.submit}>
          Request Service
        </button>
      </form>
    </section>
  )
}

export default Form
