import * as React from "react";
import Svg, {
  G,
  Circle,
  Path,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */

function ColorPlus(props) {
  return (
    <Svg
      width={56}
      height={56}
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G filter="url(#filter0_d_12970_40319)">
        <Circle cx={42} cy={32} r={32} fill="#fff" />
        <Circle
          cx={42}
          cy={32}
          r={30.5}
          stroke="url(#paint0_linear_12970_40319)"
          strokeWidth={3}
        />
      </G>
      <Path
        d="M42.477 21.015v21.97"
        stroke="url(#paint1_linear_12970_40319)"
        strokeWidth={2.91667}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M31.015 32.477h21.97"
        stroke="url(#paint2_linear_12970_40319)"
        strokeWidth={2.91667}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_12970_40319"
          x1={67.8462}
          y1={-17.2308}
          x2={1.46126}
          y2={-4.85313}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#DF9856" />
          <Stop offset={0.489583} stopColor="#DE6CD3" />
          <Stop offset={0.942708} stopColor="#AD68E3" />
        </LinearGradient>
        <LinearGradient
          id="paint1_linear_12970_40319"
          x1={43.3814}
          y1={15.1001}
          x2={42.3081}
          y2={15.1092}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#DF9856" />
          <Stop offset={0.489583} stopColor="#DE6CD3" />
          <Stop offset={0.942708} stopColor="#AD68E3" />
        </LinearGradient>
        <LinearGradient
          id="paint2_linear_12970_40319"
          x1={50.8723}
          y1={32.2083}
          x2={49.546}
          y2={37.6411}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#DF9856" />
          <Stop offset={0.489583} stopColor="#DE6CD3" />
          <Stop offset={0.942708} stopColor="#AD68E3" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

export default ColorPlus;
