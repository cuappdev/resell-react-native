import * as React from "react";
import Svg, { Path, Rect } from "react-native-svg";

const calendarNotification = (props) => (
  <Svg
    width={25}
    height={26}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M19 6H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2ZM16 4v4M8 4v4M3 12h18"
      stroke="#000"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Rect x={17} width={8} height={8} rx={4} fill="#F20000" />
  </Svg>
);

export default calendarNotification;
