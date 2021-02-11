import { MdSettings } from "react-icons/md";

export default {
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  liveEdit: false,
  icon: MdSettings,
  fields: [
    {
      name: "phone",
      title: "Phone Number",
      description: "Phone number to show in the nav bar",
      type: "reference",
      to: [{ type: "phonenumber" }]
    },
    {
      name: "seo",
      title: "Default SEO Settings",
      type: "seo"
    }
  ],
  preview: {
    select: {
      title: "title"
    },
    prepare() {
      return {
        title: "Site Settings"
      };
    }
  }
};
