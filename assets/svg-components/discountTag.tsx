import * as React from "react";
import Svg, { Path } from "react-native-svg";

function DiscountTag({ height, width }) {
    return (
        <Svg width={width} height={height} viewBox="0 0 23 25" fill="none">
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.09834 0.12793L13.7656 1.83881L13.8102 1.8131L22.4058 16.7011L9.37875 24.2223L0.791222 9.34823L0.737793 9.37908L4.09834 0.12793ZM6.91721 6.36313C7.92295 6.36313 8.73826 5.67702 8.73826 4.83066C8.73826 3.9843 7.92295 3.29819 6.91721 3.29819C5.91148 3.29819 5.09617 3.9843 5.09617 4.83066C5.09617 5.67702 5.91148 6.36313 6.91721 6.36313Z"
                fill="#FF0000"
            />
        </Svg>
    );
}
export default DiscountTag;
