export default {
  name: "page",
  title: "Page",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string"
    },
    {
      name: "body",
      title: "Body",
      type: "blockContent"
    },
    {
      name: "headingImage",
      title: "Heading Image",
      type: "image"
    },
    {
      name: "seo",
      title: "SEO settings",
      type: "seo"
    },
    {
      name: "social",
      title: "Social Share",
      type: "social"
    }
  ]
};
