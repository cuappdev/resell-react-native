import * as React from "react";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";

const ClickedHome = (props) => (
  <Svg
    width={33}
    height={33}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18.133 1.74a1.437 1.437 0 0 0-1.765 0L3.43 11.803c-.35.272-.555.69-.555 1.134V28.75a4.313 4.313 0 0 0 4.313 4.313H27.312a4.313 4.313 0 0 0 4.313-4.313V12.937c0-.443-.205-.862-.555-1.134L18.132 1.74ZM23 30.187h4.313a1.438 1.438 0 0 0 1.437-1.437V13.64l-11.5-8.944-11.5 8.945V28.75a1.438 1.438 0 0 0 1.438 1.438H11.5V17.25c0-.794.644-1.438 1.438-1.438h8.624c.794 0 1.438.644 1.438 1.438v12.938Zm-8.625 0v-11.5h5.75v11.5h-5.75Z"
      fill="url(#a)"
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={17.25}
        y1={1.438}
        x2={17.25}
        y2={33.063}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#6F30F5" />
        <Stop offset={0.464} stopColor="#DD67AE" />
        <Stop offset={1} stopColor="#FEB6A2" />
      </LinearGradient>
    </Defs>
  </Svg>
);

export default ClickedHome;
