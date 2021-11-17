import { Roller } from 'react-css-spinners'
import React from 'react';
// import {css} from "@emotion/react";
import PropTypes from "prop-types"

type LoaderProps = {
    color: string,
    size: number,
    // className: string
}
const Loader = ({ size = 70, color = "#00a105" }: LoaderProps) => {
    return (
      /* Pass props like color and size (more in demo) */
      <Roller color={color} size={size} className="loader"/>
    )
}

Loader.defaultProps = {
    color: "#00a105",
    size: 70
}

Loader.propTypes = {
    color: PropTypes.string,
    size: PropTypes.number,
    className: PropTypes.string,
  };

export default Loader;