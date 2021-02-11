import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

const detailsQuery = graphql`
  query SEOQuery {
    site: sanitySiteSettings {
      seo {
        title
        description
        keywords
      }
    }
  }
`

function SEO({ description, lang, meta, keywords = [], title, ogTitle, ogDescription, ogImage }) {
  return (
    <StaticQuery
      query={detailsQuery}
      render={data => {
        if (!data.site) {
          return
        }
        const metaDescription = description || data.site.seo.description
        const metaTitle = title || data.site.seo.title;
        const metaKeywords = keywords || data.site.seo.keywords;
        
        ogImage = ogImage || '/img/og-image.jpg'

        if (!ogTitle) {
          ogTitle = metaTitle;
        }
        if (!ogDescription) {
          ogDescription = metaDescription;
        }

        return (
          <Helmet
            htmlAttributes={{
              lang
            }}
            title={metaTitle}
            meta={[
              {
                name: 'description',
                content: metaDescription
              },
              {
                property: 'og:title',
                content: ogTitle
              },
              {
                property: 'og:description',
                content: ogDescription
              },
              {
                property: 'og:type',
                content: 'website'
              },
              {
                property: 'og:image',
                content: ogImage
              },
              {
                name: 'twitter:card',
                content: 'summary_large_image'
              },
              {
                name: 'twitter:creator',
                content: data.site.author
              }
            ]
              .concat(
                metaKeywords && metaKeywords.length > 0
                  ? {
                      name: 'keywords',
                      content: metaKeywords.join(', ')
                    }
                  : []
              )
              .concat(meta)}
          />
        )
      }}
    />
  )
}

SEO.defaultProps = {
  lang: 'en',
  meta: [],
  keywords: []
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.array,
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired
}

export default SEO
