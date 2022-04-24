// Modal bar handle used in detail pullup

import * as React from "react";
import Svg, { Rect } from "react-native-svg";

const ModalBar = (props) => (
    <Svg
        width="49" height="7" viewBox="0 0 49 7" 
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
      <Rect width="49" height="7" rx="3.5" fill="#D6D6D6"/>
    </Svg>
);

export default ModalBar;
