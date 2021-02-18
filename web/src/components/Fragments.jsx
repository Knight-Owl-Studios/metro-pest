import { graphql } from "gatsby";

export default () => null;
export const query = graphql`
    fragment SEOFragment on SanitySeo {
        title
        description
        keywords
        
    }

    fragment SocialFragment on SanitySocial {
        og_image {
            ...SanityImageURL
        }
        og_title
        og_description
    }

    fragment SanityImageURL on SanityImage {
        asset {
            url
        }
    }
`;