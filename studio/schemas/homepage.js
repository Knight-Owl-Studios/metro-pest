export default {
  name: "homePage",
  title: "Page",
  type: "document",
  liveEdit: false,
  hidden: true,
  fields: [
    {
      name: "title",
      title: "title",
      type: "string"
    },
    {
      name: "hero",
      title: "Hero",
      description: "Top of page content",
      type: "object",
      fields: [
        {
          name: "heading",
          title: "Heading",
          type: "string"
        },
        {
          name: "image",
          title: "Background Image",
          type: "image"
        },
        {
          name: "body",
          title: "Body",
          type: "blockContent"
        },
        {
          name: "cta",
          title: "Phone Numbers",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { type: "string", name: "heading", title: "Heading" },
                {
                  name: "number",
                  title: "Phone Number",
                  type: "reference",
                  to: [{ type: "phonenumber" }]
                }
              ],
              preview: {
                select: {
                  title: "heading",
                  subtitle: "number.number"
                }
              }
            }
          ]
        }
      ]
    },
    {
      name: "needs",
      title: "Needs Section",
      type: "object",
      fields: [
        {
          name: "heading",
          title: "Needs Section Heading",
          type: "string"
        },
        {
          name: "body",
          title: "Needs Section Body",
          type: "blockContent"
        }
      ]
    },
    {
      name: "sotr",
      title: "South of the River",
      type: "object",
      fields: [
        {
          name: "heading",
          title: "South of the River Heading",
          type: "string"
        },
        {
          name: "body",
          title: "South of the River Body",
          type: "blockContent"
        },
        {
          name: "image",
          title: "South of the River Image",
          type: "image"
        }
      ]
    },
    {
      name: "safety",
      title: "Safety Section",
      type: "object",
      fields: [
        {
          name: "heading",
          title: "Safety Heading",
          type: "string"
        },
        {
          name: "body",
          title: "Safety Body",
          type: "blockContent"
        },
        {
          name: "image",
          title: "Safety Image",
          type: "image"
        }
      ]
    },
    {
      name: "cta",
      title: "Call to Action",
      type: "object",
      fields: [
        {
          name: "heading",
          title: "CTA Heading",
          type: "string"
        },
        {
          name: "cta",
          title: "Phone Numbers",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { type: "string", name: "heading", title: "Heading" },
                {
                  name: "number",
                  title: "Phone Number",
                  type: "reference",
                  to: [{ type: "phonenumber" }]
                }
              ],
              preview: {
                select: {
                  title: "heading",
                  subtitle: "number.number"
                }
              }
            }
          ]
        }
      ]
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
