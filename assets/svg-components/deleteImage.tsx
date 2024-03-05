import * as React from "react";
import Svg, {
  Circle,
  Path,
} from "react-native-svg";

function DeleteImage(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Circle
        cx={12}
        cy={12}
        r={12}
        fill={"#707070"}
      >
      </Circle>
      <Path
        d="M6.5 12H17.5"
        stroke={"white"}
        strokeWidth={3}
        strokeLinecap="round">
      </Path>
    </Svg>
  );
}

export default DeleteImage;
