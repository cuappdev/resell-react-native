import * as React from "react";
import Svg, { Circle, SvgProps } from "react-native-svg";

function EllipsesIcon({ color, ...props }: SvgProps) {
  return (
    <Svg width={24} height={6} viewBox="0 0 24 6" fill="none" {...props}>
      <Circle cx={3} cy={3} r={3} fill={color ?? "white"}></Circle>
      <Circle cx={12} cy={3} r={3} fill={color ?? "white"}></Circle>
      <Circle cx={21} cy={3} r={3} fill={color ?? "white"}></Circle>
    </Svg>
  );
}

export default EllipsesIcon;
