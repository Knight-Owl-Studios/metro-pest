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
        const metatTitle = title || data.site.seo.title;
        const metaKeywords = keywords || data.site.seo.keywords;

        if (!ogTitle) {
          ogTitle = metatTitle;
        }
        if (!ogDescription) {
          ogDescription = metaDescription;
        }

        return (
          <Helmet
            htmlAttributes={{
              lang
            }}
            title={metatTitle}
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
                content: '/img/og-image.jpg'
              },
              {
                name: 'twitter:card',
                content: 'summary'
              },
              {
                name: 'twitter:creator',
                content: data.site.author
              },
              {
                name: 'twitter:title',
                content: ogTitle
              },
              {
                name: 'twitter:description',
                content: metaDescription
              },
              {
                name: 'twitter:image',
                content: '/img/twitter-card.jpg'
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
