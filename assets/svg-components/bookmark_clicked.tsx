import { createPublicKey } from "crypto";
import * as React from "react";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";

const ClickedBookMark = (props) => (
  <Svg
    width={32}
    height={32}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M25.833 28 16.5 21.333 7.167 28V6.667A2.667 2.667 0 0 1 9.833 4h13.334a2.667 2.667 0 0 1 2.666 2.667V28Z"
      stroke="url(#a)"
      strokeWidth={2.667}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={16.5}
        y1={4}
        x2={16.5}
        y2={28}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#6F30F5" />
        <Stop offset={0.464} stopColor="#DD67AE" />
        <Stop offset={1} stopColor="#FEB6A2" />
      </LinearGradient>
    </Defs>
  </Svg>
);

export default ClickedBookMark;
