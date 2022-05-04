import * as React from "react";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";
function ResellLogo({ props, height, width }) {
  return (
    <Svg
      width={height}
      height={width}
      viewBox="0 0 58 78"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M18.024 23.96v-3.265l.273-3.546c.016-.207.048-.413.094-.616l.82-3.553 1.355-3.521c.086-.224.191-.44.315-.646l1.414-2.358c.12-.2.257-.39.408-.566l1.211-1.413c.227-.265.487-.5.772-.7l1.293-.904a4.155 4.155 0 012.758-.734l.7.063c.69.063 1.352.297 1.929.68l1.048.7c.49.327.906.755 1.219 1.255l1.01 1.615 1.483 2.671 1.187 2.967.89 2.968.537 3.222c.038.225.057.454.057.683v4.997M11.22 17.728h35.649c1.101 0 2.158.437 2.937 1.216l.224.225c.42.419.744.923.953 1.479l.365.973c.139.37.224.758.253 1.152l3.432 46.338a4.153 4.153 0 01-.427 2.165l-.67 1.34c-.2.4-.463.764-.779 1.08l-.086.087A4.154 4.154 0 0150.133 75H7.305a4.154 4.154 0 01-2.137-.592l-.944-.566a4.154 4.154 0 01-1.578-1.705l-.125-.25a4.154 4.154 0 01-.425-2.201l3.915-47.257a4.154 4.154 0 011.48-2.848l1.069-.89a4.154 4.154 0 012.66-.963z"
        stroke="url(#paint0_linear_11263_26497)"
        strokeWidth={4.15447}
        strokeLinecap="round"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M27.015 41.093a1.78 1.78 0 00.805-3.406 4.632 4.632 0 011.106-.193 4.67 4.67 0 11-3.22 7.796 2.375 2.375 0 00-4.723.343V56.45a2.374 2.374 0 004.748 0v-6.757a8.288 8.288 0 004.306.702l4.034 6.968a2.374 2.374 0 004.11-2.379l-3.732-6.444a8.294 8.294 0 002.878-4.941A8.284 8.284 0 0026.97 34.17l-.01.003a8.283 8.283 0 00-2.675 1.293l-.038-1.129a1.78 1.78 0 00-3.56.122l.162 4.708a1.78 1.78 0 001.697 1.718l4.468.207z"
        fill="url(#paint1_linear_11263_26497)"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_11263_26497"
          x1={28.5589}
          y1={2}
          x2={28.5589}
          y2={75}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#6F30F5" />
          <Stop offset={0.984375} stopColor="#FEB6A2" />
        </LinearGradient>
        <LinearGradient
          id="paint1_linear_11263_26497"
          x1={36.7873}
          y1={25.5632}
          x2={17.971}
          y2={27.9479}
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
export default ResellLogo;
