import planIcon from "react-icons/lib/fa/clipboard";

export default {
  name: "serviceplan",
  title: "Service Plans",
  type: "document",
  icon: planIcon,
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
