import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

const Privacy = (props) => (
  <Svg
    width={24}
    height={30}
    viewBox="0 0 24 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      id="Vector"
      d="M11.1793 2.36933C11.7012 2.13445 12.2988 2.13445 12.8207 2.36933L20.8207 5.96933C21.5384 6.29229 22 7.00615 22 7.79317V13.3333C22 19.1403 17.6922 25.3742 12.5832 27.3001C12.2071 27.4419 11.7929 27.4417 11.4165 27.3007C6.30767 25.386 2 19.3068 2 13.5V7.79317C2 7.00615 2.46157 6.29229 3.17927 5.96933L11.1793 2.36933ZM12.8123 0.361012C12.2951 0.131176 11.7049 0.131176 11.1877 0.361012L1.18772 4.80546C0.465468 5.12646 0 5.8427 0 6.63308V13.3333C0 20.5629 4.88687 27.3343 11.5275 29.209C11.8363 29.2961 12.1637 29.2962 12.4725 29.209C19.1131 27.3343 24 20.5629 24 13.3333V6.63308C24 5.8427 23.5345 5.12646 22.8123 4.80546L12.8123 0.361012ZM11 9C11 8.44771 11.4477 8 12 8C12.5523 8 13 8.44771 13 9V9.5C13 10.0523 12.5523 10.5 12 10.5C11.4477 10.5 11 10.0523 11 9.5V9ZM11 14.0541C11 13.6237 11.2754 13.2415 11.6838 13.1054L12 13L12.3162 13.1054C12.7246 13.2415 13 13.6237 13 14.0541V20.3333C13 20.8856 12.5523 21.3333 12 21.3333C11.4477 21.3333 11 20.8856 11 20.3333V14.0541Z"
      fill="black" />
  </Svg>
);

export default Privacy;