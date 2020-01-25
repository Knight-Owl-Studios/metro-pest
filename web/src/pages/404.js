import React from 'react'
import SEO from '../components/seo'
import Container from '../components/container'
import Layout from '../containers/layout'

import { title1, paragraph, a } from '../components/typography.module.css'

import { four04 } from './internal.module.css';

const NotFoundPage = () => (
  <Layout>
    <SEO title='404: Not found' />
    <Container>
      <div className={four04}>
        <h1 className={title1}>Page Not found</h1>
        <p className={paragraph}>Go back to the <a className={a} href="/">home page</a></p>
        <p className={paragraph}>or go back to the <a className={a} href="javascript:void(0)" onClick={() => window.history.back()}>previous page</a></p>
      </div>
    </Container>
  </Layout>
)

export default NotFoundPage
