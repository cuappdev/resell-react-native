import * as React from "react";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";

const ColoredPlus = (props) => (
  <Svg
    width={28}
    height={28}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.193 2.115a1.998 1.998 0 0 0-3.996 0v10.001H2.223a1.998 1.998 0 0 0 0 3.997h9.974v9.002a1.998 1.998 0 1 0 3.996 0v-9.002h8.978a1.998 1.998 0 0 0 0-3.997h-8.978V2.115Z"
      fill="url(#a)"
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={24.578}
        y1={-7.152}
        x2={-3.374}
        y2={-1.95}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#DF9856" />
        <Stop offset={0.49} stopColor="#DE6CD3" />
        <Stop offset={0.943} stopColor="#AD68E3" />
      </LinearGradient>
    </Defs>
  </Svg>
);

export default ColoredPlus;
