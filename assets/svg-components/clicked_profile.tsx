import * as React from "react";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";

const ClickedProfile = (props) => (
  <Svg
    width={35}
    height={35}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.438 10.063a4.313 4.313 0 1 1 8.625 0 4.313 4.313 0 0 1-8.625 0Zm4.312-7.188a7.188 7.188 0 1 0 0 14.375 7.188 7.188 0 0 0 0-14.375ZM12 20.125a7.188 7.188 0 0 0-7.188 7.188v2.875a1.438 1.438 0 0 0 2.875 0v-2.875A4.313 4.313 0 0 1 12 23h11.5a4.313 4.313 0 0 1 4.313 4.313v2.875a1.438 1.438 0 0 0 2.875 0v-2.875a7.188 7.188 0 0 0-7.188-7.188H12Z"
      fill="url(#a)"
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={17.75}
        y1={2.875}
        x2={17.75}
        y2={31.625}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#6F30F5" />
        <Stop offset={0.464} stopColor="#DD67AE" />
        <Stop offset={1} stopColor="#FEB6A2" />
      </LinearGradient>
    </Defs>
  </Svg>
);

export default ClickedProfile;
