import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

function Dots(props: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 12a3 3 0 11-6 0 3 3 0 016 0zm9 0a3 3 0 11-6 0 3 3 0 016 0zm6 3a3 3 0 100-6 3 3 0 000 6z"
        fill="#000"
      />
    </Svg>
  );
}

export default Dots;
