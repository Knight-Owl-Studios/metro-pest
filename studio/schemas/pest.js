import bugIcon from "react-icons/lib/fa/bug";

export default {
  name: "pest",
  title: "Pests",
  type: "document",
  icon: bugIcon,
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string"
    },
    {
      name: "image",
      title: "Image",
      fields: [{ name: "alt", title: "Image description", type: "text" }],
      type: "image"
    },
    {
      name: "description",
      title: "Description",
      type: "text"
    }
  ],
  liveEdit: true
};
