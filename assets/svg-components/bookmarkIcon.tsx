import * as React from "react";
import Svg, { Path, Circle } from "react-native-svg";

const BookmarkIcon = (props) => (
  <Svg
    width="72"
    height="72"
    viewBox="0 0 72 72"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Circle cx={36} cy={36} r={36} fill={"#F4F4F4"} fillOpacity={0.5} />
    <Path
      d="M46 49L35.5 41.5L25 49V25C25 24.2044 25.3161 23.4413 25.8787 22.8787C26.4413 22.3161 27.2044 22 28 22H43C43.7956 22 44.5587 22.3161 45.1213 22.8787C45.6839 23.4413 46 24.2044 46 25V49Z"
      stroke="#9E70F6"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round" />
  </Svg>
);

export default BookmarkIcon;