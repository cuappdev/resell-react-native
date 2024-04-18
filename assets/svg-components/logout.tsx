// Logout Button used in SettingsScreen

import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

const Logout = (props) => (
  <Svg
    width={26}
    height={25}
    viewBox="0 0 26 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.87 2.5c-.543 0-1.038.185-1.381.477-.338.288-.489.64-.489.967v17.112c0 .326.151.679.489.967.343.292.838.477 1.38.477h8.61a1 1 0 010 2h-8.61c-.979 0-1.944-.33-2.677-.955C.454 22.916 0 22.025 0 21.055V3.946c0-.97.454-1.861 1.192-2.49C1.925.83 2.89.5 3.87.5h8.608a1 1 0 010 2H3.87zm15.386 2.929l6.364 6.364a1 1 0 010 1.414l-6.364 6.364a1 1 0 01-1.414-1.414l4.657-4.657H9.608a1 1 0 110-2h12.89l-4.657-4.657a1 1 0 011.414-1.414z"
      fill="#000"
    />
  </Svg>
);

export default Logout;
