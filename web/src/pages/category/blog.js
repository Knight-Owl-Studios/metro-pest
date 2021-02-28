import React from 'react'
import { graphql } from 'gatsby'
import { mapEdgesToNodes } from '../../lib/helpers'
import BlogPostPreviewGrid from '../../components/blog-post-preview-grid'
import Container from '../../components/container'
import GraphQLErrorList from '../../components/graphql-error-list'
import SEO from '../../components/seo'
import Layout from '../../containers/layout'
import { title1 } from '../../components/typography.module.css'

import styles from "../internal.module.css";

export const query = graphql`
  query BlogPageQuery {
    posts: allSanityPost(
      sort: { fields: [publishedAt], order: DESC }
    ) {
      edges {
        node {
          id
          publishedAt
          _rawExcerpt
          mainImage {
            asset {
              _id
            }
            alt
          }
          title
          slug {
            current
          }
        }
      }
    }
  }
`

const BlogPage = props => {
  const { data, errors } = props

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }

  const postNodes = data && data.posts && mapEdgesToNodes(data.posts)

  return (
    <Layout>
      <SEO title='Blog' />
      <Container>
        <div className={styles.pageContent}>
          <h1 className={title1}>Blog</h1>
          <BlogPostPreviewGrid nodes={postNodes} />
        </div>
      </Container>
    </Layout>
  )
}

export default BlogPage
