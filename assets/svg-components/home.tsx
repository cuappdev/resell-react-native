import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

const Home = (props) => (
  <Svg
    width={33}
    height={33}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G
      opacity={0.3}
      stroke="#000"
      strokeWidth={2.875}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M4.313 12.938 17.25 2.874l12.938 10.063V28.75a2.875 2.875 0 0 1-2.875 2.875H7.188a2.875 2.875 0 0 1-2.875-2.875V12.937Z" />
      <Path d="M12.938 31.625V17.25h8.624v14.375" />
    </G>
  </Svg>
);

export default Home;
