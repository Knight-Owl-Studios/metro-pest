import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import "./PhoneNumbers.styles.css";

const PhoneNumbers = ({ numbers, vertical }) => (
  <div
    className={classNames("phone-numbers", {
      "phone-numbers--vertical": vertical
    })}
  >
    {numbers.map(n => (
      <div className="phone-number" key={n.heading}>
        <h2 className="phone__heading">{n.heading}</h2>
        <a className="phone__link" href={`tel:${n.number.number}`}>
          {n.number.number}
        </a>
      </div>
    ))}
  </div>
);

PhoneNumbers.propTypes = {
  vertical: PropTypes.bool,
  numbers: PropTypes.shape({
    heading: PropTypes.string,
    number: PropTypes.shape({
      number: PropTypes.string
    })
  })
}

export default PhoneNumbers;
