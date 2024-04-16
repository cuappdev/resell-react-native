import * as React from "react";
import Svg, { Circle, SvgProps } from "react-native-svg";

function EllipsesIcon({ color, props }) {
  return (
    <Svg
      width={24}
      height={6}
      viewBox="0 0 24 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Circle cx={3} cy={3} r={3} fill={color}></Circle>
      <Circle cx={12} cy={3} r={3} fill={color}></Circle>
      <Circle cx={21} cy={3} r={3} fill={color}></Circle>
    </Svg>
  );
}

export default EllipsesIcon;
