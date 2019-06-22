export default {
  name: "serviceLocations",
  title: "Service Locations",
  type: "object",
  title: "Service Location",
  description: "Add a county and the cities serviced in that county",
  fields: [
    {
      name: "county",
      type: "string",
      title: "County"
    },
    {
      name: "cities",
      title: "Cities",
      type: "array",
      of: [{ type: "string" }]
    }
  ]
};
