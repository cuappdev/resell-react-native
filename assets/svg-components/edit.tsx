// Edit Profile Button used in SettingsScreen

import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

const Edit = (props) => (
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
        <Path d="M20.6687 2.12805C21.0131 1.77042 21.422 1.48672 21.8719 1.29317C22.3219 1.09962 22.8042 1 23.2912 1C23.7783 1 24.2605 1.09962 24.7105 1.29317C25.1605 1.48672 25.5693 1.77042 25.9137 2.12805C26.2581 2.48569 26.5313 2.91027 26.7177 3.37754C26.9041 3.84482 27 4.34564 27 4.85142C27 5.35719 26.9041 5.85801 26.7177 6.32529C26.5313 6.79257 26.2581 7.21714 25.9137 7.57478L8.21187 25.9575L1 28L2.96687 20.5108L20.6687 2.12805Z"/>
      </G>
    </Svg>
);

export default Edit;
