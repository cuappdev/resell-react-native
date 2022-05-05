import * as React from "react";
import Svg, { Path } from "react-native-svg";

const Venmo = (props) => (
  <Svg
    width={59}
    height={12}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M9.698.428c.398.652.577 1.323.577 2.17 0 2.705-2.33 6.219-4.222 8.686h-4.32L0 1.02 3.783.664l.916 7.304c.856-1.382 1.912-3.553 1.912-5.033 0-.81-.14-1.362-.359-1.816L9.698.428ZM14.6 4.948c.697 0 2.45-.316 2.45-1.303 0-.473-.339-.71-.737-.71-.697 0-1.612.828-1.712 2.013Zm-.079 1.954c0 1.205.676 1.677 1.573 1.677.976 0 1.911-.236 3.126-.848l-.457 3.079c-.857.414-2.19.69-3.486.69-3.285 0-4.46-1.973-4.46-4.44 0-3.198 1.912-6.593 5.855-6.593 2.17 0 3.384 1.205 3.384 2.882 0 2.705-3.503 3.533-5.535 3.553ZM30.974 2.836c0 .395-.06.968-.12 1.342l-1.136 7.106h-3.683L27.07 4.77c.02-.177.08-.533.08-.73 0-.474-.299-.592-.658-.592-.477 0-.956.217-1.274.375l-1.175 7.46H20.34L22.03.646h3.207l.04.85C26.035 1 27.031.466 28.444.466c1.872 0 2.53.948 2.53 2.37ZM41.91 1.632C42.965.882 43.962.467 45.335.467c1.892 0 2.55.948 2.55 2.37 0 .394-.06.967-.12 1.34l-1.135 7.107h-3.684L44 4.632c.02-.178.06-.395.06-.532 0-.534-.299-.652-.658-.652-.458 0-.915.197-1.255.375l-1.174 7.46H37.29l1.056-6.65c.019-.179.059-.395.059-.533 0-.533-.3-.652-.657-.652-.479 0-.956.217-1.275.375l-1.175 7.46h-3.703L33.287.646h3.167l.1.888C37.29 1.001 38.285.467 39.62.467c1.155 0 1.911.494 2.29 1.165ZM55.216 4.73c0-.868-.22-1.46-.876-1.46-1.454 0-1.752 2.546-1.752 3.849 0 .988.279 1.6.935 1.6 1.374 0 1.693-2.686 1.693-3.988Zm-6.372 2.231c0-3.355 1.792-6.494 5.914-6.494C57.865.467 59 2.283 59 4.79c0 3.317-1.772 6.75-5.994 6.75-3.127 0-4.162-2.033-4.162-4.579Z"
      fill="#3D95CE"
    />
  </Svg>
);

export default Venmo;
