export function cn (...args) {
  return args.filter(Boolean).join(' ')
}

export function mapEdgesToNodes (data) {
  if (!data.edges) return []
  return data.edges.map(edge => edge.node)
}

export function filterOutDocsWithoutSlugs ({ slug }) {
  return (slug || {}).current
}

export function getBlogUrl (publishedAt, slug) {
  return `/blog/${slug.current || slug}/`
}

export function buildImageObj (source) {
  const imageObj = {
    asset: { _ref: source.asset._ref || source.asset._id }
  }

  if (source.crop) imageObj.crop = source.crop
  if (source.hotspot) imageObj.hotspot = source.hotspot

  return imageObj
}

export function snakeToCamel(str = "") {

  while(str.indexOf("_") !== -1) {
    let index = str.indexOf("_");
    str = str.slice(0, index) + str[index + 1].toUpperCase() + str.slice(index + 2);
  }

  return str;
}

export function snakeToCamelObject(obj = {}) {
  if (!obj) { return {}; }
  return Object.keys(obj).reduce(function(memo, key) {
    return {
      ...memo,
      [snakeToCamel(key)]: obj[key]
    }
  }, {})
}