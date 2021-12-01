import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

const Profile = (props) => (
  <Svg
    width={35}
    height={35}
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
      <Path d="M29.25 30.188v-2.875a5.75 5.75 0 0 0-5.75-5.75H12a5.75 5.75 0 0 0-5.75 5.75v2.875M17.75 15.813a5.75 5.75 0 1 0 0-11.5 5.75 5.75 0 0 0 0 11.5Z" />
    </G>
  </Svg>
);

export default Profile;
