import { FaPhoneAlt } from 'react-icons/fa';

export default {
  type: "document",
  name: "phonenumber",
  title: "Phone Numbers",
  icon: FaPhoneAlt,
  fields: [
    {
      type: "string",
      name: "area",
      title: "Area",
      description: "The area that uses this phone number"
    },
    { type: "string", name: "number", title: "Phone Number" }
  ],
  preview: {
    select: {
      title: "number",
      subtitle: "area"
    }
  }
};
