// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator";

// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";

// We import object and document schemas
import blockContent from "./text/blockContent";
import blockText from "./text/blockText";
import category from "./blog/category";
import companyInfo from "./objects/companyInfo";
import figure from "./images/figure";
import mainImage from "./images/mainImage";
import page from "./page";
import person from "./objects/person";
import post from "./blog/post";
import postAuthor from "./blog/postAuthor";
import slideshow from "./images/slideshow";
import seo from "./objects/seo";
import social from "./objects/social";
import servicePlan from "./servicePlan";
import pest from "./objects/pest";
import siteSettings from "./siteSettings";
import phoneNumber from "./objects/phoneNumber";
import phoneWithHeading from "./objects/phone-with-heading";
import serviceLocations from "./objects/serviceLocations";
import socialProfile from "./objects/social-profile";
import specialOffer from "./objects/special-offer";
import homepage from "./homepage";

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: "default",
  // Then proceed to concatenate our our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // The following are document types which will appear
    // in the studio.
    blockContent,
    blockText,
    category,
    companyInfo,
    figure,
    mainImage,
    page,
    person,
    post,
    postAuthor,
    slideshow,
    seo,
    social,
    servicePlan,
    pest,
    siteSettings,
    homepage,
    phoneNumber,
    phoneWithHeading,
    serviceLocations,
    socialProfile,
    specialOffer
    // When added to this list, object types can be used as
    // { type: 'typename' } in other document schemas
  ])
});
