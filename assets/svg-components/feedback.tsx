// Send Feedback Button used in SettingsScreen

import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

const Feedback = (props) => (
  <Svg
    width={24}
    height={25}
    viewBox="0 0 24 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.968 3.5a1.111 1.111 0 00-1.11 1.111v14.475l2.514-2.515a1 1 0 01.707-.293h12.667a1.11 1.11 0 001.111-1.111V4.61a1.111 1.111 0 00-1.11-1.111H4.967zm-2.2-1.089a3.111 3.111 0 012.2-.911h14.778a3.111 3.111 0 013.111 3.111v10.556a3.111 3.111 0 01-3.11 3.11H7.493l-3.93 3.93a1 1 0 01-1.707-.707V4.611c0-.825.328-1.616.911-2.2z"
      fill="#000"
    />
  </Svg>
);

export default Feedback;
