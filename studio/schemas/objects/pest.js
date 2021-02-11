import { FaBug } from "react-icons/fa";

export default {
  name: "pest",
  title: "Pests",
  type: "document",
  icon: FaBug,
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string"
    },
    {
      name: "image",
      title: "Image",
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
