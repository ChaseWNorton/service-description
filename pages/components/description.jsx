import React from "react";
import PropTypes from "prop-types";
import Parser from "html-react-parser";

const Description = ({ details }) => {
  const output = Parser(details);

  return <div className="runningText">{output}</div>;
};

Description.propTypes = {
  details: PropTypes.string.isRequired
};

export default Description;
