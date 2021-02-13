import { MdBusiness } from "react-icons/md";

export default {
  name: "companyInfo",
  title: "Company Info",
  type: "document",
  liveEdit: false,
  icon: MdBusiness,
  fields: [
    {
      name: "name",
      title: "Company name",
      type: "string"
    },
    {
      name: "email",
      title: "Email",
      type: "email"
    },
    {
      name: "address",
      title: "Street Address",
      type: "string"
    },
    {
      name: "zipCode",
      title: "ZIP Code",
      type: "string"
    },
    {
      name: "city",
      title: "City",
      type: "string"
    },
    {
      name: "state",
      title: "State",
      type: "string"
    },
    {
      name: "country",
      title: "Country",
      type: "string"
    },
    {
      name: "companyServiceLocations",
      title: "Service Locations",
      type: "array",
      of: [{ type: "serviceLocations" }]
    }
  ]
};
