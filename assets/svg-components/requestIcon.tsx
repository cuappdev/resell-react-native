import * as React from "react";
import Svg, { Path } from "react-native-svg";

function RequestIcon(props) {
  return (
    <Svg
      width={22}
      height={25}
      viewBox="0 0 22 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M12.035 2H4.007A2.007 2.007 0 002 4.007v16.056a2.007 2.007 0 002.007 2.007h12.042a2.007 2.007 0 002.007-2.007V8.021L12.036 2z"
        stroke={props.color}
        strokeWidth={2.00704}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12.035 2v6.021h6.021M14.042 13.039H6.014M14.042 17.053H6.014M8.02 9.024H6.015"
        stroke={props.color}
        strokeWidth={2.00704}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M20.319 16.73a2.323 2.323 0 00-3.287 0l-.448.448-.447-.448a2.324 2.324 0 10-3.287 3.287l.447.448 3.287 3.287 3.287-3.287.448-.448a2.325 2.325 0 000-3.287z"
        fill="#fff"
        stroke={props.color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default RequestIcon;
