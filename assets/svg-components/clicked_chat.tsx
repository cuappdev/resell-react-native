import * as React from "react";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";

const ClickedChat = (props) => (
  <Svg
    width={36}
    height={35}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M31.125 16.77a12.221 12.221 0 0 1-1.313 5.543 12.396 12.396 0 0 1-11.083 6.854 12.221 12.221 0 0 1-5.541-1.313l-8.313 2.771 2.77-8.313a12.22 12.22 0 0 1-1.312-5.541 12.396 12.396 0 0 1 6.854-11.083 12.221 12.221 0 0 1 5.542-1.313h.73a12.367 12.367 0 0 1 11.666 11.667v.729Z"
      stroke="url(#a)"
      strokeWidth={2.917}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={18}
        y1={4.375}
        x2={18}
        y2={30.625}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#6F30F5" />
        <Stop offset={0.464} stopColor="#DD67AE" />
        <Stop offset={1} stopColor="#FEB6A2" />
      </LinearGradient>
    </Defs>
  </Svg>
);

export default ClickedChat;
