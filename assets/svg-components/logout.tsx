// Logout Button used in SettingsScreen

import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

const Logout = (props) => (

  <Svg
    width="31"
    height="28"
    viewBox="0 0 31 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G
      stroke={props.color ? props.color : "black"}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M14.5652 27H4.3913C3.49187 27 2.62928 26.6956 1.99329 26.1539C1.3573 25.6121 1 24.8773 1 24.1111V3.88889C1 3.12271 1.3573 2.38791 1.99329 1.84614C2.62928 1.30436 3.49187 1 4.3913 1H14.5652" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </G>
    <G>
      <Path d="M29.968 14.7071C30.3585 14.3166 30.3585 13.6834 29.968 13.2929L23.6041 6.92893C23.2135 6.53841 22.5804 6.53841 22.1898 6.92893C21.7993 7.31946 21.7993 7.95262 22.1898 8.34315L27.8467 14L22.1898 19.6569C21.7993 20.0474 21.7993 20.6805 22.1898 21.0711C22.5804 21.4616 23.2135 21.4616 23.6041 21.0711L29.968 14.7071ZM11.174 13C10.6217 13 10.174 13.4477 10.174 14C10.174 14.5523 10.6217 15 11.174 15V13ZM29.2609 13H11.174V15H29.2609V13Z" fill="black" />
    </G>
  </Svg>
);

export default Logout;
