import * as React from "react";
import Svg, { Path } from "react-native-svg";

function PostIcon(props) {
  return (
    <Svg
      width={26}
      height={26}
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M24.024 9.06V4.365A2.366 2.366 0 0021.658 2H4.366A2.366 2.366 0 002 4.366v4.693m22.024 0v12.347c0 1.295-1.04 2.35-2.335 2.366l-4.724.06H9.624l-5.199.131A2.366 2.366 0 012 21.598V9.06m22.024 0l-1.347.45a2.366 2.366 0 01-2.191-.37l-1.091-.84a2.957 2.957 0 00-3.303-.204l-1.482.871a2.958 2.958 0 01-3.14-.088l-1.193-.795A2.957 2.957 0 007.2 7.958L4.785 9.3a2.366 2.366 0 01-2.207.048L2 9.06"
        stroke={props.color}
        strokeWidth={2.15085}
      />
      <Path
        d="M16.342 17.968V23.5h-6.66v-5.532a3.33 3.33 0 016.66 0z"
        stroke={props.color}
        strokeWidth={2.15085}
      />
    </Svg>
  );
}

export default PostIcon;
