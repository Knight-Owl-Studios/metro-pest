export default {
  type: "object",
  name: "phoneWithHeading",
  title: "Phone Numbers with Heading",
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
};
