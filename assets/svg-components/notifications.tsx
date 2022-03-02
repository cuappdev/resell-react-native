// Notification Preferences Button used in SettingsScreen

import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

const Notifications = (props) => (
    <Svg
        width="26"
        height="23"
        viewBox="0 0 26 23"
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
        <Path d="M21 9.4C21 7.17218 20.1571 5.03561 18.6569 3.4603C17.1566 1.885 15.1217 1 13 1C10.8783 1 8.84344 1.885 7.34315 3.4603C5.84286 5.03561 5 7.17218 5 9.4C5 19.2 1 22 1 22H25C25 22 21 19.2 21 9.4Z"/>
      </G>
    </Svg>
);

export default Notifications;
