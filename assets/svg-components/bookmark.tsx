import * as React from "react";
import Svg, { Path } from "react-native-svg";

const BookMark = (props) => (
  <Svg
    width={32}
    height={32}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M25.833 28 16.5 21.333 7.167 28V6.667A2.667 2.667 0 0 1 9.833 4h13.334a2.667 2.667 0 0 1 2.666 2.667V28Z"
      stroke="#000"
      strokeWidth={2.667}
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity={0.3}
    />
  </Svg>
);

export default BookMark;
