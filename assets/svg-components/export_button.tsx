// An export button in svg
// Used in menu bar of product details page

import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

const ExportButton = (props) => (
    <Svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M1 9V17H17V9"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Path
            d="M9 13V1M9 1L5 5M9 1L13 5"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

export default ExportButton;
