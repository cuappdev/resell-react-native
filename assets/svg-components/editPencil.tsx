import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

const EditPencil = (props) => (
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
      d="M19.505 3a1.996 1.996 0 00-1.412.584l-14.11 14.11-1.058 3.88 3.88-1.058 14.11-14.11A1.996 1.996 0 0019.506 3zm-1.53-1.696a3.996 3.996 0 014.355 6.517L8.032 22.118a1 1 0 01-.444.258l-5.825 1.589a1 1 0 01-1.228-1.228l1.589-5.825a1 1 0 01.258-.444L16.679 2.17a3.996 3.996 0 011.296-.866z"
      fill="#000"
    />
  </Svg>
);

export default EditPencil;
