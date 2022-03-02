// Send Feedback Button used in SettingsScreen

import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

const Feedback = (props) => (
    <Svg
        width="29"
        height="30"
        viewBox="0 0 29 30"
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
        <Path d="M28 19.6667C28 20.4918 27.6839 21.2831 27.1213 21.8666C26.5587 22.45 25.7956 22.7778 25 22.7778H7L1 29V4.11111C1 3.28599 1.31607 2.49467 1.87868 1.91122C2.44129 1.32778 3.20435 1 4 1H25C25.7956 1 26.5587 1.32778 27.1213 1.91122C27.6839 2.49467 28 3.28599 28 4.11111V19.6667Z"/>
      </G>
    </Svg>
);

export default Feedback;
