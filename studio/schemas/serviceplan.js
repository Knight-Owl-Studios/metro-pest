import { FaClipboard } from "react-icons/fa";

export default {
  name: "serviceplan",
  title: "Service Plans",
  type: "document",
  icon: FaClipboard,
  fields: [
    {
      name: "name",
      title: "Plan Name",
      type: "string"
    },
    {
      name: "description",
      title: "Short Description",
      type: "text"
    },
    {
      name: "visits",
      title: "Visits per Year",
      type: "string"
    },
    {
      name: "pests",
      title: "Pests",
      description: "Pests covered by this plan",
      type: "array",
      of: [{ type: "reference", to: [{ type: "pest" }] }]
    }
  ],
  liveEdit: true
};
