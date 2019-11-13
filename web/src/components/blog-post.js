import React from 'react'
import cn from 'classnames';

import { buildImageObj } from '../lib/helpers'
import { imageUrlFor } from '../lib/image-url'
import BlockContent from './block-content'
import Container from './container'

import styles from './blog-post.module.css'
import { title1 } from '../components/typography.module.css';
import pageStyles from '../pages/internal.module.css';

function BlogPost (props) {
  const { _rawBody, title, mainImage } = props
  return (
    <article className={styles.root}>
      {mainImage && mainImage.asset && (
        <div className={styles.mainImage}>
          <img
            src={imageUrlFor(buildImageObj(mainImage))
              .width(1200)
              .height(Math.floor((9 / 16) * 1200))
              .fit('crop')
              .url()}
            alt={mainImage.alt}
          />
          <h1 className={cn(title1, styles.title)}>{title}</h1>
        </div>
      )}
      <Container>
        <div className={pageStyles.pageContent}>
          <div className={styles.mainContent}>
            {_rawBody && <BlockContent blocks={_rawBody} />}
          </div>
        </div>
      </Container>
    </article>
  )
}

export default BlogPost
