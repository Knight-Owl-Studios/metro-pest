import icon from "react-icons/lib/fa/money";

export default {
  name: "specialOffer",
  title: "Special Offers",
  type: "document",
  icon: icon,
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string"
    },
    {
      name: "discount",
      title: "Discount",
      type: "text"
    },
    {
      name: "subtext",
      title: "Sub Text",
      type: "string"
    },
    {
      name: "multiline",
      title: "Multi Line",
      description: "Check this box when the discount has multiple lines",
      type: "boolean"
    }
  ],
  liveEdit: true
};
