import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

const Terms = (props) => (
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
      d="M2.937 1.437A3.2 3.2 0 015.2.5h7.7a1 1 0 01.707.293l7.7 7.7a1 1 0 01.293.707v12.1a3.2 3.2 0 01-3.2 3.2H5.2A3.2 3.2 0 012 21.3V3.7a3.2 3.2 0 01.937-2.263zM5.2 2.5A1.2 1.2 0 004 3.7v17.6a1.2 1.2 0 001.2 1.2h13.2a1.2 1.2 0 001.2-1.2V10.2h-6.7a1 1 0 01-1-1V2.5H5.2zm8.7 1.414L18.186 8.2H13.9V3.914z"
      fill="#000"
    />
  </Svg>
);

export default Terms;
