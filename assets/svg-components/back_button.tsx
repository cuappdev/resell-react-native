// An arrow shaped back button in svg
// It looks like this '<' and is used in product details, chat, and other screens with navigation

import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

const BackButton = (props) => (
    <Svg
        width={12}
        height={20}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
      <G
        stroke={props.color ? props.color : "white"}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Path
            d="M11 1L1 10.0909L11 18.2727"
        />
      </G>
    </Svg>
);

export default BackButton;
