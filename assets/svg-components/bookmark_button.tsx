// A bookmark button in svg
// It is used in header of product details

import * as React from "react";
import Svg, { Path } from "react-native-svg";

const bookmarkButton = (props) => (
    <Svg
        width="17"
        height="20"
        viewBox="0 0 17 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M15.7916 19L8.49998 14L1.20831 19V3C1.20831 2.46957 1.42781 1.96086 1.81851 1.58579C2.20921 1.21071 2.73911 1 3.29165 1H13.7083C14.2608 1 14.7908 1.21071 15.1815 1.58579C15.5722 1.96086 15.7916 2.46957 15.7916 3V19Z"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

export default bookmarkButton;
