export default {
  name: "social",
  title: "Social Share Settings",
  description:
    "These settings are used to provide more details about a page when it is shared to a social platform",
  type: "object",
  liveEdit: true,
  fields: [
    {
      name: "og_image",
      title: "Social Share Image",
      type: "image"
    },
    {
      name: "og_title",
      title: "Social Share Title",
      type: "string"
    },
    {
      name: "og_description",
      title: "Social Share Description",
      type: "text"
    }
  ]
};
