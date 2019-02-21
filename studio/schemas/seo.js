export default {
  name: "seo",
  title: "Search Engine Optimizations (SEO)",
  type: "object",
  liveEdit: true,
  fields: [
    {
      name: "title",
      title: "Title tag",
      type: "string"
    },
    {
      name: "description",
      title: "Meta Description",
      type: "text"
    },
    {
      name: "keywords",
      title: "keywords",
      type: "array",
      of: [{ type: "string" }]
    }
  ]
};
