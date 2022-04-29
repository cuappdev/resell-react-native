// This is the bookmark button shown at the top of product details page when the item has been saved.
import * as React from "react";
import Svg, { Path } from "react-native-svg";

const BookmarkButtonSaved = (props) => (
  <Svg
    width={16}
    height={20}
    fill="white"
    viewBox="0 0 16 20"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M15 19L8 14L1 19V3C1 2.46957 1.21071 1.96086 1.58579 1.58579C1.96086 1.21071 2.46957 1 3 1H13C13.5304 1 14.0391 1.21071 14.4142 1.58579C14.7893 1.96086 15 2.46957 15 3V19Z"
      stroke="white"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>

);

export default BookmarkButtonSaved;
