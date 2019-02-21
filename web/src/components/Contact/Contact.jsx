import React from "react";
import PropTypes from "prop-types";

import PhoneNumbers from "../../components/PhoneNumbers";
import "./Contact.styles.css";

const defaultHeading = "Contact a Technician Today";

const Contact = ({ heading = defaultHeading, cta }) => (
  <section className="contact">
    <div className="section">
      <div className="contact__content">
        <h1 className="contact__heading">{heading}</h1>
        <div className="contact__body">
          <section className="contact__form-container">
            <form className="contact-form" netlify>
              <input
                type="text"
                className="contact__form-input"
                placeholder="Name"
              />
              <input
                type="email"
                className="contact__form-input"
                placeholder="Email"
              />
              <input
                type="phone"
                className="contact__form-input"
                placeholder="Phone number"
              />
              <button type="submit" className="contact__form-submit">
                Request Service
              </button>
            </form>
          </section>

          <div className="contact__divider">or</div>

          <div className="contact__phone-numbers">
            <PhoneNumbers numbers={cta} vertical />
          </div>
        </div>
      </div>
    </div>
  </section>
);

Contact.propTypes = {
  heading: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired
};

export default Contact;
