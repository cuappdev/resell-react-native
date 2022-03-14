// Logout Button used in SettingsScreen

import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

const Logout = (props) => (
    <Svg
        width="28"
        height="29"
        viewBox="0 0 28 29"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
      <G
        stroke={props.color ? props.color : "black"}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Path d="M10 28H4C3.20435 28 2.44129 27.6839 1.87868 27.1213C1.31607 26.5587 1 25.7956 1 25V4C1 3.20435 1.31607 2.44129 1.87868 1.87868C2.44129 1.31607 3.20435 1 4 1H10"/>
        <Path d="M27 14H9"/>
      </G>
    </Svg>
);

export default Logout;
