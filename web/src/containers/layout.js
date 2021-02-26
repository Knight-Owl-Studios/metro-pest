import { graphql, StaticQuery } from 'gatsby'
import Helmet from 'react-helmet';
import React from 'react'

import Contact from '../components/Contact'
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


import "reset.css";
import styles from "../components/typography.module.css";
import "./global.css";

const query = graphql`
  query SiteTitleQuery {
    numbers:allSanityPhonenumber {
      edges {
        node {
          number
          area
        }
      }
    }

    site: sanitySiteSettings {
      phone {
        number
      }
      seo {
        title
        description
        keywords
      }
    }

    social: allSanitySocialProfiles {
      edges {
        node {
          url
          icon {
            asset {
              fixed(width: 16, height: 16) {
                ...GatsbySanityImageFixed
              }
            }
          }
        }
      }
    }

    company: sanityCompanyInfo {
      companyServiceLocations {
        county
        cities
      }
    }
  }
`

const links = [
  { path: '/', title: "Home", mobile: true },
  { path: '/contact-us/', title: "Contact" },
  { path: '/about-us/', title: "About" },
  { path: '/special-offer/', title: "Special Offers" },
  { path: '/pest-control-services/', title: "Services" },
  { path: '/make-a-payment/', title: "Payments" },
  { path: '/category/blog', title: "Blog" }
];

function LayoutContainer(props) {
  return (
    <StaticQuery
      query={query}
      render={data => {
        if (!data.site) {
          throw new Error(
            'Missing "Site settings". Open the studio at http://localhost:3333 and add "Site settings" data'
          )
        }

        const social = data.social.edges.map(({ node }) => node);
        const cta = data.numbers.edges.map(({ node }) => ({ heading: node.area, number: node }));

        return (
          <div className={styles.global}>
            <Helmet>
              <link
                href="https://fonts.googleapis.com/css?family=Lato:300,400,700|Montserrat:500,600,700"
                rel="stylesheet"
              />
              <link
                rel="stylesheet"
                href="https://use.fontawesome.com/releases/v5.1.0/css/all.css"
                integrity="sha384-lKuwvrZot6UHsBSfcMvOkWwlCMgc0TaWr+30HWe3a4ltaBwTZhyTEggF5tJv8tbt"
                crossorigin="anonymous"
              />
            </Helmet>

            <Navbar
              links={links}
              phone={data.site.phone.number}
            />

            { props.children }

            {!props.hideContact && <Contact heading="Get in touch today" cta={cta} />}

            <Footer
              social={social}
              links={links}
              geo={data.company.companyServiceLocations}
            />
          </div>
        )
      }}
    />
  )
}

export default LayoutContainer
