import React from "react";
import "./heading.css";

const Heading = ({ title, image }) => (
  <header className="section">
    <img src={image} alt="" />
    <h1>{title}</h1>
  </header>
);

export default Heading;
