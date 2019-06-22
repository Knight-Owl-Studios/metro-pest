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

    // Hero Section
    {
      name: "heroHeading",
      title: "[Hero] Heading",
      type: "string"
    },
    {
      name: "heroImage",
      title: "[Hero] Background Image",
      type: "image"
    },
    {
      name: "heroBody",
      title: "[Hero] Body",
      type: "blockContent"
    },
    {
      name: "heroCta",
      title: "[Hero] Phone Numbers",
      type: "array",
      of: [
        {
          type: "phoneWithHeading",
          preview: {
            select: {
              title: "heading",
              subtitle: "number.number"
            }
          }
        }
      ]
    },

    // Services section
    {
      name: "servicesHeading",
      title: "[Services] Heading",
      type: "string"
    },
    {
      name: "servicesBody",
      title: "[Services] Body",
      type: "blockContent"
    },

    // About section
    {
      name: "aboutHeading",
      title: "[About] Heading",
      type: "string"
    },
    {
      name: "aboutBody",
      title: "[About] Body",
      type: "blockContent"
    },
    {
      name: "aboutImage",
      title: "[About] Image",
      type: "image"
    },

    // Safety section
    {
      name: "safetyHeading",
      title: "[Safety] Heading",
      type: "string"
    },
    {
      name: "safetyBody",
      title: "[Safety] Body",
      type: "blockContent"
    },
    {
      name: "safetyImage",
      title: "[Safety] Image",
      type: "image"
    },

    // CTA section
    {
      name: "ctaHeading",
      title: "[Call to Action] Heading",
      type: "string"
    },
    {
      name: "ctaPhone",
      title: "[Call to Action] Phone Numbers",
      type: "array",
      of: [
        {
          type: "phoneWithHeading",
          preview: {
            select: {
              title: "heading",
              subtitle: "number.number"
            }
          }
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
