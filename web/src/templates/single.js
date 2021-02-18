import React from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import Content, { HTMLContent } from '../components/Content'

import Heading from '../components/Heading'
import Contact from '../components/Contact'

import './single.css'

export const SinglePage = ({ data }) => {
  const { title, hero } = data.page.frontmatter
  const { html } = data.page

  return (
    <section id=''>
      {/* <Helmet>
        <title>{title}</title>
      </Helmet>
      <Heading title={hero.title} image={hero.image} />
      <article className="page section">
        <HTMLContent content={html} />
      </article>
      <Contact /> */}
    </section>
  )
}

export default SinglePage

// export const SinglePageQuery = graphql`
//   query SinglePage($id: String!) {
//     page: markdownRemark(id: { eq: $id }) {
//       html
//       frontmatter {
//         title
//         hero {
//           title
//           image
//         }
//       }
//     }
//   }
// `;
